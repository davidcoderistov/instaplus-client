import { useState, useMemo } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import { FIND_USERS_BY_SEARCH_QUERY } from '../../graphql/queries/user'
import { FindUsersBySearchQueryQueryType } from '../../graphql/types/queries/user'
import _debounce from 'lodash/debounce'
import _differenceBy from 'lodash/differenceBy'


export function useSearchedUsers(excludeUserIds?: (string | number)[]) {

    const [isSearching, setIsSearching] = useState(false)
    const [searchedUsers, setSearchedUsers] = useState<FindUsersBySearchQueryQueryType['findUsersBySearchQuery']>([])

    const [findUsersBySearchQuery] = useLazyQuery<FindUsersBySearchQueryQueryType>(FIND_USERS_BY_SEARCH_QUERY)

    const _findUsersBySearchQuery = useMemo(() => _debounce((searchQuery: string) => {
        searchUsers(searchQuery)
    }, 500, { leading: true }), [])

    const client = useApolloClient()

    const onSearch = (searchQuery: string) => {
        if (searchQuery.length > 0) {
            const queryData = client.readQuery<FindUsersBySearchQueryQueryType>({
                query: FIND_USERS_BY_SEARCH_QUERY,
                variables: {
                    searchQuery,
                    limit: 25,
                },
            })
            if (queryData) {
                setSearchedUsers(getUsers(queryData.findUsersBySearchQuery, excludeUserIds))
            } else {
                setIsSearching(true)
                _findUsersBySearchQuery(searchQuery)
            }
        } else {
            searchUsers('', true)
        }
    }

    const searchUsers = (searchQuery: string, cacheOnly?: boolean) => {
        findUsersBySearchQuery({
            variables: {
                searchQuery,
                limit: 25,
            },
            ...cacheOnly && { fetchPolicy: 'cache-only' },
        }).then(findUsersBySearchQuery => {
            if (findUsersBySearchQuery.data && findUsersBySearchQuery.data.findUsersBySearchQuery) {
                setSearchedUsers(getUsers(findUsersBySearchQuery.data.findUsersBySearchQuery, excludeUserIds))
            } else {
                setSearchedUsers([])
            }
        }).finally(() => setIsSearching(false))
    }

    const getUsers = (users: FindUsersBySearchQueryQueryType['findUsersBySearchQuery'], excludeUserIds?: (string | number)[]) => {
        return excludeUserIds && excludeUserIds.length > 0 ?
            _differenceBy(users, excludeUserIds.map(userId => ({ _id: userId })), '_id') :
            users
    }

    return [{ searchedUsers, isSearching }, onSearch] as const
}