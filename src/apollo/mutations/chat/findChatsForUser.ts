import { FindChatsForUserQueryType } from '../../../graphql/types/queries/chat'
import { ChatWithLatestMessage, Message } from '../../../graphql/types/models'


interface UpdateSelectedStatusOptions {
    queryData: FindChatsForUserQueryType
    variables: {
        chatId: string
    }
}

interface UpdateSelectedStatusReturnValue {
    queryResult: FindChatsForUserQueryType
}

export function updateSelectedStatus(options: UpdateSelectedStatusOptions): UpdateSelectedStatusReturnValue {
    return {
        queryResult: {
            findChatsForUser: {
                ...options.queryData.findChatsForUser,
                data: options.queryData.findChatsForUser.data.map(chatForUser => {
                    return {
                        ...chatForUser,
                        chat: {
                            ...chatForUser.chat,
                            selected: chatForUser.chat._id === options.variables.chatId,
                        },
                    }
                }),
            },
        },
    }
}

interface UpdateLatestMessageOptions {
    queryData: FindChatsForUserQueryType
    variables: {
        chatId: string,
        message: Message
    }
}

interface UpdateLatestMessageReturnValue {
    queryResult: FindChatsForUserQueryType
}

export function updateLatestMessage(options: UpdateLatestMessageOptions): UpdateLatestMessageReturnValue {
    return {
        queryResult: {
            findChatsForUser: {
                ...options.queryData.findChatsForUser,
                data: options.queryData.findChatsForUser.data.map(chatForUser => {
                    if (chatForUser.chat._id === options.variables.chatId) {
                        return {
                            ...chatForUser,
                            message: options.variables.message,
                            chat: {
                                ...chatForUser.chat,
                                temporary: false,
                            },
                        }
                    }
                    return chatForUser
                }),
            },
        },
    }
}

interface DeleteChatOptions {
    queryData: FindChatsForUserQueryType
    variables: {
        chatId: string
    }
}

interface DeleteChatReturnValue {
    queryResult: FindChatsForUserQueryType
}

export function deleteChat(options: DeleteChatOptions): DeleteChatReturnValue {
    return {
        queryResult: {
            findChatsForUser: {
                ...options.queryData.findChatsForUser,
                data: options.queryData.findChatsForUser.data.filter(chatForUser => chatForUser.chat._id !== options.variables.chatId),
            },
        },
    }
}

interface AddChatOptions {
    queryData: FindChatsForUserQueryType
    variables: {
        chat: ChatWithLatestMessage
    }
}

interface AddChatReturnValue {
    queryResult: FindChatsForUserQueryType
}

export function addChat(options: AddChatOptions): AddChatReturnValue {
    return {
        queryResult: {
            findChatsForUser: {
                ...options.queryData.findChatsForUser,
                data: [options.variables.chat, ...options.queryData.findChatsForUser.data.map(chatForUser => ({
                    ...chatForUser,
                    chat: {
                        ...chatForUser.chat,
                        selected: false,
                    },
                }))],
            },
        },
    }
}

const mutations = {
    updateSelectedStatus,
    updateLatestMessage,
    deleteChat,
    addChat,
}

export default mutations