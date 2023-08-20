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

interface UpdateFollowingStatusOptions {
    queryData: FindUsersWhoLikedPostQueryType
    variables: {
        userId: string
        following: boolean
    }
}

interface UpdateFollowingStatusReturnValue {
    queryResult: FindUsersWhoLikedPostQueryType
}

export function updateFollowingStatus(options: UpdateFollowingStatusOptions): UpdateFollowingStatusReturnValue {
    return {
        queryResult: {
            findUsersWhoLikedPost: {
                ...options.queryData.findUsersWhoLikedPost,
                data: options.queryData.findUsersWhoLikedPost.data.map(userWhoLikedPost => {
                    if (userWhoLikedPost.user._id === options.variables.userId) {
                        return {
                            ...userWhoLikedPost,
                            following: options.variables.following,
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
    updateFollowingStatus,
}

export default mutations