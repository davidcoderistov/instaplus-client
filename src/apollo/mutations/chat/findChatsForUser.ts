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

const mutations = {
    updateSelectedStatus,
}

export default mutations