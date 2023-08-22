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
                    creator {
                        user {
                            _id
                            firstName
                            lastName
                            username
                            photoUrl
                        }
                        following
                    }
                    createdAt
                }
                liked
                saved
                commentsCount
                likesCount
                latestTwoLikeUsers {
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

export const FIND_USERS_WHO_LIKED_POST = gql`
    query findUsersWhoLikedPost($cursor: Cursor, $limit: Int!, $postId: String!) {
        findUsersWhoLikedPost(cursor: $cursor, limit: $limit, postId: $postId) {
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

export const FIND_COMMENTS_FOR_POST = gql`
    query findCommentsForPost($postId: String!, $offset: Int!, $limit: Int!) {
        findCommentsForPost(postId: $postId, offset: $offset, limit: $limit) {
            data {
                _id
                text
                creator {
                    _id
                    username
                    photoUrl
                }
                postId
                liked
                likesCount
                repliesCount
                replies @client
                showReplies @client
                repliesLoading @client
                createdAt
            }
            count
        }
    }
`