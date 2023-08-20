import { useApolloClient } from '@apollo/client'
import { gql } from '@apollo/client'


export function useUpdateFollowingLoadingStatus() {

    const client = useApolloClient()

    return (userId: string, followingLoading: boolean) => {
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
}