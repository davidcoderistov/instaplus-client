import { useState, useMemo, useRef } from 'react'
import { useApolloClient, useLazyQuery, DocumentNode } from '@apollo/client'
import _debounce from 'lodash/debounce'


export function useSearchResults<Q, T>(query: DocumentNode, readQueryResults: (queryData: Q) => T[]) {

    const client = useApolloClient()

    const resultSet = useRef(false)

    const [searchResults, setSearchResults] = useState<T[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const [findResults] = useLazyQuery<Q>(query)

    const _findHashtagsBySearchQuery = useMemo(() => _debounce((searchQuery: string) => {
        _searchResults(searchQuery)
    }, 500, { trailing: true }), [])

    const onSearch = (searchQuery: string) => {
        if (searchQuery.length > 0) {
            const queryData = client.readQuery<Q>({
                query,
                variables: {
                    searchQuery,
                },
            })
            if (queryData) {
                resultSet.current = true
                setSearchResults(readQueryResults(queryData))
                setIsSearching(false)
            } else {
                resultSet.current = false
                setIsSearching(true)
                _findHashtagsBySearchQuery(searchQuery)
            }
        } else {
            resultSet.current = true
            setSearchResults([])
        }
    }

    const _searchResults = (searchQuery: string) => {
        findResults({
            variables: {
                searchQuery,
            },
        }).then(findUserSearchesBySearchQuery => {
            if (findUserSearchesBySearchQuery.data) {
                if (!resultSet.current) {
                    setSearchResults(readQueryResults(findUserSearchesBySearchQuery.data))
                }
            } else {
                setSearchResults([])
            }
        }).finally(() => setIsSearching(false))
    }

    return [onSearch, { searchResults, isSearching }] as const
}