import { gql } from '@apollo/client'


export const CREATE_CHAT = gql`
    mutation createChat($chatMemberIds: [String!]!) {
        createChat(chatMemberIds: $chatMemberIds) {
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
                seenByUserIds
                createdAt
            }
        }
    }
`

export const ADD_CHAT_MEMBERS = gql`
    mutation addChatMembers($chatId: String!, $chatMemberIds: [String!]!) {
        addChatMembers(chatId: $chatId, chatMemberIds: $chatMemberIds) {
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

export const SEND_MESSAGE = gql`
    mutation sendMessage($chatId: String!, $photo: Upload, $replyId: String, $text: String) {
        sendMessage(chatId: $chatId, photo: $photo, replyId: $replyId, text: $text) {
            _id
            creator {
                _id
                username
                photoUrl
            }
            text
            photoUrl
            photoOrientation
            previewPhotoUrl
            seenByUserIds
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
                previewPhotoUrl
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
`

export const REACT_TO_MESSAGE = gql`
    mutation reactToMessage($messageId: String!, $reaction: String!) {
        reactToMessage(messageId: $messageId, reaction: $reaction) {
            _id
        }
    }
`

export const MARK_MESSAGE_AS_READ = gql`
    mutation markMessageAsRead($messageId: String!) {
        markMessageAsRead(messageId: $messageId) {
            _id
            creator {
                _id
                username
                photoUrl
            }
            text
            photoUrl
            photoOrientation
            previewPhotoUrl
            seenByUserIds
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
                previewPhotoUrl
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
`