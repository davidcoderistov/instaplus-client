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

const mutations = {
    incrementUnreadMessagesCount,
}

export default mutations