import { FindSearchHistoryQueryType } from '../../../graphql/types/queries/searchHistory'
import { UserSearch } from '../../../graphql/types/models'


interface AddSearchHistoryItemOptions {
    queryData: FindSearchHistoryQueryType
    variables: {
        userSearch: UserSearch
    }
}

interface AddSearchHistoryItemReturnValue {
    queryResult: FindSearchHistoryQueryType
    success: boolean
}

export function addSearchHistoryItem(options: AddSearchHistoryItemOptions): AddSearchHistoryItemReturnValue {
    const id = options.variables.userSearch.searchUser?.user._id || options.variables.userSearch.hashtag?._id
    if (options.queryData.findSearchHistory.some(searchHistory => {
        const searchHistoryId = searchHistory.searchUser?.user._id || searchHistory.hashtag?._id
        return searchHistoryId === id
    })) {
        return {
            queryResult: options.queryData,
            success: false,
        }
    }
    return {
        queryResult: {
            ...options.queryData,
            findSearchHistory: [
                options.variables.userSearch,
                ...options.queryData.findSearchHistory,
            ],
        },
        success: true,
    }
}

interface RemoveSearchHistoryItemOptions {
    queryData: FindSearchHistoryQueryType
    variables: {
        id: string
    }
}

interface RemoveSearchHistoryItemReturnValue {
    queryResult: FindSearchHistoryQueryType
}

export function removeSearchHistoryItem(options: RemoveSearchHistoryItemOptions): RemoveSearchHistoryItemReturnValue {
    return {
        queryResult: {
            ...options.queryData,
            findSearchHistory: options.queryData.findSearchHistory.filter(searchHistory => {
                if (searchHistory.searchUser) {
                    if (searchHistory.searchUser.user._id === options.variables.id) {
                        return false
                    }
                } else if (searchHistory.hashtag) {
                    if (searchHistory.hashtag._id === options.variables.id) {
                        return false
                    }
                }
                return true
            }),
        },
    }
}

const mutations = {
    addSearchHistoryItem,
    removeSearchHistoryItem,
}

export default mutations