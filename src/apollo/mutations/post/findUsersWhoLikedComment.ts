import { FindUsersWhoLikedCommentQueryType } from '../../../graphql/types/queries/post'
import { FollowableUser } from '../../../graphql/types/models'


interface AddLikingUserOptions {
    queryData: FindUsersWhoLikedCommentQueryType
    variables: {
        followableUser: FollowableUser
    }
}

interface AddLikingUserReturnValue {
    queryResult: FindUsersWhoLikedCommentQueryType
}

export function addLikingUser(options: AddLikingUserOptions): AddLikingUserReturnValue {
    const usersWhoLikedCommentData = Array.from(options.queryData.findUsersWhoLikedComment.data)
    if (!usersWhoLikedCommentData.some(userWhoLikedComment =>
        userWhoLikedComment.user._id === options.variables.followableUser.user._id)) {
        usersWhoLikedCommentData.unshift(options.variables.followableUser)
    }
    return {
        queryResult: {
            findUsersWhoLikedComment: {
                ...options.queryData.findUsersWhoLikedComment,
                data: usersWhoLikedCommentData,
            },
        },
    }
}

interface RemoveLikingUserOptions {
    queryData: FindUsersWhoLikedCommentQueryType
    variables: {
        userId: string
    }
}

interface RemoveLikingUserReturnValue {
    queryResult: FindUsersWhoLikedCommentQueryType
}

export function removeLikingUser(options: RemoveLikingUserOptions): RemoveLikingUserReturnValue {
    return {
        queryResult: {
            findUsersWhoLikedComment: {
                ...options.queryData.findUsersWhoLikedComment,
                data: options.queryData.findUsersWhoLikedComment.data.filter(userWhoLikedComment =>
                    userWhoLikedComment.user._id !== options.variables.userId),
            },
        },
    }
}

const mutations = {
    addLikingUser,
    removeLikingUser,
}

export default mutations
