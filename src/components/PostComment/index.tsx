import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import PostBaseComment from './PostBaseComment'
import { formatNumber } from '../../utils'
import _isEqual from 'lodash/isEqual'


interface Creator {
    id: string | number
    username: string
    photoUrl?: string | null
}

interface Comment {
    id: string | number
    creator: Creator
    body: string
    postId: string | number
    isLiked: boolean
    likesCount: number
    repliesCount: number
    replies: Comment[]
    showReplies: boolean
    repliesLoading: boolean
    createdAt: number
}

interface StaticProps {
    loading?: never
    comment: Comment
    condensed?: boolean
    dense?: boolean

    onViewUser(userId: string | number): void

    onViewCommentLikes(commentId: string | number): void

    onReplyToComment(commentId: string | number, username: string): void

    onLikeComment(commentId: string | number, postId: string | number): void

    onUnlikeComment(commentId: string | number, postId: string | number): void

    onViewReplies(commentId: string | number): void

    onHideReplies(commentId: string | number): void
}

interface LoadingProps {
    loading: true
    comment?: never
    condensed?: boolean
    dense?: boolean

    onViewUser?(): never

    onViewCommentLikes?(): never

    onReplyToComment?(): never

    onLikeComment?(): never

    onUnlikeComment?(): never

    onViewReplies?(): never

    onHideReplies?(): never
}

type Props = StaticProps | LoadingProps

const PostComment = React.memo((props: Props) => {

    const shownRepliesCount = props.loading ? 0 : props.comment.showReplies ? props.comment.repliesCount - props.comment.replies.length : props.comment.repliesCount

    const handleClickReplies = () => {
        if (!props.loading) {
            if (shownRepliesCount > 0) {
                if (!props.comment.repliesLoading) {
                    props.onViewReplies(props.comment.id)
                }
            } else {
                props.onHideReplies(props.comment.id)
            }
        }
    }

    return (
        <Box
            component='div'
            border='0'
            fontSize='100%'
            marginX='0'
            marginTop='0'
            marginBottom={props.condensed ? '0' : '16px'}
            padding='0'
            sx={{
                verticalAlign: 'baseline',
            }}
        >
            {props.loading ? (
                <PostBaseComment
                    condensed={props.condensed}
                    dense={props.dense}
                    loading />
            ) : (
                <PostBaseComment
                    comment={props.comment}
                    condensed={props.condensed}
                    dense={props.dense}
                    onViewUser={props.onViewUser}
                    onViewCommentLikes={props.onViewCommentLikes}
                    onReplyToComment={props.onReplyToComment}
                    onLikeComment={props.onLikeComment}
                    onUnlikeComment={props.onUnlikeComment} />
            )}
            {!props.loading && !props.condensed && props.comment.repliesCount > 0 && (
                <Box
                    component='div'
                    display='block'
                >
                    <Box
                        component='div'
                        margin='12px 0 0 54px'
                        padding='0'
                        width='calc(100% - 54px)'
                        border='0'
                        fontSize='100%'
                        sx={{ verticalAlign: 'baseline' }}
                    >
                        <Box
                            component='div'
                            border='0'
                            display='inline-block'
                            fontSize='100%'
                            marginX='0'
                            marginTop='0'
                            marginBottom={props.comment.showReplies && props.comment.replies.length > 0 ? '13px' : '0'}
                            padding='0'
                            sx={{ verticalAlign: 'baseline' }}
                        >
                            <Box
                                component='div'
                                borderRadius='0'
                                bgcolor='transparent'
                                margin='0'
                                boxSizing='border-box'
                                display='flex'
                                alignItems='stretch'
                                flexDirection='row'
                                justifyContent='flex-start'
                                position='relative'
                                sx={{
                                    overflowY: 'visible',
                                    overflowX: 'visible',
                                }}
                            >
                                <Box
                                    component='div'
                                    border='0'
                                    display='inline-block'
                                    padding='0!important'
                                    position='relative'
                                    textAlign='center'
                                    boxSizing='border-box'
                                    fontSize='14px'
                                    fontWeight='600'
                                    sx={{
                                        cursor: 'pointer',
                                        pointerEvents: 'auto',
                                        textOverflow: 'ellipsis',
                                        textTransform: 'inherit',
                                        width: 'auto',
                                    }}
                                    onClick={handleClickReplies}
                                >
                                    <Box
                                        component='div'
                                        border='0'
                                        borderBottom='1px solid #A8A8A8'
                                        boxSizing='border-box'
                                        display='inline-block'
                                        fontSize='100%'
                                        height='0'
                                        margin='0'
                                        marginRight='16px'
                                        padding='0'
                                        position='relative'
                                        width='24px'
                                        sx={{ verticalAlign: 'middle' }}
                                    />
                                    <Box
                                        component='span'
                                        border='0'
                                        color='#A8A8A8'
                                        fontSize='12px'
                                        fontWeight='600'
                                        lineHeight='18px'
                                        margin='0'
                                        padding='0'
                                        sx={{ verticalAlign: 'baseline' }}
                                    >
                                        {shownRepliesCount > 0 ? `View replies (${formatNumber(shownRepliesCount)})` : 'Hide replies'}
                                    </Box>
                                    {props.comment.repliesLoading && (
                                        <CircularProgress
                                            size={16}
                                            thickness={5}
                                            sx={{
                                                position: 'absolute',
                                                top: '3px',
                                                color: 'grey',
                                                marginLeft: '8px',
                                            }} />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        {props.comment.showReplies && props.comment.replies.map(comment => (
                            <PostComment
                                key={comment.id}
                                comment={comment}
                                onViewUser={props.onViewUser}
                                onViewCommentLikes={props.onViewCommentLikes}
                                onReplyToComment={props.onReplyToComment}
                                onLikeComment={props.onLikeComment}
                                onUnlikeComment={props.onUnlikeComment}
                                onViewReplies={props.onViewReplies}
                                onHideReplies={props.onHideReplies} />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}, (prevProps, nextProps) => {

    const { comment: prevComment, ...prevRest } = prevProps
    const { comment: nextComment, ...nextRest } = nextProps

    const commentsEqual = _isEqual(prevComment, nextComment)

    const restPropsEqual = _isEqual(prevRest, nextRest)

    return commentsEqual && restPropsEqual
})

export default PostComment