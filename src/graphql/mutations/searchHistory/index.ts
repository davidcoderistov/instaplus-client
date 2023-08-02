import { gql } from '@apollo/client'


export const MARK_USER_SEARCH = gql`
    mutation markUserSearch($searchedHashtagId: String, $searchedUserId: String) {
        markUserSearch(searchedHashtagId: $searchedHashtagId, searchedUserId: $searchedUserId)
    }
`

export const UNMARK_USER_SEARCH = gql`
    mutation unmarkUserSearch($searchedHashtagId: String, $searchedUserId: String) {
        unmarkUserSearch(searchedHashtagId: $searchedHashtagId, searchedUserId: $searchedUserId)
    }
`