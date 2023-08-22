import { gql } from '@apollo/client'


export const CREATE_POST = gql`
    mutation createPost($caption: String, $hashtags: [String!], $location: String, $photos: [Upload!]!) {
        createPost(caption: $caption, hashtags: $hashtags, location: $location, photos: $photos) {
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
        }
    }
`

export const LIKE_POST = gql`
    mutation likePost($postId: String!) {
        likePost(postId: $postId) {
            _id
        }
    }
`

export const UNLIKE_POST = gql`
    mutation unlikePost($postId: String!) {
        unlikePost(postId: $postId) {
            _id
        }
    }
`

export const SAVE_POST = gql`
    mutation savePost($postId: String!) {
        savePost(postId: $postId) {
            _id
        }
    }
`

export const UNSAVE_POST = gql`
    mutation unsavePost($postId: String!) {
        unsavePost(postId: $postId) {
            _id
        }
    }
`