import { gql } from '@apollo/client'


export const NEW_MESSAGE = gql`
    subscription newMessage {
        newMessage {
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
    }
`

export const NEW_MESSAGE_REACTION = gql`
    subscription newMessageReaction {
        newMessageReaction {
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