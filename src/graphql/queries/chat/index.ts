import { gql } from '@apollo/client'


export const FIND_CHATS_FOR_USER = gql`
    query findChatsForUser($lastCreatedAt: Timestamp, $lastId: String, $limit: Int!) {
        findChatsForUser(lastCreatedAt: $lastCreatedAt, lastId: $lastId, limit: $limit) {
            hasNext
            data {
                chat {
                    _id
                    creator {
                        _id
                        username
                    }
                    chatMembers {
                        _id
                        firstName
                        lastName
                        username
                        photoUrl
                    }
                    selected @client
                    temporary @client
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

export const FIND_MESSAGES_BY_CHAT_ID = gql`
    query findMessagesByChatId($chatId: String!, $limit: Int!, $lastCreatedAt: Timestamp, $lastId: String) {
        findMessagesByChatId(chatId: $chatId, limit: $limit, lastCreatedAt: $lastCreatedAt, lastId: $lastId) {
            hasNext
            data {
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
`