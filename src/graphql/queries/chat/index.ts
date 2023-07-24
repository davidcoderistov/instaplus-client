import { gql } from '@apollo/client'


export const FIND_CHATS_FOR_USER = gql`
    query findChatsForUser($cursor: Cursor, $limit: Int!) {
        findChatsForUser(cursor: $cursor, limit: $limit) {
            nextCursor {
                _id
                createdAt
            }
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
                    createdAt
                }
            }
        }
    }
`

export const FIND_MESSAGES_BY_CHAT_ID = gql`
    query findMessagesByChatId($chatId: String!, $limit: Int!, $cursor: Cursor) {
        findMessagesByChatId(chatId: $chatId, limit: $limit, cursor: $cursor) {
            nextCursor {
                _id
                createdAt
            }
            data {
                _id
                creator {
                    _id
                    username
                    photoUrl
                }
                text
                photoUrl
                photoOrientation
                reply {
                    _id
                    creator {
                        _id
                        username
                        photoUrl
                    }
                    text
                    photoUrl
                    photoOrientation
                }
                reactions {
                    _id
                    reaction
                    creator {
                        _id
                        firstName
                        lastName
                        username
                        photoUrl
                    }
                }
                createdAt
            }
        }
    }
`