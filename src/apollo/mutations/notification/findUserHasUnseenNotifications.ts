import { FindUserHasUnseenNotificationsQueryType } from '../../../graphql/types/queries/notification'


interface MarkNotificationsAsSeenOptions {
    queryData: FindUserHasUnseenNotificationsQueryType
}

interface MarkNotificationsAsSeenReturnValue {
    queryResult: FindUserHasUnseenNotificationsQueryType
}

export function markNotificationsAsSeen(options: MarkNotificationsAsSeenOptions): MarkNotificationsAsSeenReturnValue {
    return {
        queryResult: {
            findUserHasUnseenNotifications: {
                ...options.queryData.findUserHasUnseenNotifications,
                hasUnseenNotifications: false,
            },
        },
    }
}

const mutations = {
    markNotificationsAsSeen,
}

export default mutations