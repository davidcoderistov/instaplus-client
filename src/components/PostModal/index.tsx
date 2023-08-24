import { useState, useEffect } from 'react'
import {
    useLikePost,
    useUnlikePost,
    useSavePost,
    useUnsavePost,
    useLikeComment,
    useUnlikeComment,
    useCommentReplies,
    usePostComment,
    useCommentsForPost,
    usePostLikes,
    useCommentLikes,
} from '../../hooks/graphql'
import PostPreviewModal from '../../lib/src/components/PostPreviewModal'
import PostLikes from '../PostLikes'
import CommentLikes from '../CommentLikes'
import { Post } from '../../lib/src/types/Post'


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

    const {
        comments,
        commentsLoading,
        hasMoreComments,
        onFetchMoreComments,
    } = useCommentsForPost(props.postId)

    const { viewPostLikesPostId, onViewPostLikes, onClosePostLikes } = usePostLikes()

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

    const { viewCommentLikesCommentId, onViewCommentLikes, onCloseCommentLikes } = useCommentLikes()

    const likeComment = useLikeComment()

    const handleLikeComment = (commentId: string | number, postId: string | number) => {
        likeComment(commentId as string, postId as string)
    }

    const unlikeComment = useUnlikeComment()

    const handleUnlikeComment = (commentId: string | number, postId: string | number) => {
        unlikeComment(commentId as string, postId as string)
    }

    const { onViewReplies, onHideReplies } = useCommentReplies(props.postId)

    const { isPostingComment, onReplyToComment, onPostComment } = usePostComment()

    return (
        <>
            <PostPreviewModal
                open={true}
                onClose={props.onClose}
                post={post}
                postLoading={false}
                comments={comments}
                commentsLoading={commentsLoading}
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
                onViewPostLikes={onViewPostLikes}
                onViewPost={console.log}
                onFetchMoreComments={onFetchMoreComments}
                onViewUser={console.log}
                onViewCommentLikes={onViewCommentLikes}
                onReplyToComment={onReplyToComment}
                onLikeComment={handleLikeComment}
                onUnlikeComment={handleUnlikeComment}
                onViewReplies={onViewReplies}
                onHideReplies={onHideReplies}
                onPostComment={onPostComment} />
            <PostLikes
                postId={viewPostLikesPostId}
                onCloseModal={onClosePostLikes} />
            <CommentLikes
                commentId={viewCommentLikesCommentId}
                onCloseModal={onCloseCommentLikes} />
        </>
    )
}