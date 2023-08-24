import { useCallback } from 'react'
import { useApolloClient, useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import { FIND_COMMENTS_FOR_POST } from '../../graphql/queries/post'
import { FindCommentsForPostQueryType } from '../../graphql/types/queries/post'
import { CREATE_COMMENT } from '../../graphql/mutations/post'
import { CreateCommentMutationType } from '../../graphql/types/mutations/post'
import { Comment } from '../../graphql/types/models'
import findCommentsForPostMutations from '../../apollo/mutations/post/findCommentsForPost'


const findCommentById = (comments: Comment[], commentId: string): Comment | null => {
    for (const comment of comments) {
        if (comment._id === commentId) {
            return comment
        }
        if (comment.replies.length > 0) {
            const foundInReply = findCommentById(comment.replies, commentId)
            if (foundInReply !== null) {
                return foundInReply
            }
        }
    }
    return null
}

export function usePostComment() {

    const client = useApolloClient()

    const { enqueueSnackbar } = useSnackbar()

    const [createComment, { loading: isPostingComment }] = useMutation<CreateCommentMutationType>(CREATE_COMMENT)

    const postComment = useCallback((postId: string, comment: string, commentId: string | null) => {
        createComment({
            variables: {
                postId,
                text: comment,
                replyCommentId: commentId,
            },
        }).then(({ data }) => {
            if (data) {
                const createComment = {
                    ...data.createComment,
                    replies: [],
                    showReplies: false,
                    repliesLoading: false,
                }
                const commentsForPost: FindCommentsForPostQueryType | null = client.cache.readQuery({
                    query: FIND_COMMENTS_FOR_POST,
                    variables: { postId },
                })
                if (commentId) {
                    if (commentsForPost) {
                        const comment = findCommentById(commentsForPost.findCommentsForPost.data, commentId)
                        if (comment) {
                            client.cache.updateQuery({
                                query: FIND_COMMENTS_FOR_POST,
                                variables: { postId },
                            }, (findCommentsForPost: FindCommentsForPostQueryType | null) => {
                                if (findCommentsForPost) {
                                    return findCommentsForPostMutations.updateComment({
                                        queryData: findCommentsForPost,
                                        variables: {
                                            commentId,
                                            updateCb(comment: Comment): Comment {
                                                return {
                                                    ...comment,
                                                    showReplies: true,
                                                    repliesCount: comment.repliesCount + 1,
                                                    replies: [...comment.replies, createComment],
                                                }
                                            },
                                        },
                                    }).queryResult
                                }
                            })
                        }
                    }
                } else {
                    if (commentsForPost) {
                        if (commentsForPost.findCommentsForPost.data.length >= commentsForPost.findCommentsForPost.count) {
                            // TODO: Maybe implement scroll to bottom
                            client.cache.updateQuery({
                                query: FIND_COMMENTS_FOR_POST,
                                variables: { postId },
                            }, (findCommentsForPost: FindCommentsForPostQueryType | null) => {
                                if (findCommentsForPost) {
                                    return findCommentsForPostMutations.addComment({
                                        queryData: findCommentsForPost,
                                        variables: { comment: createComment },
                                    }).queryResult
                                }
                            })
                        }
                    }
                }
            }
        }).catch(() => {
            enqueueSnackbar('Comment could not be posted', { variant: 'error' })
        })
    }, [])

    const onReplyToComment = useCallback((postId: string, comment: string, commentId: string) => {
        postComment(postId, comment, commentId)
    }, [postComment])

    const onPostComment = useCallback((postId: string, comment: string) => {
        postComment(postId, comment, null)
    }, [postComment])

    return {
        isPostingComment,
        onReplyToComment,
        onPostComment,
    }
}