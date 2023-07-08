import Box from '@mui/material/Box'
import PostLikesContainer from './PostLikesContainer'


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

export default function PostLikes(props: Props) {

    return props.dense ? (
        <Box
            component='div'
            marginBottom='0'
            display='block'
        >
            <Box
                component='div'
                borderRadius='0'
                bgcolor='transparent'
                minWidth='0'
                boxSizing='border-box'
                display='flex'
                alignItems='center'
                minHeight='0'
                flexDirection='row'
                justifyContent='flex-start'
                position='relative'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                }}
            >
                <PostLikesContainer
                    postId={props.postId}
                    dense={props.dense}
                    likingUsers={props.likingUsers}
                    likingUser={props.likingUser}
                    likesCount={props.likesCount}
                    onViewUser={props.onViewUser}
                    onViewLikes={props.onViewLikes}
                    onViewPost={props.onViewPost} />
            </Box>
        </Box>
    ) : (
        <Box
            component='div'
            paddingLeft='16px'
            paddingRight='16px'
            marginBottom='4px'
            order='4'
            display='block'
        >
            <Box
                component='div'
                borderRadius='0'
                bgcolor='transparent'
                minWidth='0'
                boxSizing='border-box'
                display='flex'
                minHeight='0'
                alignItems='stretch'
                flexDirection='row'
                justifyContent='flex-start'
                position='relative'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                }}
            >
                <PostLikesContainer
                    postId={props.postId}
                    dense={props.dense}
                    likingUsers={props.likingUsers}
                    likingUser={props.likingUser}
                    likesCount={props.likesCount}
                    onViewUser={props.onViewUser}
                    onViewLikes={props.onViewLikes}
                    onViewPost={props.onViewPost} />
            </Box>
        </Box>
    )
}