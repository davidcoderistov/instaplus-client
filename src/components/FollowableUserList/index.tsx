import Box from '@mui/material/Box'
import FollowableUserListItem from '../FollowableUserListItem'
import InfiniteScroll from 'react-infinite-scroll-component'


interface User {
    id: string | number
    username: string
    firstName: string
    lastName: string
    photoUrl: string
    following: boolean
    followingLoading: boolean
}

interface Props {
    authUserId: string | number
    users: User[]
    hasMoreUsers: boolean
    onFetchMoreUsers: () => void
    onFollowUser: (id: string | number) => void
    onUnfollowUser: (id: string | number) => void
    onClickUser: (id: string | number) => void
}

export default function FollowableUserList(props: Props) {

    return (
        <Box
            id='followableUserList'
            component='div'
            display='block'
            width='100%'
            height='100%'
            paddingY='8px'
            sx={{ overflowX: 'hidden', overflowY: 'auto' }}
        >
            {props.users.length < 1 && props.hasMoreUsers ? (
                <Box
                    component='div'
                    display='block'
                >
                    {[...Array(5).keys()].map(index => (
                        <FollowableUserListItem
                            key={index}
                            loading />
                    ))}
                </Box>
            ) : (
                <InfiniteScroll
                    scrollableTarget='followableUserList'
                    next={props.onFetchMoreUsers}
                    hasMore={props.hasMoreUsers}
                    loader={<Box
                        component='div'
                        display='block'
                    >
                        <Box
                            component='div'
                            display='block'
                            position='relative'
                        >
                            <FollowableUserListItem loading />
                            <FollowableUserListItem loading />
                        </Box>
                    </Box>}
                    dataLength={props.users.length}>
                    <Box
                        component='div'
                        display='block'
                    >
                        <Box
                            component='div'
                            display='block'
                            position='relative'
                        >
                            {props.users.map(user => (
                                <FollowableUserListItem
                                    key={user.id}
                                    authUserId={props.authUserId}
                                    user={user}
                                    following={user.following}
                                    followingLoading={user.followingLoading}
                                    onFollowUser={props.onFollowUser}
                                    onUnfollowUser={props.onUnfollowUser}
                                    onClickUser={props.onClickUser}
                                />
                            ))}
                        </Box>
                    </Box>
                </InfiniteScroll>
            )}
        </Box>
    )
}