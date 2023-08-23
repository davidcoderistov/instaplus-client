import { useState, useMemo, useCallback, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PostHeader from '../PostHeader'
import PostComments from '../PostComments'
import PostLikes from '../PostLikes'
import PostActions from '../PostActions'
import PostPreviewAddComment from '../PostPreviewAddComment'
import moment from 'moment'
import { Post } from '../../types/Post'
import { Comment } from '../../types/Comment'


interface Props {
    dense?: boolean
    post: Post | null
    postLoading: boolean
    comments: Comment[]
    commentsLoading: boolean
    hasMoreComments: boolean
    isPostingComment: boolean

    onFollowUser(userId: string | number): void

    onUnfollowUser(userId: string | number): void

    onLikePost(postId: string | number): void

    onUnlikePost(postId: string | number): void

    onSavePost(postId: string | number): void

    onRemovePost(postId: string | number): void

    onCommentOnPost?(postId: string | number): void

    onViewPostLikes(postId: string | number): void

    onViewPost(postId: string | number): void

    onFetchMoreComments(): void

    onViewUser(userId: string | number): void

    onViewCommentLikes(commentId: string | number): void

    onReplyToComment(postId: string | number, comment: string, commentId: string | number): void

    onLikeComment(commentId: string | number, postId: string | number): void

    onUnlikeComment(commentId: string | number, postId: string | number): void

    onViewReplies(commentId: string | number): void

    onHideReplies(commentId: string | number): void

    onPostComment(postId: string | number, comment: string): void

    onOpenSettingsModal?(): void

    onCloseSettingsModal?(): void

    onOpenUnfollowUserModal?(): void

    onCloseUnfollowUserModal?(): void
}

export default function PostPreview(props: Props) {

    const timeAgo = useMemo(() => {
        if (props.post) {
            const now = moment()
            const ago = moment(props.post.createdAt)
            if (now.diff(ago, 'minutes') < 60) {
                const diffMinutes = now.diff(ago, 'minutes')
                const time = diffMinutes > 0 ? diffMinutes : 1
                return `${time} ${time === 1 ? 'minute' : 'minutes'} ago`
            } else if (now.diff(ago, 'hours') < 24) {
                const diffHours = now.diff(ago, 'hours')
                return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
            } else if (now.diff(ago, 'days') < 7) {
                const diffDays = now.diff(ago, 'days')
                return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
            } else if (now.diff(ago, 'years') < 1) {
                return ago.format('MMMM D')
            } else {
                return ago.format('MMMM D, YYYY')
            }
        }
        return null
    }, [props.post])

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleCommentOnPost = (postId: string | number) => {
        if (props.onCommentOnPost) {
            props.onCommentOnPost(postId)
        } else {
            inputRef.current?.focus()
        }
    }

    const [replyingCommentId, setReplyingCommentId] = useState<string | number | null>(null)
    const [replyingUsername, setReplyingUsername] = useState<string | null>(null)

    const handleReplyToComment = useCallback((commentId: string | number, username: string) => {
        setReplyingCommentId(commentId)
        setReplyingUsername(username)
    }, [])

    const handleCloseReplyToComment = () => {
        setReplyingCommentId(null)
        setReplyingUsername(null)
    }

    const handlePostComment = (comment: string) => {
        const postId = (props.post as Post).id
        if (replyingCommentId) {
            props.onReplyToComment(postId, comment, replyingCommentId)
            setReplyingCommentId(null)
            setReplyingUsername(null)
        } else {
            props.onPostComment(postId, comment)
        }
    }

    return (
        <Box
            component='div'
            alignItems='stretch'
            border='0'
            boxSizing='border-box'
            display='flex'
            flexDirection='column'
            flexGrow='1'
            flexShrink='2'
            fontSize='100%'
            margin='0'
            maxWidth='500px'
            minWidth='405px'
            padding='0'
            position='relative'
            sx={{ verticalAlign: 'baseline' }}
        >
            <Box
                component='div'
                bgcolor='transparent'
                minWidth='0'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                minHeight='0'
                alignItems='stretch'
                alignSelf='auto'
                justifyContent='flex-start'
                position='relative'
                flexGrow='1'
                borderRadius='0'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                }}
            >
                <Box
                    component='div'
                    borderRadius='0 4px 4px 0'
                    display='flex'
                    flexDirection='column'
                    position='relative'
                    bgcolor='#000000'
                    height='100%'
                    sx={{ pointerEvents: 'auto' }}
                >
                    <Box
                        component='div'
                        borderLeft='1px solid #262626'
                        bgcolor='#000000'
                        borderBottom='1px solid #262626'
                        marginRight='0'
                        borderRadius='4px'
                        display='block'
                    >
                        {props.postLoading ? (
                            <PostHeader loading />
                        ) : props.post ? (
                            <PostHeader
                                post={props.post}
                                user={props.post.creator}
                                onFollowUser={props.onFollowUser}
                                onUnfollowUser={props.onUnfollowUser}
                                onGoToPost={props.onViewPost}
                                onViewProfile={props.onViewUser}
                                onOpenSettingsModal={props.onOpenSettingsModal}
                                onCloseSettingsModal={props.onCloseSettingsModal}
                                onOpenUnfollowUserModal={props.onOpenUnfollowUserModal}
                                onCloseUnfollowUserModal={props.onCloseUnfollowUserModal}
                            />
                        ) : null}
                    </Box>
                    <Box
                        component='div'
                        borderLeft='1px solid #262626'
                        padding='0'
                        boxSizing='border-box'
                        flexGrow='1'
                        display='flex'
                        flexDirection='column'
                        minWidth='335px'
                        position='relative'
                        width='100%'
                    >
                        {!props.postLoading && props.post && (
                            <PostActions
                                postId={props.post.id}
                                isPostLiked={props.post.isLiked}
                                onLikePost={props.onLikePost}
                                onUnlikePost={props.onUnlikePost}
                                isPostSaved={props.post.isSaved}
                                onSavePost={props.onSavePost}
                                onRemovePost={props.onRemovePost}
                                onCommentOnPost={handleCommentOnPost}
                            />
                        )}
                        {!props.postLoading && props.post && (
                            <PostLikes
                                postId={props.post.id}
                                likingUsers={props.post.lastLikingMutualFollowers}
                                likingUser={props.post.lastLikingUser}
                                likesCount={props.post.likesCount}
                                onViewUser={props.onViewUser}
                                onViewLikes={props.onViewPostLikes}
                                onViewPost={props.onViewPost}
                            />
                        )}
                        <PostComments
                            dense={props.dense}
                            post={props.post}
                            postLoading={props.postLoading}
                            comments={props.comments}
                            commentsLoading={props.commentsLoading}
                            hasMoreComments={props.hasMoreComments}
                            onFetchMoreComments={props.onFetchMoreComments}
                            onViewUser={props.onViewUser}
                            onViewCommentLikes={props.onViewCommentLikes}
                            onReplyToComment={handleReplyToComment}
                            onLikeComment={props.onLikeComment}
                            onUnlikeComment={props.onUnlikeComment}
                            onViewReplies={props.onViewReplies}
                            onHideReplies={props.onHideReplies}
                        />
                        {!props.postLoading && props.post && (
                            <Box
                                component='div'
                                paddingLeft='16px'
                                order='5'
                                marginBottom='16px'
                                display='block'
                            >
                                <Typography
                                    fontSize={10}
                                    color='#A8A8A8'
                                    fontFamily='Arial'
                                    sx={{
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {timeAgo}
                                </Typography>
                            </Box>
                        )}
                        <PostPreviewAddComment
                            ref={inputRef}
                            isReplying={!!replyingCommentId}
                            replyingUsername={replyingUsername}
                            isPostingComment={props.isPostingComment}
                            disabled={props.postLoading || props.commentsLoading}
                            onPostComment={handlePostComment}
                            onCancelReply={handleCloseReplyToComment} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}