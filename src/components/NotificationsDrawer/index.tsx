import { useMemo } from 'react'
import { useUserDetailsNavigation, usePostViewNavigation } from '../../hooks/misc'
import { useQuery } from '@apollo/client'
import {
    FIND_DAILY_NOTIFICATIONS,
    FIND_WEEKLY_NOTIFICATIONS,
    FIND_MONTHLY_NOTIFICATIONS,
    FIND_EARLIER_NOTIFICATIONS,
} from '../../graphql/queries/notification'
import {
    FindDailyNotificationsQueryType,
    FindWeeklyNotificationsQueryType,
    FindMonthlyNotificationsQueryType,
    FindEarlierNotificationsQueryType,
} from '../../graphql/types/queries/notification'
import { Post, Notification } from '../../graphql/types/models'
import InstaNotificationsDrawer from '../../lib/src/components/NotificationsDrawer'
import _unionBy from 'lodash/unionBy'


interface User {
    _id: string
    username: string
    photoUrl: string | null
}

interface BaseNotification {
    users: User[]
    peopleCount: number
    createdAt: number
}

interface PostNotification extends BaseNotification {
    postId: string | number
    postPhotoUrls: string[]
}

interface FollowNotification extends BaseNotification {
    type: 'follow'
}

interface LikeNotification extends PostNotification {
    type: 'like'
}

interface CommentNotification extends PostNotification {
    type: 'comment'
}

type NotificationI = FollowNotification | LikeNotification | CommentNotification

const parseNotification = (notification: Notification): NotificationI => {
    let parsedNotification = {
        users: notification.latestUsers,
        peopleCount: notification.usersCount,
        createdAt: notification.createdAt,
    }
    if (notification.type === 'follow') {
        return {
            ...parsedNotification,
            type: 'follow',
        }
    } else {
        const post = notification.post as Pick<Post, '_id' | 'photoUrls'>
        return {
            ...parsedNotification,
            type: notification.type,
            postId: post._id,
            postPhotoUrls: post.photoUrls,
        }
    }
}

export default function NotificationsDrawer(props: { open: boolean, onClose(): void }) {

    const findDailyNotifications = useQuery<FindDailyNotificationsQueryType>(FIND_DAILY_NOTIFICATIONS, {
        variables: {
            offset: 0,
            limit: 4,
        },
        skip: !props.open,
    })

    const todayNotifications: NotificationI[] = useMemo(() => {
        if (!findDailyNotifications.loading && !findDailyNotifications.error && findDailyNotifications.data) {
            return findDailyNotifications.data.findDailyNotifications.data.map(parseNotification)
        }
        return []
    }, [findDailyNotifications.loading, findDailyNotifications.error, findDailyNotifications.data])

    const todayNotificationsCount: number = useMemo(() => {
        if (!findDailyNotifications.loading && !findDailyNotifications.error && findDailyNotifications.data) {
            return findDailyNotifications.data.findDailyNotifications.count
        }
        return 0
    }, [findDailyNotifications.loading, findDailyNotifications.error, findDailyNotifications.data])

    const onFetchMoreTodayNotifications = () => {
        if (findDailyNotifications.data) {
            findDailyNotifications.fetchMore({
                variables: {
                    offset: findDailyNotifications.data.findDailyNotifications.data.length,
                    limit: 10,
                },
                updateQuery(existing: FindDailyNotificationsQueryType, { fetchMoreResult }: { fetchMoreResult: FindDailyNotificationsQueryType }) {
                    return {
                        ...existing,
                        findDailyNotifications: {
                            ...fetchMoreResult.findDailyNotifications,
                            data: _unionBy(
                                existing.findDailyNotifications.data,
                                fetchMoreResult.findDailyNotifications.data,
                                '_id',
                            ),
                        },
                    }
                },
            }).catch(console.log)
        }
    }

    const findWeeklyNotifications = useQuery<FindWeeklyNotificationsQueryType>(FIND_WEEKLY_NOTIFICATIONS, {
        variables: {
            offset: 0,
            limit: 4,
        },
        skip: !props.open,
    })

    const thisWeekNotifications: NotificationI[] = useMemo(() => {
        if (!findWeeklyNotifications.loading && !findWeeklyNotifications.error && findWeeklyNotifications.data) {
            return findWeeklyNotifications.data.findWeeklyNotifications.data.map(parseNotification)
        }
        return []
    }, [findWeeklyNotifications.loading, findWeeklyNotifications.error, findWeeklyNotifications.data])

    const thisWeekNotificationsCount: number = useMemo(() => {
        if (!findWeeklyNotifications.loading && !findWeeklyNotifications.error && findWeeklyNotifications.data) {
            return findWeeklyNotifications.data.findWeeklyNotifications.count
        }
        return 0
    }, [findWeeklyNotifications.loading, findWeeklyNotifications.error, findWeeklyNotifications.data])

    const onFetchMoreThisWeekNotifications = () => {
        if (findWeeklyNotifications.data) {
            findWeeklyNotifications.fetchMore({
                variables: {
                    offset: findWeeklyNotifications.data.findWeeklyNotifications.data.length,
                    limit: 10,
                },
                updateQuery(existing: FindWeeklyNotificationsQueryType, { fetchMoreResult }: { fetchMoreResult: FindWeeklyNotificationsQueryType }) {
                    return {
                        ...existing,
                        findWeeklyNotifications: {
                            ...fetchMoreResult.findWeeklyNotifications,
                            data: _unionBy(
                                existing.findWeeklyNotifications.data,
                                fetchMoreResult.findWeeklyNotifications.data,
                                '_id',
                            ),
                        },
                    }
                },
            }).catch(console.log)
        }
    }

    const findMonthlyNotifications = useQuery<FindMonthlyNotificationsQueryType>(FIND_MONTHLY_NOTIFICATIONS, {
        variables: {
            offset: 0,
            limit: 4,
        },
        skip: !props.open,
    })

    const thisMonthNotifications: NotificationI[] = useMemo(() => {
        if (!findMonthlyNotifications.loading && !findMonthlyNotifications.error && findMonthlyNotifications.data) {
            return findMonthlyNotifications.data.findMonthlyNotifications.data.map(parseNotification)
        }
        return []
    }, [findMonthlyNotifications.loading, findMonthlyNotifications.error, findMonthlyNotifications.data])

    const thisMonthNotificationsCount: number = useMemo(() => {
        if (!findMonthlyNotifications.loading && !findMonthlyNotifications.error && findMonthlyNotifications.data) {
            return findMonthlyNotifications.data.findMonthlyNotifications.count
        }
        return 0
    }, [findMonthlyNotifications.loading, findMonthlyNotifications.error, findMonthlyNotifications.data])

    const onFetchMoreThisMonthNotifications = () => {
        if (findMonthlyNotifications.data) {
            findMonthlyNotifications.fetchMore({
                variables: {
                    offset: findMonthlyNotifications.data.findMonthlyNotifications.data.length,
                    limit: 10,
                },
                updateQuery(existing: FindMonthlyNotificationsQueryType, { fetchMoreResult }: { fetchMoreResult: FindMonthlyNotificationsQueryType }) {
                    return {
                        ...existing,
                        findMonthlyNotifications: {
                            ...fetchMoreResult.findMonthlyNotifications,
                            data: _unionBy(
                                existing.findMonthlyNotifications.data,
                                fetchMoreResult.findMonthlyNotifications.data,
                                '_id',
                            ),
                        },
                    }
                },
            }).catch(console.log)
        }
    }

    const findEarlierNotifications = useQuery<FindEarlierNotificationsQueryType>(FIND_EARLIER_NOTIFICATIONS, {
        variables: {
            offset: 0,
            limit: 4,
        },
        skip: !props.open,
    })

    const earlierNotifications: NotificationI[] = useMemo(() => {
        if (!findEarlierNotifications.loading && !findEarlierNotifications.error && findEarlierNotifications.data) {
            return findEarlierNotifications.data.findEarlierNotifications.data.map(parseNotification)
        }
        return []
    }, [findEarlierNotifications.loading, findEarlierNotifications.error, findEarlierNotifications.data])

    const earlierNotificationsCount: number = useMemo(() => {
        if (!findEarlierNotifications.loading && !findEarlierNotifications.error && findEarlierNotifications.data) {
            return findEarlierNotifications.data.findEarlierNotifications.count
        }
        return 0
    }, [findEarlierNotifications.loading, findEarlierNotifications.error, findEarlierNotifications.data])

    const onFetchMoreEarlierNotifications = () => {
        if (findEarlierNotifications.data) {
            findEarlierNotifications.fetchMore({
                variables: {
                    offset: findEarlierNotifications.data.findEarlierNotifications.data.length,
                    limit: 10,
                },
                updateQuery(existing: FindEarlierNotificationsQueryType, { fetchMoreResult }: { fetchMoreResult: FindEarlierNotificationsQueryType }) {
                    return {
                        ...existing,
                        findEarlierNotifications: {
                            ...fetchMoreResult.findEarlierNotifications,
                            data: _unionBy(
                                existing.findEarlierNotifications.data,
                                fetchMoreResult.findEarlierNotifications.data,
                                '_id',
                            ),
                        },
                    }
                },
            }).catch(console.log)
        }
    }

    const loading = useMemo(() => {
        return findDailyNotifications.loading || findWeeklyNotifications.loading || findMonthlyNotifications.loading || findEarlierNotifications.loading
    }, [findDailyNotifications.loading, findWeeklyNotifications.loading, findMonthlyNotifications.loading, findEarlierNotifications.loading])

    const navigateToUserDetails = useUserDetailsNavigation()

    const navigateToPostView = usePostViewNavigation()

    const handleClickNotification = (type: 'follow' | 'like' | 'comment', id: string | number | null) => {
        if (type === 'follow') {
            if (id) {
                navigateToUserDetails(id)
                props.onClose()
            }
        } else {
            if (id) {
                navigateToPostView(id)
                props.onClose()
            }
        }
    }

    return (
        <InstaNotificationsDrawer
            open={props.open}
            loading={loading}
            todayNotifications={todayNotifications}
            todayNotificationsCount={todayNotificationsCount}
            thisWeekNotifications={thisWeekNotifications}
            thisWeekNotificationsCount={thisWeekNotificationsCount}
            thisMonthNotifications={thisMonthNotifications}
            thisMonthNotificationsCount={thisMonthNotificationsCount}
            earlierNotifications={earlierNotifications}
            earlierNotificationsCount={earlierNotificationsCount}
            onFetchMoreTodayNotifications={onFetchMoreTodayNotifications}
            onFetchMoreThisWeekNotifications={onFetchMoreThisWeekNotifications}
            onFetchMoreThisMonthNotifications={onFetchMoreThisMonthNotifications}
            onFetchMoreEarlierNotifications={onFetchMoreEarlierNotifications}
            onClick={handleClickNotification}
        />
    )
}