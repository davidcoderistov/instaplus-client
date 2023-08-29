import { FindUserDetailsQueryType } from '../../../graphql/types/queries/user'


interface IncrementFollowingCountOptions {
    queryData: FindUserDetailsQueryType
}

interface IncrementFollowingCountReturnValue {
    queryResult: FindUserDetailsQueryType
}

export function incrementFollowingCount(options: IncrementFollowingCountOptions): IncrementFollowingCountReturnValue {

    return {
        queryResult: {
            ...options.queryData,
            findUserDetails: {
                ...options.queryData.findUserDetails,
                followingCount: options.queryData.findUserDetails.followingCount + 1,
            },
        },
    }
}

interface DecrementFollowingCountOptions {
    queryData: FindUserDetailsQueryType
}

interface DecrementFollowingCountReturnValue {
    queryResult: FindUserDetailsQueryType
}

export function decrementFollowingCount(options: DecrementFollowingCountOptions): DecrementFollowingCountReturnValue {

    return {
        queryResult: {
            ...options.queryData,
            findUserDetails: {
                ...options.queryData.findUserDetails,
                followingCount: options.queryData.findUserDetails.followingCount - 1,
            },
        },
    }
}

interface IncrementFollowersCountOptions {
    queryData: FindUserDetailsQueryType
}

interface IncrementFollowersCountReturnValue {
    queryResult: FindUserDetailsQueryType
}

export function incrementFollowersCount(options: IncrementFollowersCountOptions): IncrementFollowersCountReturnValue {

    return {
        queryResult: {
            ...options.queryData,
            findUserDetails: {
                ...options.queryData.findUserDetails,
                followersCount: options.queryData.findUserDetails.followersCount + 1,
            },
        },
    }
}

const mutations = {
    incrementFollowingCount,
    decrementFollowingCount,
    incrementFollowersCount,
}

export default mutations