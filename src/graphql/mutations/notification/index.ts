import { gql } from '@apollo/client'


export const UPDATE_NOTIFICATION_HISTORY_FOR_USER = gql`
    mutation updateNotificationHistoryForUser($date: Timestamp!) {
        updateNotificationHistoryForUser(date: $date) {
            _id
        }
    }
`