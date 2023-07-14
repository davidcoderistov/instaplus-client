import { FindChatsForUserQueryType } from '../../../graphql/types/queries/chat'


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
    return {
        queryResult: {
            findChatsForUser: {
                ...options.queryData.findChatsForUser,
                data,
                count: data.length < options.queryData.findChatsForUser.data.length ?
                    options.queryData.findChatsForUser.count - 1 :
                    options.queryData.findChatsForUser.count,
            },
        },
    }
}

const mutations = {
    updateSelectedStatus,
    deleteChat,
}

export default mutations