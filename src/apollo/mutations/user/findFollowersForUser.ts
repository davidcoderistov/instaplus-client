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

interface RemoveFollowerUserOptions {
    queryData: FindFollowersForUserQueryType
    variables: {
        userId: string
    }
}

interface RemoveFollowerUserReturnValue {
    queryResult: FindFollowersForUserQueryType
}

export function removeFollowerUser(options: RemoveFollowerUserOptions): RemoveFollowerUserReturnValue {

    const data = Array.from(options.queryData.findFollowersForUser.data)
    const findFollowerUserId = data.findIndex(followerUser => followerUser.user._id === options.variables.userId)

    if (findFollowerUserId >= 0) {
        data.splice(findFollowerUserId, 1)
    }
    return {
        queryResult: {
            ...options.queryData,
            findFollowersForUser: {
                ...options.queryData.findFollowersForUser,
                data,
            },
        },
    }
}

const mutations = {
    addFollowerUser,
    removeFollowerUser,
}

export default mutations