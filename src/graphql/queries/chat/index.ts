import { gql } from '@apollo/client'


export const FIND_CHATS_FOR_USER = gql`
    query findChatsForUser($offset: Int!, $limit: Int!) {
        findChatsForUser(offset: $offset, limit: $limit) {
            count
            data {
                chat {
                    _id
                    creator {
                        _id
                    }
                    chatMembers {
                        _id
                        firstName
                        lastName
                        username
                        photoUrl
                    }
                }
                message {
                    _id
                    creator {
                        _id
                        username
                        photoUrl
                    }
                    text
                    photoUrl
                    videoUrl
                    createdAt
                }
            }
        }
    }
`