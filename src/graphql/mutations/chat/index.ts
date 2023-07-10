import { gql } from '@apollo/client'


export const CREATE_CHAT = gql`
    mutation createChat($chatMemberIds: [String!]!) {
        createChat(chatMemberIds: $chatMemberIds) {
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
    }
`