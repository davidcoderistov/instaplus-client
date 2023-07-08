import Box from '@mui/material/Box'
import PostLikeAvatar from './PostLikeAvatar'


interface User {
    id: string | number
    username: string
    photoUrl: string
}

interface Props {
    dense?: boolean
    likingUsers: User[]

    onViewLikes(): void
}

export default function PostLikeAvatars(props: Props) {

    return (
        <Box
            component='div'
            marginRight='4px'
            borderRadius='0'
            bgcolor='transparent'
            flexDirection='column'
            boxSizing='border-box'
            display='flex'
            flexShrink='0'
            alignSelf='auto'
            justifyContent='flex-start'
            position='relative'
            alignItems='flex-start'
            flexGrow='0'
            sx={{
                overflowY: 'visible',
                overflowX: 'visible',
            }}
        >
            <Box
                component='div'
                display='inline'
                padding='0'
                bgcolor='transparent'
                margin='0'
                border='0'
                boxSizing='border-box'
                textAlign='inherit'
                sx={{
                    touchAction: 'manipulation',
                    cursor: 'pointer',
                }}
                onClick={props.onViewLikes}
            >
                <Box
                    component='span'
                    lineHeight='18px'
                    fontSize='14px'
                    minWidth='0'
                    margin='0!important'
                    color='#F5F5F5'
                    fontWeight='600'
                    position='relative'
                    display='block'
                    maxWidth='100%'
                    sx={{
                        overflowY: 'visible',
                        overflowX: 'visible',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-line',
                        wordBreak: 'break-word',
                    }}
                >
                    <Box
                        component='div'
                        borderRadius='0'
                        bgcolor='transparent'
                        boxSizing='border-box'
                        display='flex'
                        alignItems='center'
                        flexDirection='row'
                        position='relative'
                        justifyContent='flex-start'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                        }}
                    >
                        {props.likingUsers.map((user, index) => (
                            <PostLikeAvatar
                                key={user.id}
                                gutters={index < props.likingUsers.length - 1}
                                dense={props.dense}
                                username={user.username}
                                photoUrl={user.photoUrl} />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}