import { gql } from '@apollo/client'


export const CREATE_POST = gql`
    mutation createPost($caption: String, $hashtags: [String!], $location: String, $photos: [Upload!]!) {
        createPost(caption: $caption, hashtags: $hashtags, location: $location, photos: $photos) {
            _id
            caption
            location
            photoUrls
            creator {
                _id
                firstName
                lastName
                username
                photoUrl
            }
        }
    }
`