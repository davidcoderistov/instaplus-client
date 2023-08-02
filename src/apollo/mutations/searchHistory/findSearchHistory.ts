import { FindSearchHistoryQueryType } from '../../../graphql/types/queries/searchHistory'


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
    removeSearchHistoryItem,
}

export default mutations