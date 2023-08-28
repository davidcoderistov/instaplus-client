import { useState, useEffect, useCallback } from 'react'
import { useUserDetailsNavigation, useHashtagNavigation, usePostViewNavigation } from '../../hooks/misc'
import { useLazyQuery } from '@apollo/client'
import { FIND_POST_DETAILS_BY_ID } from '../../graphql/queries/post'
import { FindPostDetailsByIdQueryType } from '../../graphql/types/queries/post'
import {
    useFollowUser,
    useUnfollowUser,
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

    const [findPostDetailsById, { data }] = useLazyQuery<FindPostDetailsByIdQueryType>(FIND_POST_DETAILS_BY_ID)

    useEffect(() => {
        if (props.post) {
            setPost(props.post)
        } else {
            findPostDetailsById({ variables: { postId: props.postId } })
        }
    }, [props.post, props.postId, findPostDetailsById])

    useEffect(() => {
        if (data && data.findPostDetailsById) {
            setPost({
                id: data.findPostDetailsById._id,
                description: data.findPostDetailsById.post.caption,
                location: data.findPostDetailsById.post.location,
                photoUrls: data.findPostDetailsById.post.photoUrls,
                creator: {
                    id: data.findPostDetailsById.post.creator.user._id,
                    username: data.findPostDetailsById.post.creator.user.username,
                    photoUrl: data.findPostDetailsById.post.creator.user.photoUrl,
                    following: true,
                    followingLoading: false,
                },
                isLiked: data.findPostDetailsById.liked,
                isSaved: data.findPostDetailsById.saved,
                likesCount: data.findPostDetailsById.likesCount,
                commentsCount: data.findPostDetailsById.commentsCount,
                lastLikingUser: data.findPostDetailsById.latestTwoLikeUsers.length > 0 ? {
                    id: data.findPostDetailsById.latestTwoLikeUsers[0]._id,
                    username: data.findPostDetailsById.latestTwoLikeUsers[0].username,
                } : null,
                lastLikingMutualFollowers: data.findPostDetailsById.latestThreeFollowedLikeUsers.map(user => ({
                    id: user._id,
                    username: user._id,
                    photoUrl: user.photoUrl as string,
                })),
                createdAt: data.findPostDetailsById.post.createdAt,
            })
        }
    }, [data])

    const {
        comments,
        commentsLoading,
        hasMoreComments,
        onFetchMoreComments,
    } = useCommentsForPost(props.postId)

    const followUser = useFollowUser()

    const unfollowUser = useUnfollowUser()

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

    const navigateToUserDetails = useUserDetailsNavigation()

    const handleViewUser = useCallback((userId: string | number) => {
        props.onClose()
        navigateToUserDetails(userId)
    }, [])

    const navigateToHashtag = useHashtagNavigation()

    const handleViewHashtag = useCallback((name: string) => {
        props.onClose()
        navigateToHashtag(name)
    }, [])

    const navigateToPostView = usePostViewNavigation()

    const handleViewPost = (postId: string | number) => {
        props.onClose()
        navigateToPostView(postId)
    }

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
                onFollowUser={followUser}
                onUnfollowUser={unfollowUser}
                onLikePost={likePost}
                onUnlikePost={unlikePost}
                onSavePost={savePost}
                onRemovePost={unsavePost}
                onViewPostLikes={onViewPostLikes}
                onViewPost={handleViewPost}
                onFetchMoreComments={onFetchMoreComments}
                onViewUser={handleViewUser}
                onViewCommentLikes={onViewCommentLikes}
                onReplyToComment={onReplyToComment}
                onLikeComment={likeComment}
                onUnlikeComment={unlikeComment}
                onViewReplies={onViewReplies}
                onHideReplies={onHideReplies}
                onViewHashtag={handleViewHashtag}
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