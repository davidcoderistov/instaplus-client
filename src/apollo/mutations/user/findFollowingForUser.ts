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

const mutations = {
    addFollowingUser,
}

export default mutations