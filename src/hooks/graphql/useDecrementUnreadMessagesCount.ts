import { useApolloClient } from '@apollo/client'
import { FIND_UNREAD_MESSAGES_COUNT_FOR_USER } from '../../graphql/queries/chat'
import { FindUnreadMessagesCountForUserQueryType } from '../../graphql/types/queries/chat'
import { decrementUnreadMessagesCount } from '../../apollo/mutations/chat/findUnreadMessagesCountForUser'


export function useDecrementUnreadMessagesCount() {

    const client = useApolloClient()

    return () => {
        client.cache.updateQuery({
            query: FIND_UNREAD_MESSAGES_COUNT_FOR_USER,
        }, (findUnreadMessagesCountForUser: FindUnreadMessagesCountForUserQueryType | null) => {
            if (findUnreadMessagesCountForUser) {
                return decrementUnreadMessagesCount({
                    queryData: findUnreadMessagesCountForUser,
                }).queryResult
            }
        })
    }
}