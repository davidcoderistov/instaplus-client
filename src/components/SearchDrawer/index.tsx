import { useState, useMemo, useCallback, useRef } from 'react'
import { useSnackbar } from 'notistack'
import { useQuery, useLazyQuery, useMutation, useApolloClient } from '@apollo/client'
import { FIND_SEARCH_HISTORY, FIND_USER_SEARCHES_BY_SEARCH_QUERY } from '../../graphql/queries/searchHistory'
import {
    FindSearchHistoryQueryType,
    FindUserSearchesBySearchQueryQueryType,
} from '../../graphql/types/queries/searchHistory'
import { MARK_USER_SEARCH, UNMARK_USER_SEARCH, CLEAR_SEARCH_HISTORY } from '../../graphql/mutations/searchHistory'
import { UserSearch, Hashtag } from '../../graphql/types/models'
import findSearchHistoryMutations from '../../apollo/mutations/searchHistory/findSearchHistory'
import InstaSearchDrawer from '../../lib/src/components/SearchDrawer'
import _debounce from 'lodash/debounce'


export default function SearchDrawer(props: { open: boolean }) {

    const client = useApolloClient()

    const { enqueueSnackbar } = useSnackbar()

    const searchHistory = useQuery<FindSearchHistoryQueryType>(FIND_SEARCH_HISTORY, { skip: !props.open })

    const searchHistoryItems: UserSearch[] = useMemo(() => {
        if (!searchHistory.loading && !searchHistory.error && searchHistory.data) {
            return searchHistory.data.findSearchHistory
        }
        return []
    }, [searchHistory.loading, searchHistory.error, searchHistory.data])

    const [markUserSearch] = useMutation(MARK_USER_SEARCH)
    const [unmarkUserSearch] = useMutation(UNMARK_USER_SEARCH)
    const [clearSearchHistory, { loading: isClearingSearchHistory }] = useMutation(CLEAR_SEARCH_HISTORY)

    const onClearSearchHistory = useCallback(() => {
        clearSearchHistory().then(() => searchHistory.updateQuery(() => ({
            findSearchHistory: [],
        }))).catch(() => {
            enqueueSnackbar('Search history cannot be cleared at this moment. Please try again later', { variant: 'error' })
        })
    }, [])

    const onClickItem = useCallback((userSearch: UserSearch) => {
        searchHistory.updateQuery(findSearchHistory => findSearchHistoryMutations.addSearchHistoryItem({
            queryData: findSearchHistory,
            variables: {
                userSearch,
            },
        }).queryResult)
        markUserSearch({
            variables: {
                searchedUserId: userSearch.searchUser ? userSearch.searchUser.user._id : null,
                searchedHashtagId: userSearch.hashtag ? userSearch.hashtag._id : null,
            },
        })
    }, [])

    const onRemoveItem = useCallback((userSearch: UserSearch) => {
        searchHistory.updateQuery(findSearchHistory => findSearchHistoryMutations.removeSearchHistoryItem({
            queryData: findSearchHistory,
            variables: {
                id: userSearch.searchUser ? userSearch.searchUser.user._id : (userSearch.hashtag as Hashtag)._id,
            },
        }).queryResult)
        unmarkUserSearch({
            variables: {
                searchedUserId: userSearch.searchUser ? userSearch.searchUser.user._id : null,
                searchedHashtagId: userSearch.hashtag ? userSearch.hashtag._id : null,
            },
        })
    }, [])

    const resultSet = useRef(false)

    const [isSearching, setIsSearching] = useState(false)
    const [searchedItems, setSearchedItems] = useState<UserSearch[]>([])

    const [findUserSearchesBySearchQuery] = useLazyQuery<FindUserSearchesBySearchQueryQueryType>(FIND_USER_SEARCHES_BY_SEARCH_QUERY)

    const _findUsersBySearchQuery = useMemo(() => _debounce((searchQuery: string) => {
        searchUsers(searchQuery)
    }, 500, { trailing: true }), [])

    const onSearch = (searchQuery: string) => {
        if (searchQuery.length > 0) {
            const queryData = client.readQuery<FindUserSearchesBySearchQueryQueryType>({
                query: FIND_USER_SEARCHES_BY_SEARCH_QUERY,
                variables: {
                    searchQuery,
                },
            })
            if (queryData) {
                resultSet.current = true
                setSearchedItems(queryData.findUserSearchesBySearchQuery)
                setIsSearching(false)
            } else {
                resultSet.current = false
                setIsSearching(true)
                _findUsersBySearchQuery(searchQuery)
            }
        } else {
            resultSet.current = true
            setSearchedItems([])
        }
    }

    const searchUsers = (searchQuery: string) => {
        findUserSearchesBySearchQuery({
            variables: {
                searchQuery,
            },
        }).then(findUserSearchesBySearchQuery => {
            if (findUserSearchesBySearchQuery.data && findUserSearchesBySearchQuery.data.findUserSearchesBySearchQuery) {
                if (!resultSet.current) {
                    setSearchedItems(findUserSearchesBySearchQuery.data.findUserSearchesBySearchQuery)
                }
            } else {
                setSearchedItems([])
            }
        }).finally(() => setIsSearching(false))
    }

    return (
        <InstaSearchDrawer
            open={props.open}
            searchHistoryItems={searchHistoryItems}
            isSearchHistoryLoading={searchHistory.loading}
            isClearingSearchHistory={isClearingSearchHistory}
            searchedItems={searchedItems}
            isSearching={isSearching}
            onSearch={onSearch}
            onClearSearchHistory={onClearSearchHistory}
            onClickItem={onClickItem}
            onRemoveItem={onRemoveItem} />
    )
}