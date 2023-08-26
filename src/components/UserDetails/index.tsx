import { useState, useEffect } from 'react'
import { useAuthUser } from '../../hooks/misc'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FIND_USER_DETAILS } from '../../graphql/queries/user'
import { FindUserDetailsQueryType } from '../../graphql/types/queries/user'
import Box from '@mui/material/Box'
import ProfileDescription from '../../lib/src/components/ProfileDescription'
import FollowersModal from '../FollowersModal'
import FollowingModal from '../FollowingModal'


export default function UserDetails() {

    const [authUser] = useAuthUser()

    const { userId } = useParams()

    const findUserDetails = useQuery<FindUserDetailsQueryType>(FIND_USER_DETAILS, { variables: { userId } })

    const [viewFollowersUserId, setViewFollowersUserId] = useState<string | null>(null)

    const handleViewFollowers = () => {
        if (userId) {
            setViewFollowersUserId(userId)
        }
    }

    const handleCloseFollowersModal = () => {
        setViewFollowersUserId(null)
    }

    const [viewFollowingUserId, setViewFollowingUserId] = useState<string | null>(null)

    const handleViewFollowing = () => {
        if (userId) {
            setViewFollowingUserId(userId)
        }
    }

    const handleCloseFollowingModal = () => {
        setViewFollowingUserId(null)
    }

    useEffect(() => {
        setViewFollowersUserId(null)
        setViewFollowingUserId(null)
    }, [userId])

    return (
        <Box
            component='div'
            minHeight='100vh'
            width='100%'
            display='flex'
            flexDirection='column'
            sx={{
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            <Box
                component='div'
                bgcolor='#000000'
                display='flex'
                flexDirection='column'
                flexGrow='1'
            >
                {findUserDetails.loading ? (
                    <Box
                        component='div'
                        padding='30px 20px 0'
                        boxSizing='content-box'
                        width='calc(100%-40px)'
                        flexGrow='1'
                        margin='0 auto 30px'
                        maxWidth='935px'
                        display='block'
                    >
                        <ProfileDescription loading />
                    </Box>
                ) : findUserDetails.data ? (
                    <Box
                        component='div'
                    >
                        <Box
                            component='div'
                            padding='30px 20px 0'
                            boxSizing='content-box'
                            width='calc(100%-40px)'
                            maxWidth='935px'
                            display='block'
                            margin='0 auto'
                        >
                            <ProfileDescription
                                profile={authUser._id === userId}
                                user={{
                                    id: findUserDetails.data.findUserDetails.followableUser.user._id,
                                    firstName: findUserDetails.data.findUserDetails.followableUser.user.firstName,
                                    lastName: findUserDetails.data.findUserDetails.followableUser.user.lastName,
                                    username: findUserDetails.data.findUserDetails.followableUser.user.username,
                                    photoUrl: findUserDetails.data.findUserDetails.followableUser.user.photoUrl,
                                    following: findUserDetails.data.findUserDetails.followableUser.following,
                                    followingLoading: findUserDetails.data.findUserDetails.followableUser.followingLoading,
                                }}
                                postsCount={findUserDetails.data.findUserDetails.postsCount}
                                followersCount={findUserDetails.data.findUserDetails.followersCount}
                                followingCount={findUserDetails.data.findUserDetails.followingCount}
                                mutualFollowersCount={findUserDetails.data.findUserDetails.mutualFollowersCount}
                                mutualFollowersUsernames={findUserDetails.data.findUserDetails.latestTwoMutualFollowersUsernames}
                                onViewFollowers={handleViewFollowers}
                                onViewFollowing={handleViewFollowing}
                            />
                        </Box>
                    </Box>
                ) : (
                    <Box
                        component='div'
                        marginLeft='50px'
                        marginY='300px'
                    >
                        not found
                    </Box>
                )}
            </Box>
            <FollowersModal
                userId={viewFollowersUserId}
                onCloseModal={handleCloseFollowersModal} />
            <FollowingModal
                userId={viewFollowingUserId}
                onCloseModal={handleCloseFollowingModal} />
        </Box>
    )
}