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

export const FIND_FOLLOWED_USERS_POSTS = gql`
    query findFollowedUsersPosts($cursor: Cursor, $limit: Int!) {
        findFollowedUsersPosts(cursor: $cursor, limit: $limit) {
            data {
                _id
                post {
                    _id
                    caption
                    location
                    photoUrls
                    createdAt
                }
                liked
                saved
                commentsCount
                likesCount
                latestLikeUser {
                    _id
                    username
                }
                latestThreeFollowedLikeUsers {
                    _id
                    photoUrl
                }
            }
            nextCursor {
                _id
                createdAt
            }
        }
    }
`