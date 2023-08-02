import { gql } from '@apollo/client'


export const FIND_USER_SEARCHES_BY_SEARCH_QUERY = gql`
    query findUserSearchesBySearchQuery($searchQuery: String!) {
        findUserSearchesBySearchQuery(searchQuery: $searchQuery) {
            searchUser {
                user {
                    _id
                    firstName
                    lastName
                    username
                    photoUrl
                }
                latestFollower {
                    _id
                    username
                }
                followersCount
            }
            hashtag {
                _id
                name
                postIds
            }
        }
    }
`