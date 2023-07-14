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

export const DELETE_CHAT = gql`
    mutation deleteChat($chatId: String!) {
        deleteChat(chatId: $chatId) {
            _id
        }
    }
`

export const LEAVE_CHAT = gql`
    mutation deleteChat($chatId: String!) {
        leaveChat(chatId: $chatId) {
            _id
        }
    }
`