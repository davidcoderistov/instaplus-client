import { useState, useMemo, useRef } from 'react'
import { useApolloClient, useLazyQuery } from '@apollo/client'
import { FIND_USERS_BY_SEARCH_QUERY } from '../../graphql/queries/user'
import { FindUsersBySearchQueryQueryType } from '../../graphql/types/queries/user'
import _debounce from 'lodash/debounce'
import _differenceBy from 'lodash/differenceBy'


export function useSearchedUsers(excludeUserIds?: (string | number)[]) {

    const resultSet = useRef(false)

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
                resultSet.current = true
                setSearchedUsers(getUsers(queryData.findUsersBySearchQuery, excludeUserIds))
            } else {
                resultSet.current = false
                setIsSearching(true)
                _findUsersBySearchQuery(searchQuery)
            }
        } else {
            resultSet.current = true
            setSearchedUsers([])
        }
    }

    const searchUsers = (searchQuery: string) => {
        findUsersBySearchQuery({
            variables: {
                searchQuery,
                limit: 25,
            },
        }).then(findUsersBySearchQuery => {
            if (findUsersBySearchQuery.data && findUsersBySearchQuery.data.findUsersBySearchQuery) {
                if (!resultSet.current) {
                    setSearchedUsers(getUsers(findUsersBySearchQuery.data.findUsersBySearchQuery, excludeUserIds))
                }
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