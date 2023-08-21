import { FindUsersWhoLikedPostQueryType } from '../../../graphql/types/queries/post'
import { FollowableUser } from '../../../graphql/types/models'


interface AddLikingUserOptions {
    queryData: FindUsersWhoLikedPostQueryType
    variables: {
        followableUser: FollowableUser
    }
}

interface AddLikingUserReturnValue {
    queryResult: FindUsersWhoLikedPostQueryType
}

export function addLikingUser(options: AddLikingUserOptions): AddLikingUserReturnValue {
    const usersWhoLikedPostData = Array.from(options.queryData.findUsersWhoLikedPost.data)
    if (!usersWhoLikedPostData.some(userWhoLikedPost =>
        userWhoLikedPost.user._id === options.variables.followableUser.user._id)) {
        usersWhoLikedPostData.unshift(options.variables.followableUser)
    }
    return {
        queryResult: {
            findUsersWhoLikedPost: {
                ...options.queryData.findUsersWhoLikedPost,
                data: usersWhoLikedPostData,
            },
        },
    }
}

const mutations = {
    addLikingUser,
}

export default mutations
