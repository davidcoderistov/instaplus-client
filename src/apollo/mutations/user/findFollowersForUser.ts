import { FindFollowersForUserQueryType } from '../../../graphql/types/queries/user'
import { FollowableUser } from '../../../graphql/types/models'


interface AddFollowerUserOptions {
    queryData: FindFollowersForUserQueryType
    variables: {
        followerUser: FollowableUser
    }
}

interface AddFollowerUserReturnValue {
    queryResult: FindFollowersForUserQueryType
}

export function addFollowerUser(options: AddFollowerUserOptions): AddFollowerUserReturnValue {

    return {
        queryResult: {
            ...options.queryData,
            findFollowersForUser: {
                ...options.queryData.findFollowersForUser,
                data: [options.variables.followerUser, ...options.queryData.findFollowersForUser.data],
            },
        },
    }
}

const mutations = {
    addFollowerUser,
}

export default mutations