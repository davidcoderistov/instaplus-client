import { FindUnreadMessagesCountForUserQueryType } from '../../../graphql/types/queries/chat'


interface IncrementUnreadMessagesCountOptions {
    queryData: FindUnreadMessagesCountForUserQueryType
    chatId: string
}

interface IncrementUnreadMessagesCountReturnValue {
    queryResult: FindUnreadMessagesCountForUserQueryType
}

export function incrementUnreadMessagesCount(options: IncrementUnreadMessagesCountOptions): IncrementUnreadMessagesCountReturnValue {
    if (options.queryData.findUnreadMessagesCountForUser.chatsIds.some(id => id === options.chatId)) {
        return {
            queryResult: {
                findUnreadMessagesCountForUser: options.queryData.findUnreadMessagesCountForUser,
            },
        }
    }
    return {
        queryResult: {
            findUnreadMessagesCountForUser: {
                ...options.queryData.findUnreadMessagesCountForUser,
                chatsIds: [...options.queryData.findUnreadMessagesCountForUser.chatsIds, options.chatId],
                count: options.queryData.findUnreadMessagesCountForUser.count + 1,
            },
        },
    }
}

interface DecrementUnreadMessagesCountOptions {
    queryData: FindUnreadMessagesCountForUserQueryType
    chatId: string
}

interface DecrementUnreadMessagesCountReturnValue {
    queryResult: FindUnreadMessagesCountForUserQueryType
}

export function decrementUnreadMessagesCount(options: DecrementUnreadMessagesCountOptions): DecrementUnreadMessagesCountReturnValue {
    if (!options.queryData.findUnreadMessagesCountForUser.chatsIds.some(id => id === options.chatId)) {
        return {
            queryResult: {
                findUnreadMessagesCountForUser: options.queryData.findUnreadMessagesCountForUser,
            },
        }
    }
    return {
        queryResult: {
            findUnreadMessagesCountForUser: {
                ...options.queryData.findUnreadMessagesCountForUser,
                chatsIds: options.queryData.findUnreadMessagesCountForUser.chatsIds.filter(id => id !== options.chatId),
                count: options.queryData.findUnreadMessagesCountForUser.count - 1,
            },
        },
    }
}

const mutations = {
    incrementUnreadMessagesCount,
    decrementUnreadMessagesCount,
}

export default mutations