import { useMutation } from '@apollo/client'
import { useUpdateFollowingLoadingStatus } from './useUpdateFollowingLoadingStatus'
import { useFollowUpdateUserConnections } from './useFollowUpdateUserConnections'
import { useSnackbar } from 'notistack'
import { FOLLOW_USER } from '../../graphql/mutations/user'
import { FollowUserMutationType } from '../../graphql/types/mutations/user'


export function useFollowUser() {

    const { enqueueSnackbar } = useSnackbar()

    const [followUser] = useMutation<FollowUserMutationType>(FOLLOW_USER)
    const updateFollowUserConnections = useFollowUpdateUserConnections()

    const updateFollowingLoadingStatus = useUpdateFollowingLoadingStatus()

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