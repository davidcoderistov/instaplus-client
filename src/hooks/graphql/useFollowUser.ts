import { useApolloClient, useMutation } from '@apollo/client'
import { useFollowUpdateUserConnections } from './useFollowUpdateUserConnections'
import { useSnackbar } from 'notistack'
import { gql } from '@apollo/client'
import { FOLLOW_USER } from '../../graphql/mutations/user'
import { FollowUserMutationType } from '../../graphql/types/mutations/user'


export function useFollowUser() {

    const client = useApolloClient()

    const { enqueueSnackbar } = useSnackbar()

    const [followUser] = useMutation<FollowUserMutationType>(FOLLOW_USER)
    const updateFollowUserConnections = useFollowUpdateUserConnections()

    const updateFollowingLoadingStatus = (userId: string, followingLoading: boolean) => {
        client.writeFragment({
            id: `FollowableUser:${userId}`,
            fragment: gql`
                fragment FollowableUser on FollowableUser {
                    followingLoading @client
                }
            `,
            data: {
                followingLoading,
            },
        })
    }

    return (userId: string) => {
        updateFollowingLoadingStatus(userId, true)
        followUser({
            variables: {
                followedUserId: userId,
            },
        }).then(follow => {
            const followedUser = follow.data?.followUser
            if (followedUser) {
                updateFollowUserConnections(followedUser)
            }
            updateFollowingLoadingStatus(userId, false)
        }).catch(() => {
            enqueueSnackbar('Could not follow user', { variant: 'error' })
        })
    }
}