import { useQuery } from '@apollo/client'
import { useUserDetailsNavigation, usePostViewNavigation } from '../../hooks/misc'
import { useFollowUser, useUnfollowUser } from '../../hooks/graphql'
import { FIND_USER_DETAILS } from '../../graphql/queries/user'
import { FindUserDetailsQueryType } from '../../graphql/types/queries/user'
import { FIND_LATEST_POSTS_FOR_USER } from '../../graphql/queries/post'
import { FindLatestPostsForUserQueryType } from '../../graphql/types/queries/post'
import { PopupState, bindPopover } from 'material-ui-popup-state/hooks'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import ProfileCard from '../../lib/src/components/ProfileCard'


interface Props {
    popupState: PopupState
    userId: string | null
}

export default function ProfilePopover(props: Props) {

    const userDetails = useQuery<FindUserDetailsQueryType>(FIND_USER_DETAILS, {
        variables: { userId: props.userId },
        skip: Boolean(!props.userId),
    })

    const latestPosts = useQuery<FindLatestPostsForUserQueryType>(FIND_LATEST_POSTS_FOR_USER, {
        variables: {
            userId: props.userId,
            limit: 3,
        },
        skip: Boolean(!props.userId),
    })

    const navigateToUserDetails = useUserDetailsNavigation()

    const navigateToPostView = usePostViewNavigation()

    const followUser = useFollowUser()

    const unfollowUser = useUnfollowUser()

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
            {userDetails.loading || latestPosts.loading ? (
                <ProfileCard loading />
            ) : !userDetails.error && userDetails.data && !latestPosts.error && latestPosts.data ? (
                <ProfileCard
                    user={{
                        id: userDetails.data.findUserDetails.followableUser.user._id,
                        username: userDetails.data.findUserDetails.followableUser.user.username,
                        firstName: userDetails.data.findUserDetails.followableUser.user.firstName,
                        lastName: userDetails.data.findUserDetails.followableUser.user.lastName,
                        photoUrl: userDetails.data.findUserDetails.followableUser.user.photoUrl,
                        following: userDetails.data.findUserDetails.followableUser.following,
                        followingLoading: userDetails.data.findUserDetails.followableUser.followingLoading,
                    }}
                    postsCount={userDetails.data.findUserDetails.postsCount}
                    followersCount={userDetails.data.findUserDetails.followersCount}
                    followingCount={userDetails.data.findUserDetails.followingCount}
                    posts={latestPosts.data.findLatestPostsForUser.map(post => ({
                        id: post._id,
                        photoUrl: post.photoUrls[0],
                        multiple: false,
                    }))}
                    onClickUser={navigateToUserDetails}
                    onMessageUser={console.log}
                    onFollowUser={followUser}
                    onUnfollowUser={unfollowUser}
                    onClickPost={navigateToPostView}
                />
            ) : null}
        </HoverPopover>
    )
}