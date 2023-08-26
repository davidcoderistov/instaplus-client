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

export const FIND_FOLLOWERS_FOR_USER = gql`
    query findFollowersForUser($cursor: Cursor, $limit: Int!, $userId: String!) {
        findFollowersForUser(cursor: $cursor, limit: $limit, userId: $userId) {
            data {
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
            nextCursor {
                _id
                createdAt
            }
        }
    }
`