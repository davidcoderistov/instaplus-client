import { FindFollowingForUserQueryType } from '../../../graphql/types/queries/user'
import { FollowableUser } from '../../../graphql/types/models'


interface AddFollowingUserOptions {
    queryData: FindFollowingForUserQueryType
    variables: {
        followingUser: FollowableUser
    }
}

interface AddFollowingUserReturnValue {
    queryResult: FindFollowingForUserQueryType
}

export function addFollowingUser(options: AddFollowingUserOptions): AddFollowingUserReturnValue {

    return {
        queryResult: {
            ...options.queryData,
            findFollowingForUser: {
                ...options.queryData.findFollowingForUser,
                data: [options.variables.followingUser, ...options.queryData.findFollowingForUser.data],
            },
        },
    }
}

interface RemoveFollowingUserOptions {
    queryData: FindFollowingForUserQueryType
    variables: {
        userId: string
    }
}

interface RemoveFollowingUserReturnValue {
    queryResult: FindFollowingForUserQueryType
}

export function removeFollowingUser(options: RemoveFollowingUserOptions): RemoveFollowingUserReturnValue {

    const data = Array.from(options.queryData.findFollowingForUser.data)
    const findFollowingUserId = data.findIndex(followingUser => followingUser.user._id === options.variables.userId)

    if (findFollowingUserId >= 0) {
        data.splice(findFollowingUserId, 1)
    }
    return {
        queryResult: {
            ...options.queryData,
            findFollowingForUser: {
                ...options.queryData.findFollowingForUser,
                data,
            },
        },
    }
}

const mutations = {
    addFollowingUser,
    removeFollowingUser,
}

export default mutations