import { gql } from '@apollo/client'


export const FIND_HASHTAGS_BY_SEARCH_QUERY = gql`
    query findHashtagsBySearchQuery($searchQuery: String!) {
        findHashtagsBySearchQuery(searchQuery: $searchQuery) {
            _id
            name
            postsCount
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

export const FIND_USERS_WHO_LIKED_COMMENT = gql`
    query findUsersWhoLikedComment($commentId: String!, $cursor: Cursor, $limit: Int!) {
        findUsersWhoLikedComment(commentId: $commentId, cursor: $cursor, limit: $limit) {
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

export const FIND_COMMENT_REPLIES = gql`
    query findCommentReplies($commentId: String!, $offset: Int!, $limit: Int!) {
        findCommentReplies(commentId: $commentId, offset: $offset, limit: $limit) {
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

export const FIND_POST_DETAILS_BY_ID = gql`
    query findPostDetailsById($postId: String!) {
        findPostDetailsById(postId: $postId) {
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
    }
`

export const FIND_LATEST_POSTS_FOR_USER = gql`
    query findLatestPostsForUser($userId: String!, $limit: Int!) {
        findLatestPostsForUser(userId: $userId, limit: $limit) {
            _id
            photoUrls
        }
    }
`

export const FIND_POSTS_FOR_USER = gql`
    query findPostsForUser($userId: String!, $offset: Int!, $limit: Int!) {
        findPostsForUser(userId: $userId, offset: $offset, limit: $limit) {
            data {
                _id
                photoUrls
            }
            count
        }
    }
`

export const FIND_SAVED_POSTS_FOR_USER = gql`
    query findSavedPostsForUser($cursor: Cursor, $limit: Int!) {
        findSavedPostsForUser(cursor: $cursor, limit: $limit) {
            data {
                _id
                photoUrls
            }
            nextCursor {
                _id
                createdAt
            }
        }
    }
`

export const FIND_POSTS_FOR_HASHTAG = gql`
    query findPostsForHashtag($name: String!, $offset: Int!, $limit: Int!) {
        findPostsForHashtag(name: $name, offset: $offset, limit: $limit) {
            data {
                _id
                photoUrls
            }
            count
        }
    }
`