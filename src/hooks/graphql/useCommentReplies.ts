import { useCallback } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import { FIND_COMMENTS_FOR_POST } from '../../graphql/queries/post'
import { FindCommentsForPostQueryType } from '../../graphql/types/queries/post'
import { FIND_COMMENT_REPLIES } from '../../graphql/queries/post'
import { FindCommentRepliesQueryType } from '../../graphql/types/queries/post'
import findCommentsForPostMutations from '../../apollo/mutations/post/findCommentsForPost'
import _differenceBy from 'lodash/differenceBy'


export function useCommentReplies(postId: string) {

    const client = useApolloClient()

    const [findCommentReplies, { fetchMore: _fetchMoreCommentReplies }] = useLazyQuery<FindCommentRepliesQueryType>(FIND_COMMENT_REPLIES)

    const fetchMoreCommentReplies = (postId: string, commentId: string) => {
        const commentReplies: FindCommentRepliesQueryType | null = client.cache.readQuery({
            query: FIND_COMMENT_REPLIES,
            variables: {
                commentId,
            },
        })
        if (commentReplies) {
            _fetchMoreCommentReplies({
                variables: {
                    commentId,
                    offset: commentReplies.findCommentReplies.data.length,
                    limit: 5,
                },
                updateQuery(existing: FindCommentRepliesQueryType, { fetchMoreResult }: { fetchMoreResult: FindCommentRepliesQueryType }) {
                    return {
                        ...existing,
                        findCommentReplies: {
                            ...fetchMoreResult.findCommentReplies,
                            data: [
                                ...existing.findCommentReplies.data,
                                ..._differenceBy(
                                    fetchMoreResult.findCommentReplies.data.map(comment => ({
                                        ...comment,
                                        showReplies: false,
                                        repliesLoading: false,
                                        replies: [],
                                    })),
                                    existing.findCommentReplies.data,
                                    '_id',
                                ),
                            ],
                        },
                    }
                },
            }).then(({ data }) => {
                if (data) {
                    client.cache.updateQuery({
                        query: FIND_COMMENTS_FOR_POST,
                        variables: { postId },
                    }, (findCommentsForPost: FindCommentsForPostQueryType | null) => {
                        if (findCommentsForPost) {
                            return findCommentsForPostMutations.addCommentReplies({
                                queryData: findCommentsForPost,
                                variables: {
                                    commentId,
                                    replies: data.findCommentReplies.data.map(comment => ({
                                        ...comment,
                                        showReplies: false,
                                        repliesLoading: false,
                                        replies: [],
                                    })),
                                },
                            }).queryResult
                        }
                    })
                }
            })
        } else {
            findCommentReplies({
                variables: {
                    commentId,
                    offset: 0,
                    limit: 5,
                },
            }).then(({ data }) => {
                if (data) {
                    client.cache.updateQuery({
                        query: FIND_COMMENTS_FOR_POST,
                        variables: { postId },
                    }, (findCommentsForPost: FindCommentsForPostQueryType | null) => {
                        if (findCommentsForPost) {
                            return findCommentsForPostMutations.addCommentReplies({
                                queryData: findCommentsForPost,
                                variables: {
                                    commentId,
                                    replies: data.findCommentReplies.data,
                                },
                            }).queryResult
                        }
                    })
                }
            })
        }
    }

    const onViewReplies = useCallback((commentId: string) => {
        client.cache.updateQuery({
            query: FIND_COMMENTS_FOR_POST,
            variables: { postId },
        }, (findCommentsForPost: FindCommentsForPostQueryType | null) => {
            if (findCommentsForPost) {
                return findCommentsForPostMutations.viewCommentReplies({
                    queryData: findCommentsForPost,
                    variables: {
                        commentId,
                        fetchMoreCommentReplies() {
                            fetchMoreCommentReplies(postId, commentId)
                        },
                    },
                }).queryResult
            }
        })
    }, [postId])

    const onHideReplies = useCallback((commentId: string) => {
        client.cache.updateQuery({
            query: FIND_COMMENTS_FOR_POST,
            variables: { postId },
        }, (findCommentsForPost: FindCommentsForPostQueryType | null) => {
            if (findCommentsForPost) {
                return findCommentsForPostMutations.hideCommentReplies({
                    queryData: findCommentsForPost,
                    variables: {
                        commentId,
                    },
                }).queryResult
            }
        })
    }, [postId])

    return { onViewReplies, onHideReplies }
}