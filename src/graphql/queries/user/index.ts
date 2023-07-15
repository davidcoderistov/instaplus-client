import { gql } from '@apollo/client'


export const FIND_USERS_BY_SEARCH_QUERY = gql`
    query findUsersBySearchQuery($searchQuery: String!, $limit: Int!) {
        findUsersBySearchQuery(searchQuery: $searchQuery, limit: $limit) {
            _id
            firstName
            lastName
            username
            photoUrl
        }
    }
`