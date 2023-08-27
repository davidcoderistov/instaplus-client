import React, { useState, useEffect, useMemo } from 'react'
import { useAuthUser } from '../../hooks/misc'
import { useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FIND_USER_DETAILS } from '../../graphql/queries/user'
import { FindUserDetailsQueryType } from '../../graphql/types/queries/user'
import { FIND_POSTS_FOR_USER, FIND_SAVED_POSTS_FOR_USER } from '../../graphql/queries/post'
import {
    FindPostsForUserQueryType,
    FindSavedPostsForUserQueryType,
} from '../../graphql/types/queries/post'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import ProfileDescription from '../../lib/src/components/ProfileDescription'
import FollowersModal from '../FollowersModal'
import FollowingModal from '../FollowingModal'
import MediaGallery from '../../lib/src/components/MediaGallery'
import InfiniteScroll from 'react-infinite-scroll-component'
import _range from 'lodash/range'
import _differenceBy from 'lodash/differenceBy'


const Tab = (props: { name: string, active: boolean, solo: boolean, icon: React.ReactNode, onClick(): void }) => {

    return (
        <Box
            component='div'
            display='flex'
            alignItems='center'
            color={props.active ? '#F5F5F5' : '#A8A8A8'}
            marginRight={props.solo ? '0' : '60px'}
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

const PostsTab = (props: { active: boolean, solo: boolean, onClick(): void }) => {

    return (
        <Tab
            name='Posts'
            active={props.active}
            solo={props.solo}
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
            solo={false}
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

    const postsForUser = useQuery<FindPostsForUserQueryType>(FIND_POSTS_FOR_USER, {
        variables: {
            userId,
            offset: 0,
            limit: 6,
        },
        skip: Boolean(!userId) || !isPostsTabActive,
    })

    const savedPostsForUser = useQuery<FindSavedPostsForUserQueryType>(FIND_SAVED_POSTS_FOR_USER, {
        variables: {
            limit: 6,
        },
        skip: !isProfileView || isPostsTabActive,
    })

    const posts = useMemo(() => {
        if (findUserDetails.loading || postsForUser.loading || savedPostsForUser.loading) {
            return _range(3).map(index => ({
                id: index,
                photoUrl: null,
                multiple: false,
            }))
        }
        if (isPostsTabActive) {
            if (!postsForUser.error && postsForUser.data) {
                return postsForUser.data.findPostsForUser.data.map(post => ({
                    id: post._id,
                    photoUrl: post.photoUrls.length > 0 ? post.photoUrls[0] : null,
                    multiple: post.photoUrls.length > 1,
                }))
            }
        } else {
            if (!savedPostsForUser.error && savedPostsForUser.data) {
                return savedPostsForUser.data.findSavedPostsForUser.data.map(post => ({
                    id: post._id,
                    photoUrl: post.photoUrls.length > 0 ? post.photoUrls[0] : null,
                    multiple: post.photoUrls.length > 1,
                }))
            }
        }
        return []
    }, [isPostsTabActive, findUserDetails, postsForUser.loading, postsForUser.error, postsForUser.data, savedPostsForUser.loading, savedPostsForUser.error, savedPostsForUser.data])

    const hasMorePosts = useMemo(() => {
        if (isPostsTabActive) {
            if (!postsForUser.loading && !postsForUser.error && postsForUser.data) {
                return postsForUser.data.findPostsForUser.data.length < postsForUser.data.findPostsForUser.count
            }
        } else {
            if (!savedPostsForUser.loading && !savedPostsForUser.error && savedPostsForUser.data) {
                return Boolean(savedPostsForUser.data.findSavedPostsForUser.nextCursor)
            }
        }
        return false
    }, [isPostsTabActive, postsForUser.loading, postsForUser.error, postsForUser.data, savedPostsForUser.loading, savedPostsForUser.error, savedPostsForUser.data])

    const emptyPosts = useMemo(() => {
        if (isPostsTabActive) {
            if (!postsForUser.loading && !postsForUser.error && postsForUser.data) {
                return postsForUser.data.findPostsForUser.count < 1
            }
        } else {
            if (!savedPostsForUser.loading && !savedPostsForUser.error && savedPostsForUser.data) {
                return savedPostsForUser.data.findSavedPostsForUser.data.length < 1
            }
        }
        return false
    }, [isPostsTabActive, postsForUser.loading, postsForUser.error, postsForUser.data, savedPostsForUser.loading, savedPostsForUser.error, savedPostsForUser.data])

    const handleFetchMorePosts = () => {
        if (isPostsTabActive) {
            if (postsForUser.data) {
                postsForUser.fetchMore({
                    variables: {
                        offset: postsForUser.data.findPostsForUser.data.length,
                    },
                    updateQuery(existing: FindPostsForUserQueryType, { fetchMoreResult }: { fetchMoreResult: FindPostsForUserQueryType }) {
                        return {
                            ...existing,
                            findPostsForUser: {
                                ...existing.findPostsForUser,
                                data: [
                                    ...existing.findPostsForUser.data,
                                    ...fetchMoreResult.findPostsForUser.data,
                                ],
                            },
                        }
                    },
                }).catch(console.log)
            } else {
                if (savedPostsForUser.data && savedPostsForUser.data.findSavedPostsForUser.nextCursor) {
                    savedPostsForUser.fetchMore({
                        variables: {
                            cursor: {
                                _id: savedPostsForUser.data.findSavedPostsForUser.nextCursor._id,
                                createdAt: savedPostsForUser.data.findSavedPostsForUser.nextCursor.createdAt,
                            },
                        },
                        updateQuery(existing: FindSavedPostsForUserQueryType, { fetchMoreResult }: { fetchMoreResult: FindSavedPostsForUserQueryType }) {
                            return {
                                ...existing,
                                findSavedPostsForUser: {
                                    ...fetchMoreResult.findSavedPostsForUser,
                                    data: [
                                        ...existing.findSavedPostsForUser.data,
                                        ..._differenceBy(
                                            fetchMoreResult.findSavedPostsForUser.data,
                                            existing.findSavedPostsForUser.data,
                                            '_id',
                                        ),
                                    ],
                                },
                            }
                        },
                    }).catch(console.log)
                }
            }
        }
    }

    return (
        <Box
            id='postsContainer'
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
                {(findUserDetails.loading || findUserDetails.data) ? (
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
                            {findUserDetails.data ? (
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
                            ) : (
                                <ProfileDescription loading />
                            )}
                        </Box>
                        <Box
                            component='div'
                            paddingTop='4vh'
                            marginRight='auto'
                            paddingRight='20px'
                            paddingLeft='20px'
                            marginTop='44px'
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
                                    solo={!isProfileView}
                                    onClick={handleClickPostsTab} />
                                {isProfileView && (
                                    <SavedTab
                                        active={!isPostsTabActive}
                                        onClick={handleClickSavedTab} />
                                )}
                            </Box>
                            <InfiniteScroll
                                next={handleFetchMorePosts}
                                style={{ overflow: 'hidden' }}
                                hasMore={hasMorePosts}
                                scrollableTarget='postsContainer'
                                loader={
                                    <Box
                                        component='div'
                                        display='flex'
                                        flexDirection='row'
                                        justifyContent='center'
                                        alignItems='flex-start'
                                        paddingTop='10px'
                                        height='50px'
                                    >
                                        <CircularProgress
                                            size={30}
                                            thickness={5}
                                            sx={{
                                                color: 'grey',
                                                mt: 1,
                                            }} />
                                    </Box>
                                }
                                dataLength={posts.length}
                                scrollThreshold='95%'
                            >
                                <MediaGallery
                                    items={posts}
                                    onClick={console.log} />
                            </InfiniteScroll>
                            {emptyPosts && (
                                <Box
                                    component='div'
                                    borderRadius='0'
                                    bgcolor='transparent'
                                    flexDirection='column'
                                    boxSizing='border-box'
                                    display='flex'
                                    flexShrink='0'
                                    position='static'
                                    alignItems='stretch'
                                    alignSelf='auto'
                                    justifyContent='flex-start'
                                    marginBottom='8px'
                                    flexGrow='0'
                                    sx={{
                                        overflowY: 'visible',
                                        overflowX: 'visible',
                                    }}
                                >
                                    <Box
                                        component='span'
                                        lineHeight='30px'
                                        minWidth='0'
                                        margin='0!important'
                                        color='#F5F5F5'
                                        textAlign='center'
                                        fontWeight='700'
                                        position='relative'
                                        display='block'
                                        maxWidth='100%'
                                        fontSize='24px'
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
                                            display='grid'
                                            textAlign='center'
                                            paddingLeft='16px'
                                            paddingRight='16px'
                                            paddingBottom='16px'
                                            paddingTop='4px'
                                            justifyItems='center'
                                            sx={{ gridRowGap: '8px' }}
                                        >
                                            <Box
                                                component='div'
                                                width='48px'
                                                height='48px'
                                            >
                                                <Box component='div' paddingLeft='8px' paddingTop='12px'>
                                                    <svg
                                                        aria-label='InstaPlus'
                                                        style={{ display: 'block', position: 'relative' }}
                                                        height='64'
                                                        color='rgb(245,245,245)'
                                                        fill='rgb(245,245,245)'
                                                        role='img'
                                                        viewBox='0 0 48 48'
                                                        width='64'
                                                    >
                                                        <title>InstaPlus</title>
                                                        <path
                                                            d='M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z' />
                                                    </svg>
                                                </Box>
                                            </Box>
                                            <Box
                                                component='span'
                                                lineHeight='30px'
                                                fontSize='24px'
                                                display='inline'
                                                minWidth='0'
                                                margin='0!important'
                                                color='#F5F5F5'
                                                fontWeight='700'
                                                maxWidth='100%'
                                                sx={{
                                                    whiteSpace: 'pre-line',
                                                    wordBreak: 'break-word',
                                                    wordWrap: 'break-word',
                                                }}
                                            >
                                                No posts yet
                                            </Box>
                                            <Box
                                                component='span'
                                                lineHeight='18px'
                                                fontSize='14px'
                                                display='inline'
                                                minWidth='0'
                                                margin='0!important'
                                                color='#A8A8A8'
                                                fontWeight='400'
                                                maxWidth='100%'
                                                sx={{
                                                    whiteSpace: 'pre-line',
                                                    wordBreak: 'break-word',
                                                    wordWrap: 'break-word',
                                                }}
                                            >
                                                When {isProfileView ? authUser.username : findUserDetails.data?.findUserDetails.followableUser.user.username} shares
                                                photos, you'll see them here.
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            )}
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