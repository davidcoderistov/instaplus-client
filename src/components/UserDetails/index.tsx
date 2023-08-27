import React, { useState, useEffect } from 'react'
import { useAuthUser } from '../../hooks/misc'
import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FIND_USER_DETAILS } from '../../graphql/queries/user'
import { FindUserDetailsQueryType } from '../../graphql/types/queries/user'
import Box from '@mui/material/Box'
import ProfileDescription from '../../lib/src/components/ProfileDescription'
import FollowersModal from '../FollowersModal'
import FollowingModal from '../FollowingModal'


const Tab = (props: { name: string, active: boolean, icon: React.ReactNode, onClick(): void }) => {

    return (
        <Box
            component='div'
            display='flex'
            alignItems='center'
            color={props.active ? '#F5F5F5' : '#A8A8A8'}
            marginRight='60px'
            borderTop={props.active ? '1px solid #F5F5F5' : '0'}
            marginTop='-1px!important'
            flexDirection='row'
            height='52px'
            justifyContent='center'
            textTransform='uppercase'
            padding='0'
            bgcolor='transparent'
            boxSizing='border-box'
            sx={{ cursor: 'pointer', touchAction: 'manipulation' }}
            onClick={props.onClick}
        >
            <Box
                component='div'
                display='flex'
                bgcolor='transparent'
                boxSizing='border-box'
                alignItems='center'
                flexShrink='0'
                flexDirection='row'
                alignSelf='auto'
                justifyContent='flex-start'
                position='relative'
                flexGrow='0'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                }}
            >
                <svg
                    aria-label=''
                    style={{ display: 'block', position: 'relative' }}
                    color={props.active ? 'rgb(245, 245, 245)' : 'rgb(168, 168, 168)'}
                    fill={props.active ? 'rgb(245, 245, 245)' : 'rgb(168, 168, 168)'}
                    viewBox='0 0 24 24'
                    height='12'
                    width='12'
                    role='img'
                >
                    {props.icon}
                </svg>
                <Box
                    component='span'
                    padding='0'
                    fontSize='100%'
                    marginLeft='6px'
                    sx={{ verticalAlign: 'baseline' }}
                >
                    {props.name}
                </Box>
            </Box>
        </Box>
    )
}

const PostsTab = (props: { active: boolean, onClick(): void }) => {

    return (
        <Tab
            name='Posts'
            active={props.active}
            onClick={props.onClick}
            icon={<>
                <rect fill='none' height='18' stroke='currentColor' strokeLinecap='round'
                      strokeLinejoin='round' strokeWidth='2' width='18' x='3' y='3' />
                <line fill='none' stroke='currentColor' strokeLinecap='round'
                      strokeLinejoin='round' strokeWidth='2' x1='9.015' x2='9.015' y1='3'
                      y2='21' />
                <line fill='none' stroke='currentColor' strokeLinecap='round'
                      strokeLinejoin='round' strokeWidth='2' x1='14.985' x2='14.985' y1='3'
                      y2='21' />
                <line fill='none' stroke='currentColor' strokeLinecap='round'
                      strokeLinejoin='round' strokeWidth='2' x1='21' x2='3' y1='9.015'
                      y2='9.015' />
                <line fill='none' stroke='currentColor' strokeLinecap='round'
                      strokeLinejoin='round' strokeWidth='2' x1='21' x2='3' y1='14.985'
                      y2='14.985' />
            </>} />
    )
}

const SavedTab = (props: { active: boolean, onClick(): void }) => {

    return (
        <Tab
            name='Saved'
            active={props.active}
            onClick={props.onClick}
            icon={<polygon
                fill='none'
                points='20 21 12 13.44 4 21 4 3 20 3 20 21'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2' />} />
    )
}


export default function UserDetails() {

    const [authUser] = useAuthUser()

    const location = useLocation()
    const isProfileView = location.pathname === '/profile'

    const params = useParams()
    const userId = isProfileView ? authUser._id : params.userId

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

    const [isPostsTabActive, setIsPostsTabActive] = useState(true)

    const handleClickPostsTab = () => {
        setIsPostsTabActive(true)
    }

    const handleClickSavedTab = () => {
        setIsPostsTabActive(false)
    }

    useEffect(() => {
        setViewFollowersUserId(null)
        setViewFollowingUserId(null)
        setIsPostsTabActive(true)
    }, [location])

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
                                profile={isProfileView}
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
                        <Box
                            component='div'
                            paddingTop='4vh'
                            marginRight='auto'
                            marginTop='0'
                            paddingRight='20px'
                            paddingLeft='20px'
                            marginBottom='16px'
                            flexGrow='1'
                            marginLeft='auto'
                            maxWidth='1035px'
                            width='calc(100% - 40px)'
                            paddingBottom='0'
                            display='block'
                        >
                            <Box
                                component='div'
                                fontWeight='600'
                                justifyContent='center'
                                padding='0'
                                marginTop='44px'
                                border='0'
                                boxSizing='border-box'
                                display='flex'
                                alignItems='center'
                                textAlign='center'
                                color='#8E8E8E'
                                letterSpacing='1px'
                                flexDirection='row'
                                fontSize='0.75rem'
                                position='relative'
                                borderTop='1px solid #262626'
                                sx={{ verticalAlign: 'baseline' }}
                            >
                                <PostsTab
                                    active={isPostsTabActive}
                                    onClick={handleClickPostsTab} />
                                <SavedTab
                                    active={!isPostsTabActive}
                                    onClick={handleClickSavedTab} />
                            </Box>
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