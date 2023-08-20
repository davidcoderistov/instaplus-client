import { FindUsersWhoLikedPostQueryType } from '../../../graphql/types/queries/post'


interface UpdateFollowingLoadingStatusOptions {
    queryData: FindUsersWhoLikedPostQueryType
    variables: {
        userId: string
        followingLoading: boolean
    }
}

interface UpdateFollowingLoadingStatusReturnValue {
    queryResult: FindUsersWhoLikedPostQueryType
}

export function updateFollowingLoadingStatus(options: UpdateFollowingLoadingStatusOptions): UpdateFollowingLoadingStatusReturnValue {
    return {
        queryResult: {
            findUsersWhoLikedPost: {
                ...options.queryData.findUsersWhoLikedPost,
                data: options.queryData.findUsersWhoLikedPost.data.map(userWhoLikedPost => {
                    if (userWhoLikedPost.user._id === options.variables.userId) {
                        return {
                            ...userWhoLikedPost,
                            followingLoading: options.variables.followingLoading,
                        }
                    }
                    return userWhoLikedPost
                }),
            },
        },
    }
}

const mutations = {
    updateFollowingLoadingStatus,
}

export default mutations