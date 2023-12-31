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
    const data = Array.from(options.queryData.findChatsForUser.data)
    const findChatIndex = options.queryData.findChatsForUser.data.findIndex(chatForUser => chatForUser.chat._id === options.variables.chatId)
    if (findChatIndex > -1) {
        const chatForUser = data[findChatIndex]
        data.splice(findChatIndex, 1)
        data.unshift({
            ...chatForUser,
            message: options.variables.message,
            chat: {
                ...chatForUser.chat,
                temporary: false,
            },
        })
    }
    return {
        queryResult: {
            findChatsForUser: {
                ...options.queryData.findChatsForUser,
                data,
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

interface DeselectAllChatsOptions {
    queryData: FindChatsForUserQueryType
}

interface DeselectAllChatsReturnValue {
    queryResult: FindChatsForUserQueryType
}

export function deselectAllChats(options: DeselectAllChatsOptions): DeselectAllChatsReturnValue {
    return {
        queryResult: {
            findChatsForUser: {
                ...options.queryData.findChatsForUser,
                data: options.queryData.findChatsForUser.data.map(chatForUser => ({
                    ...chatForUser,
                    chat: {
                        ...chatForUser.chat,
                        selected: false,
                    },
                })),
            },
        },
    }
}

const mutations = {
    updateSelectedStatus,
    updateLatestMessage,
    deleteChat,
    addChat,
    deselectAllChats,
}

export default mutations