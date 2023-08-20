import { Box, Dialog, IconButton, Typography } from '@mui/material'
import FollowableUserList from '../FollowableUserList'
import { Close } from '@mui/icons-material'


interface User {
    id: string | number
    username: string
    firstName: string
    lastName: string
    photoUrl: string | null
    following: boolean
    followingLoading: boolean
}

interface Props {
    title: string
    open: boolean
    onCloseModal: () => void
    authUserId: string | number
    users: User[]
    hasMoreUsers: boolean
    onFetchMoreUsers: () => void
    onFollowUser: (userId: string | number) => void
    onUnfollowUser: (userId: string | number) => void
    onClickUser: (userId: string | number) => void
}

export default function FollowableUsersModal(props: Props) {

    return (
        <Dialog
            open={props.open}
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#262626',
                    borderRadius: '12px',
                    maxWidth: '400px',
                    height: '400px',
                },
            }}
            onClose={props.onCloseModal}
        >
            <Box
                component='div'
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                borderBottom='1px solid #363636'
            >
                <Box component='div' />
                <Typography
                    color='#FFFFFF'
                    position='absolute'
                    left='50%'
                    sx={{
                        transform: 'translateX(-50%)',
                    }}
                >
                    {props.title}
                </Typography>
                <IconButton
                    aria-label='close'
                    onClick={props.onCloseModal}
                >
                    <Close sx={{ color: '#FFFFFF' }} />
                </IconButton>
            </Box>
            <FollowableUserList
                authUserId={props.authUserId}
                users={props.users}
                hasMoreUsers={props.hasMoreUsers}
                onFetchMoreUsers={props.onFetchMoreUsers}
                onFollowUser={props.onFollowUser}
                onUnfollowUser={props.onUnfollowUser}
                onClickUser={props.onClickUser} />
        </Dialog>
    )
}