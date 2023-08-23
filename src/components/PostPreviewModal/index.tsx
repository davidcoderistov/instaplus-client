import React, { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import IconButton from '@mui/material/IconButton'
import { Close } from '@mui/icons-material'
import PostPreviewSlider from '../PostPreviewSlider'
import PostPreview from '../PostPreview'
import { useClickOutside } from '../../hooks'
import { Post } from '../../types/Post'
import { Comment } from '../../types/Comment'


interface Props {
    open: boolean

    onClose(): void

    post: Post | null
    postLoading: boolean
    comments: Comment[]
    commentsLoading: boolean
    hasMoreComments: boolean
    isPostingComment: boolean
    viewingPostLikes: boolean
    viewingCommentLikes: boolean

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

    onReplyToComment(commentId: string | number, comment: string): void

    onLikeComment(commentId: string | number, postId: string | number): void

    onUnlikeComment(commentId: string | number, postId: string | number): void

    onViewReplies(commentId: string | number): void

    onHideReplies(commentId: string | number): void

    onPostComment(comment: string): void
}

export default function PostPreviewModal(props: Props) {

    const postRef = useRef<Node | null>(null)

    const closeModal = () => {
        if (!settingsModalOpenRef.current && !unfollowUserModalRef.current && !props.viewingPostLikes && !props.viewingCommentLikes) {
            props.onClose()
        }
    }

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            if (event.key === 'Escape') {
                closeModal()
            }
        }
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    useClickOutside(postRef, closeModal)

    const settingsModalOpenRef = useRef(false)

    const handleOpenSettingsModal = () => {
        settingsModalOpenRef.current = true
    }

    const handleCloseSettingsModal = () => {
        settingsModalOpenRef.current = false
    }

    const unfollowUserModalRef = useRef(false)

    const handleOpenUnfollowUserModal = () => {
        unfollowUserModalRef.current = true
    }

    const handleCloseUnfollowUserModal = () => {
        unfollowUserModalRef.current = false
    }

    return (

        <Backdrop
            sx={{ zIndex: 9999 }}
            open={props.open}
        >
            <Box
                component='div'
                position='absolute'
                boxSizing='border-box'
                height='100%'
                width='100%'
                display='block'
            >
                <Box
                    component='div'
                    height='100%'
                    width='100%'
                    position='relative'
                    display='block'
                >
                    <Box
                        component='div'
                        zIndex='3'
                        display='block'
                        overflow='hidden'
                        position='absolute'
                        margin='10px'
                        right='0'
                        sx={{ opacity: '1' }}
                    >
                        <IconButton sx={{ color: '#FFFFFF' }}>
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Box
                component='div'
                width='100%'
                height='100%'
                justifyContent='center'
                minWidth='0'
                boxSizing='border-box'
                display='flex'
                minHeight='0'
                alignItems='flex-start'
                sx={{
                    pointerEvents: 'none',
                }}
            >
                <Box
                    component='div'
                    justifyContent='center'
                    width='100%'
                    flexDirection='column'
                    margin='0'
                    display='flex'
                    alignItems='center'
                    height='100%'
                    position='relative'
                    zIndex='0'
                    boxSizing='content-box'
                    overflow='hidden'
                    sx={{
                        pointerEvents: 'none',
                        outline: 'none',
                    }}
                >
                    <Box
                        component='div'
                        width='100%'
                        margin='auto'
                        maxHeight='calc(100vh-40px)'
                        maxWidth='calc(100%-128px)'
                        overflow='hidden'
                        sx={{
                            borderBottomRightRadius: '4px',
                            borderTopRightRadius: '4px',
                            borderTopLeftRadius: '4px',
                            borderBottomLeftRadius: '4px',
                        }}
                        display='block'
                    >
                        <Box
                            component='div'
                            display='flex'
                            flexDirection='column'
                            height='100%'
                            maxWidth='100%'
                        >
                            <Box
                                component='div'
                                width='100%'
                                maxHeight='inherit'
                                padding='0'
                                display='block'
                            >
                                <Box
                                    ref={postRef}
                                    component='div'
                                    maxHeight='inherit'
                                    maxWidth='inherit'
                                    borderRadius='0'
                                    justifyContent='center'
                                    bgcolor='transparent'
                                    boxSizing='border-box'
                                    display='flex'
                                    alignItems='stretch'
                                    flexDirection='row'
                                    position='relative'
                                    sx={{
                                        overflowY: 'visible',
                                        overflowX: 'visible',
                                    }}
                                >
                                    <PostPreviewSlider
                                        loading={props.postLoading || !props.post || props.post.photoUrls.length < 1}
                                        photoUrls={props.post ? props.post.photoUrls : []}
                                    />
                                    <PostPreview
                                        post={props.post}
                                        postLoading={props.postLoading}
                                        comments={props.comments}
                                        commentsLoading={props.commentsLoading}
                                        hasMoreComments={props.hasMoreComments}
                                        isPostingComment={props.isPostingComment}
                                        onFollowUser={props.onFollowUser}
                                        onUnfollowUser={props.onUnfollowUser}
                                        onLikePost={props.onLikePost}
                                        onUnlikePost={props.onUnlikePost}
                                        onSavePost={props.onSavePost}
                                        onRemovePost={props.onRemovePost}
                                        onCommentOnPost={props.onCommentOnPost}
                                        onViewPostLikes={props.onViewPostLikes}
                                        onViewPost={props.onViewPost}
                                        onFetchMoreComments={props.onFetchMoreComments}
                                        onViewUser={props.onViewUser}
                                        onViewCommentLikes={props.onViewCommentLikes}
                                        onReplyToComment={props.onReplyToComment}
                                        onLikeComment={props.onLikeComment}
                                        onUnlikeComment={props.onUnlikeComment}
                                        onViewReplies={props.onViewReplies}
                                        onHideReplies={props.onHideReplies}
                                        onPostComment={props.onPostComment}
                                        onOpenSettingsModal={handleOpenSettingsModal}
                                        onCloseSettingsModal={handleCloseSettingsModal}
                                        onOpenUnfollowUserModal={handleOpenUnfollowUserModal}
                                        onCloseUnfollowUserModal={handleCloseUnfollowUserModal}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Backdrop>
    )
}