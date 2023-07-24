import { FindMessagesByChatIdQueryType } from '../../../graphql/types/queries/chat'
import { Message } from '../../../graphql/types/models'


interface AddMessageOptions {
    queryData: FindMessagesByChatIdQueryType
    variables: {
        message: Message
    }
}

interface AddMessageReturnValue {
    queryResult: FindMessagesByChatIdQueryType
}

export function addMessage(options: AddMessageOptions): AddMessageReturnValue {
    return {
        queryResult: {
            findMessagesByChatId: {
                ...options.queryData.findMessagesByChatId,
                data: [options.variables.message, ...options.queryData.findMessagesByChatId.data],
            },
        },
    }
}

interface UpdateMessageOptions {
    queryData: FindMessagesByChatIdQueryType
    variables: {
        id: string,
        message: Message
    }
}

interface UpdateMessageReturnValue {
    queryResult: FindMessagesByChatIdQueryType
}

export function updateMessage(options: UpdateMessageOptions): UpdateMessageReturnValue {
    return {
        queryResult: {
            findMessagesByChatId: {
                ...options.queryData.findMessagesByChatId,
                data: options.queryData.findMessagesByChatId.data.map(message => {
                    if (message._id === options.variables.id) {
                        return options.variables.message
                    }
                    return message
                }),
            },
        },
    }
}

const mutations = {
    addMessage,
    updateMessage,
}

export default mutations