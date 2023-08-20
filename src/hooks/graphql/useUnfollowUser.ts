import { useMutation } from '@apollo/client'
import { useUpdateFollowingLoadingStatus } from './useUpdateFollowingLoadingStatus'
import { useUnfollowUpdateUserConnections } from './useUnfollowUpdateUserConnections'
import { useSnackbar } from 'notistack'
import { UNFOLLOW_USER } from '../../graphql/mutations/user'
import { UnfollowUserMutationType } from '../../graphql/types/mutations/user'


export function useUnfollowUser() {

    const { enqueueSnackbar } = useSnackbar()

    const [unfollowUser] = useMutation<UnfollowUserMutationType>(UNFOLLOW_USER)
    const updateUnfollowUserConnections = useUnfollowUpdateUserConnections()

    const updateFollowingLoadingStatus = useUpdateFollowingLoadingStatus()

    return (userId: string) => {
        updateFollowingLoadingStatus(userId, true)
        unfollowUser({
            variables: {
                followedUserId: userId,
            },
        }).then(unfollow => {
            const followedUser = unfollow.data?.unfollowUser
            if (followedUser) {
                updateUnfollowUserConnections(followedUser)
            }
            updateFollowingLoadingStatus(userId, false)
        }).catch(() => {
            enqueueSnackbar('Could not unfollow user', { variant: 'error' })
        })
    }
}