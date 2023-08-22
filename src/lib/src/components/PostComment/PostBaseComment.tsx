import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Skeleton from '@mui/material/Skeleton'
import { getTimeElapsed, formatNumber } from '../../utils'


interface Creator {
    id: string | number
    username: string
    photoUrl?: string | null
}

interface Comment {
    id: string | number
    creator: Creator
    body: string
    isLiked: boolean
    likesCount: number
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

    onLikeComment(commentId: string | number): void

    onUnlikeComment(commentId: string | number): void
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
}

type Props = StaticProps | LoadingProps

export default function PostBaseComment(props: Props) {

    const createdAt = props.loading ? null : getTimeElapsed(props.comment.createdAt, 'minutes')

    const likesCount = props.loading || props.comment.likesCount < 1 ? 0 : formatNumber(props.comment.likesCount)

    const handleViewUser = () => {
        if (!props.loading) {
            props.onViewUser(props.comment.creator.id)
        }
    }

    const handleViewCommentLikes = () => {
        if (!props.loading) {
            props.onViewCommentLikes(props.comment.id)
        }
    }

    const handleReplyToComment = () => {
        if (!props.loading) {
            props.onReplyToComment(props.comment.id, props.comment.creator.username)
        }
    }

    const handleClickLikeComment = () => {
        if (!props.loading) {
            if (props.comment.isLiked) {
                props.onUnlikeComment(props.comment.id)
            } else {
                props.onLikeComment(props.comment.id)
            }
        }
    }

    return (
        <Box
            component='div'
            fontSize='100%'
            flexDirection='column'
            padding='0'
            margin='0'
            border='0'
            boxSizing='border-box'
            display='flex'
            alignItems='stretch'
            position='relative'
            sx={{
                touchAction: 'manipulation',
                verticalAlign: 'baseline',
            }}
        >
            <Box
                component='div'
                overflow='visible'
                paddingTop='12px'
                paddingBottom='0'
                paddingX='0'
                width='auto'
                marginRight='-2px'
                marginTop='-5px'
                position='relative'
                sx={{
                    wordWrap: 'break-word',
                }}
            >
                <Box
                    component='div'
                    alignItems='flex-start'
                    border='0'
                    boxSizing='border-box'
                    display='flex'
                    flexDirection='row'
                    fontSize='100%'
                    justifyContent='space-between'
                    margin='0'
                    padding='0'
                    position='relative'
                    sx={{ verticalAlign: 'baseline' }}
                >
                    <Box
                        component='div'
                        display='flex'
                        alignItems='flex-start'
                        flexDirection='row'
                        width='calc(100% - 28px)'
                    >
                        <Box
                            component='div'
                            display='block'
                        >
                            <Box
                                component='div'
                                display='block'
                            >
                                <Box
                                    component='div'
                                    display='block'
                                    position='relative'
                                    margin='0 18px 0 0'
                                >
                                    <Box
                                        component='div'
                                        height='32px'
                                        width='32px'
                                        borderRadius='50%'
                                        borderColor='#00000066'
                                        bgcolor={props.loading ? '#000000' : '#1A1A1A'}
                                        padding='0'
                                        minWidth='0'
                                        flexDirection='column'
                                        margin='0'
                                        boxSizing='border-box'
                                        display='flex'
                                        minHeight='0'
                                        overflow='hidden'
                                        alignItems='stretch'
                                        position='relative'
                                        zIndex='0'
                                        textAlign='inherit'
                                        sx={{
                                            borderStyle: 'solid',
                                            borderWidth: '0',
                                            touchAction: 'manipulation',
                                            cursor: props.loading ? 'default' : 'pointer',
                                        }}
                                        onClick={handleViewUser}
                                    >
                                        {props.loading ? (
                                            <Skeleton
                                                variant='circular'
                                                width={32}
                                                height={32}
                                                sx={{ backgroundColor: '#202020' }} />
                                        ) : props.comment.creator.photoUrl ? (
                                            <img
                                                alt={`${props.comment.creator.username} profile picture`}
                                                style={{
                                                    fontSize: '100%',
                                                    width: '100%',
                                                    height: '100%',
                                                    verticalAlign: 'baseline',
                                                    padding: '0',
                                                    margin: '0',
                                                    border: '0',
                                                }}
                                                src={props.comment.creator.photoUrl} />
                                        ) : (
                                            <Avatar sx={{ height: 32, width: 32 }} />
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            component='div'
                            border='0'
                            boxSizing='border-box'
                            display='inline-block'
                            flexShrink='1'
                            fontSize='100%'
                            margin='0'
                            minWidth='0'
                            padding='0'
                            position='relative'
                            lineHeight='14px'
                            sx={{ verticalAlign: 'baseline' }}
                        >
                            <Box
                                component='h3'
                                display='inline-flex'
                                alignItems='center'
                                color='#F5F5F5'
                                fontSize='13px'
                                fontWeight='600'
                                margin='0'
                                padding='0'
                            >
                                <Box
                                    component='div'
                                    marginRight='4px'
                                    borderRadius='0'
                                    bgcolor='transparent'
                                    flexDirection='column'
                                    boxSizing='border-box'
                                    display='flex'
                                    flexShrink='0'
                                    alignItems='stretch'
                                    alignSelf='auto'
                                    justifyContent='flex-start'
                                    position='relative'
                                    flexGrow='0'
                                    sx={{
                                        overflowY: 'visible',
                                        overflowX: 'visible',
                                    }}
                                >
                                    <Box
                                        component='div'
                                        display='inline'
                                        fontWeight='600'
                                        color='#F5F5F5'
                                        borderColor='#00000066'
                                        padding='0'
                                        bgcolor='transparent'
                                        minWidth='0'
                                        margin='0'
                                        boxSizing='border-box'
                                        minHeight='0'
                                        textAlign='center'
                                        position='relative'
                                        zIndex='0'
                                        fontSize='0.875rem'
                                        lineHeight='18px'
                                        borderRadius='2px'
                                        sx={{
                                            borderWidth: '0',
                                            textOverflow: 'ellipsis',
                                            touchAction: 'manipulation',
                                            userSelect: 'none',
                                            cursor: props.loading ? 'default' : 'pointer',
                                            borderStyle: 'none',
                                            outlineStyle: 'none',
                                        }}
                                        onClick={handleViewUser}
                                    >
                                        {props.loading ? (
                                            <Skeleton
                                                variant='rounded'
                                                width={props.dense ? 270 : 360}
                                                height={11}
                                                sx={{
                                                    backgroundColor: '#202020',
                                                    borderRadius: '8px',
                                                }} />
                                        ) : props.comment.creator.username}
                                    </Box>
                                </Box>
                            </Box>
                            {!props.loading && (
                                <Box
                                    component='div'
                                    display='inline'
                                    margin='0!important'
                                    color='#F5F5F5'
                                    fontWeight='400'
                                    fontSize='14px'
                                    lineHeight='18px'
                                >
                                    {props.comment.body}
                                </Box>
                            )}
                            <Box
                                component='div'
                                borderRadius='0'
                                bgcolor='transparent'
                                flexDirection='column'
                                boxSizing='border-box'
                                display='flex'
                                marginTop='8px'
                                alignItems='stretch'
                                justifyContent='flex-start'
                                position='relative'
                                marginBottom='4px'
                                sx={{
                                    overflowY: 'visible',
                                    overflowX: 'visible',
                                }}
                            >
                                <Box
                                    component='span'
                                    lineHeight='16px'
                                    fontWeight='400'
                                    minWidth='0'
                                    margin='0!important'
                                    color='#A8A8A8'
                                    position='relative'
                                    display='block'
                                    fontSize='12px'
                                    maxWidth='100%'
                                    sx={{
                                        overflowY: 'visible',
                                        overflowX: 'visible',
                                        wordWrap: 'break-word',
                                        whiteSpace: 'pre-line',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {props.loading ? (
                                        <Skeleton
                                            variant='rounded'
                                            width={props.dense ? 210 : 300}
                                            height={10}
                                            sx={{
                                                backgroundColor: '#202020',
                                                borderRadius: '8px',
                                            }} />
                                    ) : (
                                        <>
                                            <Box
                                                component='div'
                                                display='inline'
                                                padding='0'
                                                margin='0'
                                                border='0'
                                                bgcolor='transparent'
                                                boxSizing='border-box'
                                                textAlign='inherit'
                                                sx={{
                                                    touchAction: 'manipulation',
                                                    outline: 'none',
                                                }}
                                            >
                                                <Box
                                                    component='span'
                                                    fontSize='12px'
                                                    lineHeight='16px'
                                                    fontWeight='400'
                                                    color='#A8A8A8'
                                                    border='none'
                                                    display='inline'
                                                    marginRight='12px!important'
                                                    padding='0'
                                                    position='relative'
                                                >
                                                    {createdAt}
                                                </Box>
                                            </Box>
                                            {!props.condensed && props.comment.likesCount > 0 && (
                                                <Box
                                                    component='div'
                                                    color='#A8A8A8'
                                                    border='none'
                                                    display='inline'
                                                    marginRight='12px!important'
                                                    padding='0'
                                                    position='relative'
                                                    fontSize='14px'
                                                    lineHeight='18px'
                                                    margin='0'
                                                    sx={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={handleViewCommentLikes}
                                                >
                                                    <Box
                                                        component='span'
                                                        display='inline'
                                                        lineHeight='16px'
                                                        minWidth='0'
                                                        margin='0!important'
                                                        fontWeight='600'
                                                        color='#A8A8A8'
                                                        fontSize='12px'
                                                        maxWidth='100%'
                                                        sx={{
                                                            wordWrap: 'break-word',
                                                            whiteSpace: 'pre-line',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {likesCount} {props.comment.likesCount > 1 ? 'likes' : 'like'}
                                                    </Box>
                                                </Box>
                                            )}
                                            {!props.condensed && (
                                                <Box
                                                    component='div'
                                                    color='#A8A8A8'
                                                    border='none'
                                                    display='inline'
                                                    marginRight='12px!important'
                                                    padding='0'
                                                    position='relative'
                                                    fontSize='14px'
                                                    lineHeight='18px'
                                                    margin='0'
                                                    sx={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={handleReplyToComment}
                                                >
                                                    <Box
                                                        component='span'
                                                        display='inline'
                                                        lineHeight='16px'
                                                        minWidth='0'
                                                        margin='0!important'
                                                        fontWeight='600'
                                                        color='#A8A8A8'
                                                        fontSize='12px'
                                                        maxWidth='100%'
                                                        sx={{
                                                            wordWrap: 'break-word',
                                                            whiteSpace: 'pre-line',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        Reply
                                                    </Box>
                                                </Box>
                                            )}
                                        </>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {!props.loading && !props.condensed && (
                        <Box
                            component='span'
                            marginTop='9px'
                        >
                            <Box
                                component='div'
                                bgcolor='transparent'
                                border='none'
                                lineHeight='inherit'
                                padding='0'
                                display='block'
                                sx={{
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                <Box
                                    component='div'
                                    padding='0'
                                    margin='0'
                                    alignItems='center'
                                    bgcolor='transparent'
                                    border='none'
                                    display='flex'
                                    justifyContent='center'
                                    color='#F5F5F5'
                                    fontSize='14px'
                                    lineHeight='18px'
                                    sx={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleClickLikeComment}
                                >
                                    <Box
                                        component='div'
                                        display='flex'
                                        justifyContent='center'
                                        alignItems='center'
                                    >
                                        {props.comment.isLiked ? (
                                            <svg
                                                aria-label='Unlike'
                                                style={{ position: 'relative', display: 'block' }}
                                                color='rgb(255, 48, 64)'
                                                fill='rgb(255, 48, 64)'
                                                height='12'
                                                role='img'
                                                viewBox='0 0 48 48'
                                                width='12'
                                            >
                                                <title>Unlike</title>
                                                <path
                                                    d='M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z' />
                                            </svg>
                                        ) : (
                                            <svg
                                                aria-label='Like'
                                                style={{ position: 'relative', display: 'block' }}
                                                color='rgb(245, 245, 245)'
                                                fill='rgb(245, 245, 245)'
                                                height='12'
                                                role='img'
                                                viewBox='0 0 24 24'
                                                width='12'
                                            >
                                                <title>Like</title>
                                                <path
                                                    d='M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z' />
                                            </svg>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}