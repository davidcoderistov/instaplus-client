import { useApolloClient } from '@apollo/client'
import { useAuthUser } from '../misc'
import { FIND_USER_DETAILS } from '../../graphql/queries/user'
import { FindUserDetailsQueryType } from '../../graphql/types/queries/user'
import { FIND_FOLLOWING_FOR_USER } from '../../graphql/queries/user'
import { FindFollowingForUserQueryType } from '../../graphql/types/queries/user'
import { FIND_FOLLOWERS_FOR_USER } from '../../graphql/queries/user'
import { FindFollowersForUserQueryType } from '../../graphql/types/queries/user'
import { FollowableUser } from '../../graphql/types/models'
import findUserDetailsMutations from '../../apollo/mutations/user/findUserDetails'
import findFollowingForUserMutations from '../../apollo/mutations/user/findFollowingForUser'
import findFollowersForUserMutations from '../../apollo/mutations/user/findFollowersForUser'


export function useUnfollowUpdateUserConnections() {

    const client = useApolloClient()

    const [authUser] = useAuthUser()

    return (followableUser: FollowableUser) => {

        client.cache.updateQuery({
            query: FIND_USER_DETAILS,
            variables: { userId: authUser._id },
        }, (findUserDetails: FindUserDetailsQueryType | null) => {
            if (findUserDetails) {
                return findUserDetailsMutations.decrementFollowingCount({ queryData: findUserDetails }).queryResult
            }
        })

        client.cache.updateQuery({
            query: FIND_FOLLOWING_FOR_USER,
            variables: { userId: authUser._id },
        }, (findFollowingForUser: FindFollowingForUserQueryType | null) => {
            if (findFollowingForUser) {
                return findFollowingForUserMutations.removeFollowingUser({
                    queryData: findFollowingForUser,
                    variables: { userId: followableUser.user._id },
                }).queryResult
            }
        })

        client.cache.updateQuery({
            query: FIND_USER_DETAILS,
            variables: { userId: followableUser.user._id },
        }, (findUserDetails: FindUserDetailsQueryType | null) => {
            if (findUserDetails) {
                return findUserDetailsMutations.decrementFollowersCount({ queryData: findUserDetails }).queryResult
            }
        })

        client.cache.updateQuery({
            query: FIND_FOLLOWERS_FOR_USER,
            variables: { userId: followableUser.user._id },
        }, (findFollowersForUser: FindFollowersForUserQueryType | null) => {
            if (findFollowersForUser) {
                return findFollowersForUserMutations.removeFollowerUser({
                    queryData: findFollowersForUser,
                    variables: { userId: authUser._id },
                }).queryResult
            }
        })
    }
}