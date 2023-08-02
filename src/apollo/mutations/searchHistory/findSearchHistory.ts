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
}

export function addSearchHistoryItem(options: AddSearchHistoryItemOptions): AddSearchHistoryItemReturnValue {
    const id = options.variables.userSearch.searchUser?.user._id || options.variables.userSearch.hashtag?._id
    const searchHistoryItems = Array.from(options.queryData.findSearchHistory)
    const findSearchHistoryItemIndex = searchHistoryItems.findIndex(searchHistory => {
        const searchHistoryId = searchHistory.searchUser?.user._id || searchHistory.hashtag?._id
        return searchHistoryId === id
    })

    if (findSearchHistoryItemIndex > -1) {
        searchHistoryItems.splice(findSearchHistoryItemIndex, 1)
    }
    return {
        queryResult: {
            ...options.queryData,
            findSearchHistory: [
                options.variables.userSearch,
                ...searchHistoryItems,
            ],
        },
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