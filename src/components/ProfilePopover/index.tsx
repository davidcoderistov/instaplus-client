import { useState, useEffect, useRef } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { useAuthUser, useUserDetailsNavigation, usePostViewNavigation } from '../../hooks/misc'
import { useFollowUser, useUnfollowUser } from '../../hooks/graphql'
import { FIND_USER_DETAILS } from '../../graphql/queries/user'
import { FindUserDetailsQueryType } from '../../graphql/types/queries/user'
import { FIND_LATEST_POSTS_FOR_USER } from '../../graphql/queries/post'
import { FindLatestPostsForUserQueryType } from '../../graphql/types/queries/post'
import { PopupState, bindPopover } from 'material-ui-popup-state/hooks'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import ProfileCard from '../../lib/src/components/ProfileCard'
import { UserDetails, Post, FollowableUser } from '../../graphql/types/models'


interface Props {
    popupState: PopupState
    userId: string | null
}

export default function ProfilePopover(props: Props) {

    const [authUser] = useAuthUser()

    const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
    const [userDetailsLoading, setUserDetailsLoading] = useState(false)

    const [findUserDetails] = useLazyQuery<FindUserDetailsQueryType>(FIND_USER_DETAILS)

    const [latestPosts, setLatestPosts] = useState<Pick<Post, '_id' | 'photoUrls'>[]>([])
    const [latestPostsLoading, setLatestPostsLoading] = useState(false)

    const [findLatestPosts] = useLazyQuery<FindLatestPostsForUserQueryType>(FIND_LATEST_POSTS_FOR_USER)

    const navigateToUserDetails = useUserDetailsNavigation()

    const navigateToPostView = usePostViewNavigation()

    const handleMessageUser = (userId: string | number) => {
        navigate(`/chat/${userId}`)
    }

    const followUser = useFollowUser()

    const unfollowUser = useUnfollowUser()

    const navigate = useNavigate()

    const handleEditProfile = () => {
        navigate('/accounts/edit')
    }

    const client = useApolloClient()

    const userIdRef = useRef<string | null>(null)

    useEffect(() => {
        if (props.userId) {
            userIdRef.current = props.userId
            const findUserDetailsResult: FindUserDetailsQueryType | null = client.readQuery({
                query: FIND_USER_DETAILS,
                variables: { userId: props.userId },
            })
            if (findUserDetailsResult) {
                setUserDetails(findUserDetailsResult.findUserDetails)
            } else {
                setUserDetailsLoading(true)
                findUserDetails({
                    variables: { userId: props.userId },
                }).then(({ data }) => {
                    if (data && userIdRef.current === props.userId) {
                        setUserDetails(data.findUserDetails)
                    }
                }).finally(() => setUserDetailsLoading(false))
            }

            const findLatestPostsResult: FindLatestPostsForUserQueryType | null = client.readQuery({
                query: FIND_LATEST_POSTS_FOR_USER,
                variables: { userId: props.userId, limit: 3 },
            })
            if (findLatestPostsResult) {
                setLatestPosts(findLatestPostsResult.findLatestPostsForUser)
            } else {
                setLatestPostsLoading(true)
                findLatestPosts({
                    variables: {
                        userId: props.userId,
                        limit: 3,
                    },
                }).then(({ data }) => {
                    if (data && userIdRef.current === props.userId) {
                        setLatestPosts(data.findLatestPostsForUser)
                    }
                }).finally(() => setLatestPostsLoading(false))
            }
        }
    }, [props.userId])

    useEffect(() => {

        const updateFollowingLoadingStatus = (userId: string, followingLoading: boolean) => {
            setUserDetails(userDetails => {
                if (userDetails) {
                    if (userDetails.followableUser.user._id === userId) {
                        return {
                            ...userDetails,
                            followableUser: {
                                ...userDetails.followableUser,
                                followingLoading,
                            },
                        }
                    }
                    return userDetails
                }
                return null
            })
        }

        const updateFollowingStatus = (userId: string, followableUser: FollowableUser) => {
            setUserDetails(userDetails => {
                if (userDetails) {
                    if (userDetails.followableUser.user._id === userId) {
                        return {
                            ...userDetails,
                            followableUser: {
                                ...followableUser,
                                followingLoading: false,
                            },
                        }
                    }
                    return userDetails
                }
                return null
            })
        }

        const getUserIdFromEvent = (event: Event): string => {
            const { detail: { userId } } = event as CustomEvent<{ userId: string }>
            return userId
        }

        const getFollowedUserFromEvent = (event: Event): FollowableUser => {
            const { detail: { followedUser } } = event as CustomEvent<{ followedUser: FollowableUser }>
            return followedUser
        }

        const onStart = (event: Event) => {
            updateFollowingLoadingStatus(getUserIdFromEvent(event), true)
        }

        const onSuccess = (event: Event) => {
            updateFollowingStatus(getUserIdFromEvent(event), getFollowedUserFromEvent(event))
        }

        const onError = (event: Event) => {
            updateFollowingLoadingStatus(getUserIdFromEvent(event), false)
        }

        window.addEventListener('onFollowUserStart', onStart)
        window.addEventListener('onFollowUserSuccess', onSuccess)
        window.addEventListener('onFollowUserError', onError)

        window.addEventListener('onUnfollowUserStart', onStart)
        window.addEventListener('onUnfollowUserSuccess', onSuccess)
        window.addEventListener('onUnfollowUserError', onError)

        return () => {
            window.removeEventListener('onFollowUserStart', onStart)
            window.removeEventListener('onFollowUserSuccess', onSuccess)
            window.removeEventListener('onFollowUserError', onError)

            window.removeEventListener('onUnfollowUserStart', onStart)
            window.removeEventListener('onUnfollowUserSuccess', onSuccess)
            window.removeEventListener('onUnfollowUserError', onError)
        }
    }, [])

    return (
        <HoverPopover
            {...bindPopover(props.popupState)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            sx={{
                '& .MuiPopover-paper': {
                    backgroundColor: '#000000',
                },
                zIndex: 999999,
            }}
        >
            {userDetailsLoading || latestPostsLoading ? (
                <ProfileCard loading />
            ) : userDetails ? (
                <ProfileCard
                    user={{
                        id: userDetails.followableUser.user._id,
                        username: userDetails.followableUser.user.username,
                        firstName: userDetails.followableUser.user.firstName,
                        lastName: userDetails.followableUser.user.lastName,
                        photoUrl: userDetails.followableUser.user.photoUrl,
                        following: userDetails.followableUser.following,
                        followingLoading: userDetails.followableUser.followingLoading,
                    }}
                    authUserId={authUser._id}
                    postsCount={userDetails.postsCount}
                    followersCount={userDetails.followersCount}
                    followingCount={userDetails.followingCount}
                    posts={latestPosts.map(post => ({
                        id: post._id,
                        photoUrl: post.photoUrls[0],
                        multiple: false,
                    }))}
                    onClickUser={navigateToUserDetails}
                    onMessageUser={handleMessageUser}
                    onFollowUser={followUser}
                    onUnfollowUser={unfollowUser}
                    onClickPost={navigateToPostView}
                    onEditProfile={handleEditProfile}
                />
            ) : null}
        </HoverPopover>
    )
}