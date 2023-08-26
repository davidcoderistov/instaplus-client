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

export const FIND_USER_DETAILS = gql`
    query findUserDetails($userId: String!) {
        findUserDetails(userId: $userId) {
            followableUser {
                user {
                    _id
                    firstName
                    lastName
                    username
                    photoUrl
                }
                following
                followingLoading @client
            }
            postsCount
            followingCount
            followersCount
            mutualFollowersCount
            latestTwoMutualFollowersUsernames
        }
    }
`