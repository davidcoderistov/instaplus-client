import { gql } from '@apollo/client'


export const FIND_DAILY_NOTIFICATIONS = gql`
    query findDailyNotifications($offset: Int!, $limit: Int!) {
        findDailyNotifications(offset: $offset, limit: $limit) {
            count
            data {
                _id
                type
                latestUsers {
                    _id
                    username
                    photoUrl
                }
                usersCount
                post {
                    _id
                    photoUrls
                }
                createdAt
            }
        }
    }
`

export const FIND_WEEKLY_NOTIFICATIONS = gql`
    query findWeeklyNotifications($offset: Int!, $limit: Int!) {
        findWeeklyNotifications(offset: $offset, limit: $limit) {
            count
            data {
                _id
                type
                latestUsers {
                    _id
                    username
                    photoUrl
                }
                usersCount
                post {
                    _id
                    photoUrls
                }
                createdAt
            }
        }
    }
`

export const FIND_MONTHLY_NOTIFICATIONS = gql`
    query findMonthlyNotifications($offset: Int!, $limit: Int!) {
        findMonthlyNotifications(offset: $offset, limit: $limit) {
            count
            data {
                _id
                type
                latestUsers {
                    _id
                    username
                    photoUrl
                }
                usersCount
                post {
                    _id
                    photoUrls
                }
                createdAt
            }
        }
    }
`

export const FIND_EARLIER_NOTIFICATIONS = gql`
    query findEarlierNotifications($offset: Int!, $limit: Int!) {
        findEarlierNotifications(offset: $offset, limit: $limit) {
            count
            data {
                _id
                type
                latestUsers {
                    _id
                    username
                    photoUrl
                }
                usersCount
                post {
                    _id
                    photoUrls
                }
                createdAt
            }
        }
    }
`

export const FIND_USER_HAS_UNSEEN_NOTIFICATIONS = gql`
    query findUserHasUnseenNotifications {
        findUserHasUnseenNotifications {
            _id
            hasUnseenNotifications
        }
    }
`