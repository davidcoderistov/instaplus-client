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

    const unlikePost = useUnlikePost()

    const savePost = useSavePost()

    const unsavePost = useUnsavePost()

    const { viewCommentLikesCommentId, onViewCommentLikes, onCloseCommentLikes } = useCommentLikes()

    const likeComment = useLikeComment()

    const unlikeComment = useUnlikeComment()

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
                onLikePost={likePost}
                onUnlikePost={unlikePost}
                onSavePost={savePost}
                onRemovePost={unsavePost}
                onViewPostLikes={onViewPostLikes}
                onViewPost={console.log}
                onFetchMoreComments={onFetchMoreComments}
                onViewUser={console.log}
                onViewCommentLikes={onViewCommentLikes}
                onReplyToComment={onReplyToComment}
                onLikeComment={likeComment}
                onUnlikeComment={unlikeComment}
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