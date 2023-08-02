import { gql } from '@apollo/client'


export const MARK_USER_SEARCH = gql`
    mutation markUserSearch($searchedHashtagId: String, $searchedUserId: String) {
        markUserSearch(searchedHashtagId: $searchedHashtagId, searchedUserId: $searchedUserId)
    }
`