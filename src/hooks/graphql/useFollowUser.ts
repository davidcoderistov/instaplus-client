import { useMutation } from '@apollo/client'
import { useFollowUpdateUserConnections } from './useFollowUpdateUserConnections'
import { useSnackbar } from 'notistack'
import { FOLLOW_USER } from '../../graphql/mutations/user'
import { FollowUserMutationType } from '../../graphql/types/mutations/user'


interface FollowUserCallbackProps {
    onStart: () => void
    onSuccess: () => void
    onError: () => void
}

export function useFollowUser() {

    const { enqueueSnackbar } = useSnackbar()

    const [followUser] = useMutation<FollowUserMutationType>(FOLLOW_USER)
    const updateFollowUserConnections = useFollowUpdateUserConnections()

    return (userId: string, { onStart, onSuccess, onError }: FollowUserCallbackProps) => {
        onStart()
        followUser({
            variables: {
                followedUserId: userId,
            },
        }).then(follow => {
            const followedUser = follow.data?.followUser
            if (followedUser) {
                updateFollowUserConnections(followedUser)
            }
            onSuccess()
        }).catch(() => {
            onError()
            enqueueSnackbar('Could not follow user', { variant: 'error' })
        })
    }
}