import { useState, useEffect, useMemo } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
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
import PostPreviewModal from '../../lib/src/components/PostPreviewModal'
import findCommentsForPostMutations from '../../apollo/mutations/post/findCommentsForPost'
import PostLikes from '../PostLikes'
import CommentLikes from '../CommentLikes'
import { Comment } from '../../graphql/types/models'
import { Post } from '../../lib/src/types/Post'
import { Comment as IComment } from '../../lib/src/types/Comment'


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

    const [findCommentReplies, { data: commentReplies }] = useLazyQuery<FindCommentRepliesQueryType>(FIND_COMMENT_REPLIES)

    const fetchMoreCommentReplies = (commentId: string) => {
        findCommentReplies({
            variables: {
                commentId,
                offset: commentReplies ? commentReplies.findCommentReplies.data.length : 0,
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
                isPostingComment={false}
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
                onReplyToComment={console.log}
                onLikeComment={handleLikeComment}
                onUnlikeComment={handleUnlikeComment}
                onViewReplies={handleViewReplies}
                onHideReplies={console.log}
                onPostComment={console.log} />
            <PostLikes
                postId={viewPostLikesPostId}
                onCloseModal={handleClosePostLikesModal} />
            <CommentLikes
                commentId={viewCommentLikesCommentId}
                onCloseModal={handleCloseCommentLikesModal} />
        </>
    )
}