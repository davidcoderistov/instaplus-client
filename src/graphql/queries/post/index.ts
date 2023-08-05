import { gql } from '@apollo/client'


export const FIND_HASHTAGS_BY_SEARCH_QUERY = gql`
    query findHashtagsBySearchQuery($searchQuery: String!) {
        findHashtagsBySearchQuery(searchQuery: $searchQuery) {
            _id
            name
            postIds
        }
    }
`