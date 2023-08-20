import { gql } from '@apollo/client'


export const FOLLOW_USER = gql`
    mutation followUser($followedUserId: String!) {
        followUser(followedUserId: $followedUserId) {
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
`

export const UNFOLLOW_USER = gql`
    mutation unfollowUser($followedUserId: String!) {
        unfollowUser(followedUserId: $followedUserId) {
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
`