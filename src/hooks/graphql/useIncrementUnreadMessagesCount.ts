import { useApolloClient } from '@apollo/client'
import { FIND_UNREAD_MESSAGES_COUNT_FOR_USER } from '../../graphql/queries/chat'
import { FindUnreadMessagesCountForUserQueryType } from '../../graphql/types/queries/chat'
import { incrementUnreadMessagesCount } from '../../apollo/mutations/chat/findUnreadMessagesCountForUser'


export function useIncrementUnreadMessagesCount() {

    const client = useApolloClient()

    return (chatId: string) => {
        client.cache.updateQuery({
            query: FIND_UNREAD_MESSAGES_COUNT_FOR_USER,
        }, (findUnreadMessagesCountForUser: FindUnreadMessagesCountForUserQueryType | null) => {
            if (findUnreadMessagesCountForUser) {
                return incrementUnreadMessagesCount({
                    queryData: findUnreadMessagesCountForUser,
                    chatId,
                }).queryResult
            }
        })
    }
}