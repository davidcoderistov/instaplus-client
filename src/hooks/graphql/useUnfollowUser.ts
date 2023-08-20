import { useMutation } from '@apollo/client'
import { useUnfollowUpdateUserConnections } from './useUnfollowUpdateUserConnections'
import { useSnackbar } from 'notistack'
import { UNFOLLOW_USER } from '../../graphql/mutations/user'
import { UnfollowUserMutationType } from '../../graphql/types/mutations/user'


interface UnfollowUserCallbackProps {
    onStart: () => void
    onSuccess: () => void
    onError: () => void
}

export function useUnfollowUser() {

    const { enqueueSnackbar } = useSnackbar()

    const [unfollowUser] = useMutation<UnfollowUserMutationType>(UNFOLLOW_USER)
    const updateUnfollowUserConnections = useUnfollowUpdateUserConnections()

    return (userId: string, { onStart, onSuccess, onError }: UnfollowUserCallbackProps) => {
        onStart()
        unfollowUser({
            variables: {
                followedUserId: userId,
            },
        }).then(unfollow => {
            const followedUser = unfollow.data?.unfollowUser
            if (followedUser) {
                updateUnfollowUserConnections(followedUser)
            }
            onSuccess()
        }).catch(() => {
            onError()
            enqueueSnackbar('Could not unfollow user', { variant: 'error' })
        })
    }
}