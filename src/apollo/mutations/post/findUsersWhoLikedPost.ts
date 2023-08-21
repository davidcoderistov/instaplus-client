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

interface RemoveLikingUserOptions {
    queryData: FindUsersWhoLikedPostQueryType
    variables: {
        userId: string
    }
}

interface RemoveLikingUserReturnValue {
    queryResult: FindUsersWhoLikedPostQueryType
}

export function removeLikingUser(options: RemoveLikingUserOptions): RemoveLikingUserReturnValue {
    return {
        queryResult: {
            findUsersWhoLikedPost: {
                ...options.queryData.findUsersWhoLikedPost,
                data: options.queryData.findUsersWhoLikedPost.data.filter(userWhoLikedPost =>
                    userWhoLikedPost.user._id !== options.variables.userId),
            },
        },
    }
}

const mutations = {
    addLikingUser,
    removeLikingUser,
}

export default mutations
