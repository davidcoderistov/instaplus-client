import { FindChatsForUserQueryType } from '../../../graphql/types/queries/chat'
import { ChatWithLatestMessage } from '../../../graphql/types/models'


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
    const data = options.queryData.findChatsForUser.data.filter(chatForUser => chatForUser.chat._id !== options.variables.chatId)
    const count = options.queryData.findChatsForUser.count
    return {
        queryResult: {
            findChatsForUser: {
                ...options.queryData.findChatsForUser,
                data,
                count: data.length < options.queryData.findChatsForUser.data.length ? count - 1 : count,
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
    const count = options.queryData.findChatsForUser.count
    return {
        queryResult: {
            findChatsForUser: {
                ...options.queryData.findChatsForUser,
                data: [options.variables.chat, ...options.queryData.findChatsForUser.data],
                count: options.variables.chat.chat.temporary ? count : count + 1,
            },
        },
    }
}

const mutations = {
    updateSelectedStatus,
    deleteChat,
    addChat,
}

export default mutations