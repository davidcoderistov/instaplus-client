import { useMemo, useCallback } from 'react'
import { useUserDetailsNavigation, useHashtagNavigation } from '../../hooks/misc'
import { useSnackbar } from 'notistack'
import { useQuery, useMutation } from '@apollo/client'
import { useSearchResults } from '../../hooks/misc'
import { FIND_SEARCH_HISTORY, FIND_USER_SEARCHES_BY_SEARCH_QUERY } from '../../graphql/queries/searchHistory'
import {
    FindSearchHistoryQueryType,
    FindUserSearchesBySearchQueryQueryType,
} from '../../graphql/types/queries/searchHistory'
import { MARK_USER_SEARCH, UNMARK_USER_SEARCH, CLEAR_SEARCH_HISTORY } from '../../graphql/mutations/searchHistory'
import { UserSearch, Hashtag } from '../../graphql/types/models'
import findSearchHistoryMutations from '../../apollo/mutations/searchHistory/findSearchHistory'
import InstaSearchDrawer from '../../lib/src/components/SearchDrawer'


export default function SearchDrawer(props: { open: boolean, onClose(): void }) {

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

    const navigateToUserDetails = useUserDetailsNavigation()

    const navigateToHashtag = useHashtagNavigation()

    const navigateAndCloseDrawer = (userSearch: UserSearch) => {
        if (userSearch.searchUser) {
            navigateToUserDetails(userSearch.searchUser.user._id)
            props.onClose()
        } else if (userSearch.hashtag) {
            navigateToHashtag(userSearch.hashtag.name)
            props.onClose()
        }
    }

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
        navigateAndCloseDrawer(userSearch)
    }, [])

    const onClickSearchHistoryItem = useCallback((userSearch: UserSearch) => {
        navigateAndCloseDrawer(userSearch)
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

    const [onSearch, {
        searchResults: searchedItems,
        isSearching,
    }] = useSearchResults<FindUserSearchesBySearchQueryQueryType, UserSearch>(
        FIND_USER_SEARCHES_BY_SEARCH_QUERY,
        queryData => queryData.findUserSearchesBySearchQuery,
    )

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
            onRemoveItem={onRemoveItem}
            onClickSearchHistoryItem={onClickSearchHistoryItem} />
    )
}