import { FindUnreadMessagesCountForUserQueryType } from '../../../graphql/types/queries/chat'


interface IncrementUnreadMessagesCountOptions {
    queryData: FindUnreadMessagesCountForUserQueryType
}

interface IncrementUnreadMessagesCountReturnValue {
    queryResult: FindUnreadMessagesCountForUserQueryType
}

export function incrementUnreadMessagesCount(options: IncrementUnreadMessagesCountOptions): IncrementUnreadMessagesCountReturnValue {
    return {
        queryResult: {
            findUnreadMessagesCountForUser: {
                ...options.queryData.findUnreadMessagesCountForUser,
                count: options.queryData.findUnreadMessagesCountForUser.count + 1,
            },
        },
    }
}

interface DecrementUnreadMessagesCountOptions {
    queryData: FindUnreadMessagesCountForUserQueryType
}

interface DecrementUnreadMessagesCountReturnValue {
    queryResult: FindUnreadMessagesCountForUserQueryType
}

export function decrementUnreadMessagesCount(options: DecrementUnreadMessagesCountOptions): DecrementUnreadMessagesCountReturnValue {
    return {
        queryResult: {
            findUnreadMessagesCountForUser: {
                ...options.queryData.findUnreadMessagesCountForUser,
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