import { Notification } from '../../models'


export interface FindDailyNotificationsQueryType {
    findDailyNotifications: {
        count: number
        data: Notification[]
    }
}

export interface FindWeeklyNotificationsQueryType {
    findWeeklyNotifications: {
        count: number
        data: Notification[]
    }
}

export interface FindMonthlyNotificationsQueryType {
    findMonthlyNotifications: {
        count: number
        data: Notification[]
    }
}

export interface FindEarlierNotificationsQueryType {
    findEarlierNotifications: {
        count: number
        data: Notification[]
    }
}

export interface FindUserHasUnseenNotificationsQueryType {
    findUserHasUnseenNotifications: {
        _id: string
        hasUnseenNotifications: boolean
    }
}