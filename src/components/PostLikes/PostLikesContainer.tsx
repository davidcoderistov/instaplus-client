import Box from '@mui/material/Box'
import PostLikeAvatars from '../PostLikeAvatars'
import { formatNumber } from '../../utils'


const Typography = (props: { children: any, onClick?(): void }) => {

    return (
        <Box
            component='span'
            display='inline'
            padding='0'
            margin='0'
            border='0'
            bgcolor='transparent'
            boxSizing='border-box'
            textAlign='inherit'
            sx={{
                touchAction: 'manipulation',
                cursor: 'pointer',
                outline: 'none',
            }}
            onClick={props.onClick}
        >
            <Box
                component='span'
                lineHeight='18px'
                fontSize='14px'
                display='inline'
                minWidth='0'
                margin='0!important'
                color='#F5F5F5'
                fontWeight='600'
                maxWidth='100%'
                sx={{
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word',
                }}
            >
                {props.children}
            </Box>
        </Box>
    )
}

interface User {
    id: string | number
    username: string
    photoUrl: string
}

interface Props {
    postId: string | number
    dense?: boolean
    likingUsers: User[] | null
    likingUser: {
        id: string | number
        username: string
    } | null
    likesCount: number

    onViewUser(userId: string | number): void

    onViewLikes(postId: string | number): void

    onViewPost?(postId: string | number): void
}

export default function PostLikesContainer(props: Props) {

    const handleViewUser = () => {
        if (props.likingUser) {
            props.onViewUser(props.likingUser.id)
        }
    }

    const handleViewLikes = () => {
        props.onViewLikes(props.postId)
    }

    const handleViewPost = () => {
        if (props.onViewPost) {
            props.onViewPost(props.postId)
        }
    }

    return (
        <>
            {props.likingUsers && props.likingUsers.length > 0 && (
                <PostLikeAvatars
                    dense={props.dense}
                    likingUsers={props.likingUsers}
                    onViewLikes={handleViewLikes}
                />
            )}
            <Box
                component='div'
                margin='auto'
                alignContent='stretch'
                borderRadius='0'
                bgcolor='transparent'
                minWidth='0'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                minHeight='0'
                alignSelf='auto'
                justifyContent='flex-start'
                position='relative'
                flexGrow='1'
                alignItems='flex-start'
                flexWrap='wrap'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                }}
            >
                <Box
                    component='span'
                    lineHeight='18px'
                    fontSize='14px'
                    fontWeight='400'
                    minWidth='0'
                    margin='0!important'
                    color='#F5F5F5'
                    position='relative'
                    display='block'
                    maxWidth='100%'
                    sx={{
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-line',
                        wordBreak: 'break-word',
                        overflowY: 'visible',
                        overflowX: 'visible',
                    }}
                >
                    {props.likesCount > 0 && props.likingUser ? (
                        <>
                            Liked by <Typography
                            onClick={handleViewUser}>{props.likingUser.username}</Typography> {props.likesCount > 1 && (
                            <>
                                and <Typography
                                onClick={handleViewLikes}>{formatNumber(props.likesCount - 1)} {props.likesCount - 1 > 1 ? 'others' : 'other'}</Typography>
                            </>
                        )}
                        </>
                    ) : (
                        <>
                            Be the first to like <Typography onClick={handleViewPost}>this</Typography>
                        </>
                    )}
                </Box>
            </Box>
        </>
    )
}