import { useState, useEffect, useMemo } from 'react'
import { useQuery, useLazyQuery, useMutation, useApolloClient } from '@apollo/client'
import { useSnackbar } from 'notistack'
import {
    useLikePost,
    useUnlikePost,
    useSavePost,
    useUnsavePost,
    useLikeComment,
    useUnlikeComment,
} from '../../hooks/graphql'
import { FIND_COMMENTS_FOR_POST } from '../../graphql/queries/post'
import { FindCommentsForPostQueryType } from '../../graphql/types/queries/post'
import { FIND_COMMENT_REPLIES } from '../../graphql/queries/post'
import { FindCommentRepliesQueryType } from '../../graphql/types/queries/post'
import { CREATE_COMMENT } from '../../graphql/mutations/post'
import { CreateCommentMutationType } from '../../graphql/types/mutations/post'
import PostPreviewModal from '../../lib/src/components/PostPreviewModal'
import findCommentsForPostMutations from '../../apollo/mutations/post/findCommentsForPost'
import PostLikes from '../PostLikes'
import CommentLikes from '../CommentLikes'
import { Comment } from '../../graphql/types/models'
import { Post } from '../../lib/src/types/Post'
import { Comment as IComment } from '../../lib/src/types/Comment'
import _differenceBy from 'lodash/differenceBy'


interface Props {
    postId: string
    post?: Post | null

    onClose(): void
}

export default function PostModal(props: Props) {

    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        if (props.post) {
            setPost(props.post)
        }
    }, [props.post])

    const commentsForPost = useQuery<FindCommentsForPostQueryType>(FIND_COMMENTS_FOR_POST, {
        variables: {
            postId: props.postId,
            offset: 0,
            limit: 10,
        },
    })

    const transformComment = (comment: Comment): IComment => {
        return {
            id: comment._id,
            creator: {
                id: comment.creator._id,
                username: comment.creator.username,
                photoUrl: comment.creator.photoUrl,
            },
            body: comment.text,
            postId: comment.postId,
            isLiked: comment.liked,
            likesCount: comment.likesCount,
            repliesCount: comment.repliesCount,
            replies: comment.replies.map(transformComment),
            showReplies: comment.showReplies,
            repliesLoading: comment.repliesLoading,
            createdAt: comment.createdAt,
        }
    }

    const comments: IComment[] = useMemo(() => {
        if (!commentsForPost.loading && !commentsForPost.error && commentsForPost.data) {
            return commentsForPost.data.findCommentsForPost.data.map(transformComment)
        }
        return []
    }, [commentsForPost.loading, commentsForPost.error, commentsForPost.data])

    const hasMoreComments = useMemo(() => {
        if (!commentsForPost.loading && !commentsForPost.error && commentsForPost.data) {
            return commentsForPost.data.findCommentsForPost.data.length < commentsForPost.data.findCommentsForPost.count
        }
        return false
    }, [commentsForPost.loading, commentsForPost.error, commentsForPost.data])

    const [moreCommentsLoading, setMoreCommentsLoading] = useState(false)

    const handleFetchMoreComments = () => {
        if (commentsForPost.data) {
            setMoreCommentsLoading(true)
            commentsForPost.fetchMore({
                variables: {
                    offset: commentsForPost.data.findCommentsForPost.data.length,
                },
                updateQuery(existing: FindCommentsForPostQueryType, { fetchMoreResult }: { fetchMoreResult: FindCommentsForPostQueryType }) {
                    return {
                        ...existing,
                        findCommentsForPost: {
                            ...existing.findCommentsForPost,
                            data: [
                                ...existing.findCommentsForPost.data,
                                ...fetchMoreResult.findCommentsForPost.data,
                            ],
                        },
                    }
                },
            }).catch(console.log).finally(() => setMoreCommentsLoading(false))
        }
    }

    const [viewPostLikesPostId, setViewPostLikesPostId] = useState<string | null>(null)

    const handleViewPostLikes = (postId: string) => {
        setViewPostLikesPostId(postId)
    }

    const handleClosePostLikesModal = () => {
        setViewPostLikesPostId(null)
    }

    const likePost = useLikePost()

    const handleLikePost = (postId: string | number) => {
        likePost(postId as string)
    }

    const unlikePost = useUnlikePost()

    const handleUnlikePost = (postId: string | number) => {
        unlikePost(postId as string)
    }

    const savePost = useSavePost()

    const handleSavePost = (postId: string | number) => {
        savePost(postId as string)
    }

    const unsavePost = useUnsavePost()

    const handleUnsavePost = (postId: string | number) => {
        unsavePost(postId as string)
    }

    const [viewCommentLikesCommentId, setViewCommentLikesCommentId] = useState<string | null>(null)

    const handleViewCommentLikes = (commentId: string) => {
        setViewCommentLikesCommentId(commentId)
    }

    const handleCloseCommentLikesModal = () => {
        setViewCommentLikesCommentId(null)
    }

    const likeComment = useLikeComment()

    const handleLikeComment = (commentId: string | number, postId: string | number) => {
        likeComment(commentId as string, postId as string)
    }

    const unlikeComment = useUnlikeComment()

    const handleUnlikeComment = (commentId: string | number, postId: string | number) => {
        unlikeComment(commentId as string, postId as string)
    }

    const client = useApolloClient()

    const [findCommentReplies, { fetchMore: _fetchMoreCommentReplies }] = useLazyQuery<FindCommentRepliesQueryType>(FIND_COMMENT_REPLIES)

    const fetchMoreCommentReplies = (commentId: string) => {
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
                    commentsForPost.updateQuery((findCommentsForPost) =>
                        findCommentsForPostMutations.addCommentReplies({
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
                        }).queryResult)
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
                    commentsForPost.updateQuery((findCommentsForPost) =>
                        findCommentsForPostMutations.addCommentReplies({
                            queryData: findCommentsForPost,
                            variables: {
                                commentId,
                                replies: data.findCommentReplies.data,
                            },
                        }).queryResult)
                }
            })
        }
    }

    const handleViewReplies = (commentId: string) => {
        commentsForPost.updateQuery((findCommentsForPost) =>
            findCommentsForPostMutations.viewCommentReplies({
                queryData: findCommentsForPost,
                variables: {
                    commentId,
                    fetchMoreCommentReplies() {
                        fetchMoreCommentReplies(commentId)
                    },
                },
            }).queryResult)
    }

    const handleHideReplies = (commentId: string) => {
        commentsForPost.updateQuery((findCommentsForPost) =>
            findCommentsForPostMutations.hideCommentReplies({
                queryData: findCommentsForPost,
                variables: {
                    commentId,
                },
            }).queryResult)
    }

    const handleReplyToComment = (postId: string, comment: string, commentId: string) => {
        postComment(postId, comment, commentId)
    }

    const handlePostComment = (postId: string, comment: string) => {
        postComment(postId, comment, null)
    }

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

    const { enqueueSnackbar } = useSnackbar()

    const [createComment, { loading: isPostingComment }] = useMutation<CreateCommentMutationType>(CREATE_COMMENT)

    const postComment = (postId: string, comment: string, commentId: string | null) => {
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
                if (commentId) {
                    if (commentsForPost.data) {
                        const comment = findCommentById(commentsForPost.data.findCommentsForPost.data, commentId)
                        if (comment) {
                            commentsForPost.updateQuery((findCommentsForPost) =>
                                findCommentsForPostMutations.updateComment({
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
                                }).queryResult)
                        }
                    }
                } else {
                    if (commentsForPost.data) {
                        if (commentsForPost.data.findCommentsForPost.data.length >= commentsForPost.data.findCommentsForPost.count) {
                            // TODO: Maybe implement scroll to bottom
                            commentsForPost.updateQuery((findCommentsForPost) =>
                                findCommentsForPostMutations.addComment({
                                    queryData: findCommentsForPost,
                                    variables: { comment: createComment },
                                }).queryResult)
                        }
                    }
                }
            }
        }).catch(() => {
            enqueueSnackbar('Comment could not be posted', { variant: 'error' })
        })
    }

    return (
        <>
            <PostPreviewModal
                open={true}
                onClose={props.onClose}
                post={post}
                postLoading={false}
                comments={comments}
                commentsLoading={commentsForPost.loading || moreCommentsLoading}
                hasMoreComments={hasMoreComments}
                viewingPostLikes={Boolean(viewPostLikesPostId)}
                viewingCommentLikes={Boolean(viewCommentLikesCommentId)}
                isPostingComment={isPostingComment}
                onFollowUser={console.log}
                onUnfollowUser={console.log}
                onLikePost={handleLikePost}
                onUnlikePost={handleUnlikePost}
                onSavePost={handleSavePost}
                onRemovePost={handleUnsavePost}
                onViewPostLikes={handleViewPostLikes}
                onViewPost={console.log}
                onFetchMoreComments={handleFetchMoreComments}
                onViewUser={console.log}
                onViewCommentLikes={handleViewCommentLikes}
                onReplyToComment={handleReplyToComment}
                onLikeComment={handleLikeComment}
                onUnlikeComment={handleUnlikeComment}
                onViewReplies={handleViewReplies}
                onHideReplies={handleHideReplies}
                onPostComment={handlePostComment} />
            <PostLikes
                postId={viewPostLikesPostId}
                onCloseModal={handleClosePostLikesModal} />
            <CommentLikes
                commentId={viewCommentLikesCommentId}
                onCloseModal={handleCloseCommentLikesModal} />
        </>
    )
}