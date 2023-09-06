import { useState, useMemo, useCallback } from 'react'
import { usePopupState } from 'material-ui-popup-state/hooks'
import { useAuthUser, useUserDetailsNavigation, useHashtagNavigation, usePostViewNavigation } from '../../hooks/misc'
import { useQuery } from '@apollo/client'
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
import ProfilePopover from '../ProfilePopover'
import { Post } from '../../lib/src/types/Post'


interface Props {
    postId: string
    post?: Post | null

    onViewUser?(userId: string): void

    onClose(): void
}

export default function PostModal(props: Props) {

    const [authUser] = useAuthUser()

    const findPostDetailsById = useQuery<FindPostDetailsByIdQueryType>(FIND_POST_DETAILS_BY_ID, {
        variables: { postId: props.postId },
        skip: !!props.post,
    })

    const post: Post | null = useMemo(() => {
        if (props.post) {
            return props.post
        } else if (!findPostDetailsById.loading && !findPostDetailsById.error && findPostDetailsById.data && findPostDetailsById.data.findPostDetailsById) {
            return {
                id: findPostDetailsById.data.findPostDetailsById.post._id,
                description: findPostDetailsById.data.findPostDetailsById.post.caption,
                location: findPostDetailsById.data.findPostDetailsById.post.location,
                photoUrls: findPostDetailsById.data.findPostDetailsById.post.photoUrls,
                creator: {
                    id: findPostDetailsById.data.findPostDetailsById.post.creator.user._id,
                    username: findPostDetailsById.data.findPostDetailsById.post.creator.user.username,
                    photoUrl: findPostDetailsById.data.findPostDetailsById.post.creator.user.photoUrl,
                    following: findPostDetailsById.data.findPostDetailsById.post.creator.following,
                    followingLoading: findPostDetailsById.data.findPostDetailsById.post.creator.followingLoading,
                },
                isLiked: findPostDetailsById.data.findPostDetailsById.liked,
                isSaved: findPostDetailsById.data.findPostDetailsById.saved,
                likesCount: findPostDetailsById.data.findPostDetailsById.likesCount,
                commentsCount: findPostDetailsById.data.findPostDetailsById.commentsCount,
                lastLikingUser: findPostDetailsById.data.findPostDetailsById.latestTwoLikeUsers.length > 0 ? {
                    id: findPostDetailsById.data.findPostDetailsById.latestTwoLikeUsers[0]._id,
                    username: findPostDetailsById.data.findPostDetailsById.latestTwoLikeUsers[0].username,
                } : null,
                lastLikingMutualFollowers: findPostDetailsById.data.findPostDetailsById.latestThreeFollowedLikeUsers.map(user => ({
                    id: user._id,
                    username: user._id,
                    photoUrl: user.photoUrl as string,
                })),
                createdAt: findPostDetailsById.data.findPostDetailsById.post.createdAt,
            }
        } else {
            return null
        }
    }, [props.post, findPostDetailsById.loading, findPostDetailsById.error, findPostDetailsById.data])

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

    const popupState = usePopupState({ variant: 'popover', popupId: 'profilePopover' })

    const [hoverUserId, setHoverUserId] = useState<string | null>(null)

    const handleHoverUser = useCallback((userId: string) => {
        setHoverUserId(userId)
    }, [])

    return (
        <>
            <PostPreviewModal
                open={true}
                onClose={props.onClose}
                authUserId={authUser._id}
                post={post}
                postLoading={findPostDetailsById.loading}
                comments={comments}
                commentsLoading={commentsLoading}
                hasMoreComments={hasMoreComments}
                popupState={popupState}
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
                onHoverUser={handleHoverUser}
                onViewCommentLikes={onViewCommentLikes}
                onReplyToComment={onReplyToComment}
                onLikeComment={likeComment}
                onUnlikeComment={unlikeComment}
                onViewReplies={onViewReplies}
                onHideReplies={onHideReplies}
                onViewHashtag={handleViewHashtag}
                onPostComment={onPostComment} />
            <ProfilePopover
                popupState={popupState}
                userId={hoverUserId} />
            <PostLikes
                postId={viewPostLikesPostId}
                onViewUser={props.onViewUser}
                onCloseModal={onClosePostLikes} />
            <CommentLikes
                commentId={viewCommentLikesCommentId}
                onViewUser={props.onViewUser}
                onCloseModal={onCloseCommentLikes} />
        </>
    )
}