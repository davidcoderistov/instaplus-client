import { useState } from 'react'
import SidebarDrawer from '../SidebarDrawer'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { ArrowBackIos } from '@mui/icons-material'
import NotificationsDrawerListItem from '../NotificationsDrawerListItem'
import NotificationsDrawerTitle from './NotificationsDrawerTitle'
import NotificationsInfiniteList from './NotificationsInfiniteList'
import _range from 'lodash/range'


const NotificationsDrawerDivider = () => {

    return (
        <Box
            component='div'
            marginBottom='12px'
            marginLeft='0'
            marginTop='12px'
            marginRight='0'
            display='block'
        >
            <Box
                component='div'
                height='1px'
                width='100%'
                margin='0'
                bgcolor='#262626'
            />
        </Box>
    )
}

interface User {
    _id: string
    username: string
    photoUrl: string | null
}

interface Notification {
    users: User[]
    peopleCount: number
    createdAt: number
}

interface PostNotification extends Notification {
    postId: string | number
    postPhotoUrls: string[]
}

interface FollowNotification extends Notification {
    type: 'follow'
}

interface LikeNotification extends PostNotification {
    type: 'like'
}

interface CommentNotification extends PostNotification {
    type: 'comment'
}

type NotificationI = FollowNotification | LikeNotification | CommentNotification

interface SearchDrawerProps {
    open: boolean
    loading: boolean
    todayNotifications: NotificationI[]
    todayNotificationsCount: number
    thisWeekNotifications: NotificationI[]
    thisWeekNotificationsCount: number
    thisMonthNotifications: NotificationI[]
    thisMonthNotificationsCount: number
    earlierNotifications: NotificationI[]
    earlierNotificationsCount: number

    onFetchMoreTodayNotifications(): void

    onFetchMoreThisWeekNotifications(): void

    onFetchMoreThisMonthNotifications(): void

    onFetchMoreEarlierNotifications(): void

    onClick(type: 'follow' | 'like' | 'comment', id: string | number | null): void
}

export default function NotificationsDrawer(props: SearchDrawerProps) {

    const {
        todayNotificationsCount,
        thisWeekNotificationsCount,
        thisMonthNotificationsCount,
        earlierNotificationsCount,
    } = props

    const [view, setView] = useState<'all' | 'today' | 'thisWeek' | 'thisMonth' | 'earlier'>('all')

    const handleSeeAllToday = () => {
        setView('today')
    }

    const handleSeeAllThisWeek = () => {
        setView('thisWeek')
    }

    const handleSeeAllThisMonth = () => {
        setView('thisMonth')
    }

    const handleSeeAllEarlier = () => {
        setView('earlier')
    }

    const handleGoBack = () => {
        setView('all')
    }

    const onlyOneSection = (
        todayNotificationsCount > 0 && thisWeekNotificationsCount < 1 && thisMonthNotificationsCount < 1 && earlierNotificationsCount < 1
    ) || (
        todayNotificationsCount < 1 && thisWeekNotificationsCount > 0 && thisMonthNotificationsCount < 1 && earlierNotificationsCount < 1
    ) || (
        todayNotificationsCount < 1 && thisWeekNotificationsCount < 1 && thisMonthNotificationsCount > 0 && earlierNotificationsCount < 1
    ) || (
        todayNotificationsCount < 1 && thisWeekNotificationsCount < 1 && thisMonthNotificationsCount < 1 && earlierNotificationsCount > 0
    )

    return (
        <SidebarDrawer
            variant='permanent'
            anchor='left'
            open={props.open}
            PaperProps={{ sx: { backgroundColor: 'black', borderRight: '1px solid #232323' } }}
        >
            <Box
                component='div'
                paddingTop='24px'
                paddingBottom='24px'
                paddingRight='24px'
                paddingLeft='24px'
                marginTop='8px'
                marginLeft='0'
                marginRight='0'
                display='flex'
                justifyContent='flex-start'
                alignItems='center'
            >
                {view !== 'all' && (
                    <IconButton onClick={handleGoBack} sx={{ padding: 0 }}>
                        <ArrowBackIos sx={{ color: '#FFFFFF' }} />
                    </IconButton>
                )}
                <Box
                    component='div'
                    display='block'
                >
                    <Box
                        component='div'
                        lineHeight='30px'
                        minWidth='0'
                        margin='0!important'
                        color='#F5F5F5'
                        textAlign='left'
                        fontWeight='600'
                        position='relative'
                        display='block'
                        maxWidth='100%'
                        fontSize='22px'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-line',
                            wordBreak: 'break-word',
                        }}
                    >
                        Notifications
                    </Box>
                </Box>
            </Box>
            <Box
                component='div'
                display={view === 'all' && !onlyOneSection ? 'flex' : 'none'}
                flexDirection='column'
                flexGrow='1'
                flexShrink='1'
                minHeight='0'
                position='relative'
                sx={{ overflowX: 'hidden', overflowY: 'auto' }}
            >
                <Box
                    component='div'
                    border='0'
                    flexGrow='1'
                    fontSize='100%'
                    left='0'
                    margin='0'
                    position='absolute'
                    width='100%'
                    sx={{ overflowX: 'hidden', overflowY: 'auto', verticalAlign: 'baseline' }}
                >
                    {props.loading ? _range(10).map(index => (
                        <NotificationsDrawerListItem
                            key={index}
                            loading />
                    )) : (
                        <>
                            {todayNotificationsCount > 0 && (
                                <>
                                    <NotificationsDrawerTitle
                                        title='Today'
                                        showSeeAll={props.todayNotificationsCount > 4}
                                        onSeeAll={handleSeeAllToday}
                                    />
                                    {props.todayNotifications.slice(0, 4).map((notification, index) => (
                                        <NotificationsDrawerListItem
                                            key={index}
                                            notification={notification}
                                            onClick={props.onClick}
                                        />
                                    ))}
                                    {(thisWeekNotificationsCount > 0 || thisMonthNotificationsCount > 0 || earlierNotificationsCount > 0) && (
                                        <NotificationsDrawerDivider />
                                    )}
                                </>
                            )}
                            {thisWeekNotificationsCount > 0 && (
                                <>
                                    <NotificationsDrawerTitle
                                        title='This Week'
                                        showSeeAll={props.thisWeekNotificationsCount > 4}
                                        onSeeAll={handleSeeAllThisWeek}
                                    />
                                    {props.thisWeekNotifications.slice(0, 4).map((notification, index) => (
                                        <NotificationsDrawerListItem
                                            key={index + todayNotificationsCount}
                                            notification={notification}
                                            onClick={props.onClick}
                                        />
                                    ))}
                                    {(thisMonthNotificationsCount > 0 || earlierNotificationsCount > 0) && (
                                        <NotificationsDrawerDivider />
                                    )}
                                </>
                            )}
                            {thisMonthNotificationsCount > 0 && (
                                <>
                                    <NotificationsDrawerTitle
                                        title='This Month'
                                        showSeeAll={props.thisMonthNotificationsCount > 4}
                                        onSeeAll={handleSeeAllThisMonth}
                                    />
                                    {props.thisMonthNotifications.slice(0, 4).map((notification, index) => (
                                        <NotificationsDrawerListItem
                                            key={index + todayNotificationsCount + thisWeekNotificationsCount}
                                            notification={notification}
                                            onClick={props.onClick}
                                        />
                                    ))}
                                    {earlierNotificationsCount > 0 && (
                                        <NotificationsDrawerDivider />
                                    )}
                                </>
                            )}
                            {earlierNotificationsCount > 0 && (
                                <>
                                    <NotificationsDrawerTitle
                                        title='Earlier'
                                        showSeeAll={props.earlierNotificationsCount > 4}
                                        onSeeAll={handleSeeAllEarlier}
                                    />
                                    {props.earlierNotifications.slice(0, 4).map((notification, index) => (
                                        <NotificationsDrawerListItem
                                            key={index + todayNotificationsCount + thisWeekNotificationsCount + thisMonthNotificationsCount}
                                            notification={notification}
                                            onClick={props.onClick}
                                        />
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </Box>
            </Box>
            <NotificationsInfiniteList
                id='scrollableTodayNotificationsList'
                visible={view === 'today' || (todayNotificationsCount > 0 && onlyOneSection)}
                title='Today'
                notifications={props.todayNotifications}
                hasMoreNotifications={props.todayNotifications.length < todayNotificationsCount}
                onFetchMoreNotifications={props.onFetchMoreTodayNotifications}
                onClickNotification={props.onClick} />
            <NotificationsInfiniteList
                id='scrollableThisWeekNotificationsList'
                visible={view === 'thisWeek' || (thisWeekNotificationsCount > 0 && onlyOneSection)}
                title='This week'
                notifications={props.thisWeekNotifications}
                hasMoreNotifications={props.thisWeekNotifications.length < thisWeekNotificationsCount}
                onFetchMoreNotifications={props.onFetchMoreThisWeekNotifications}
                onClickNotification={props.onClick} />
            <NotificationsInfiniteList
                id='scrollableThisMonthNotificationsList'
                visible={view === 'thisMonth' || (thisMonthNotificationsCount > 0 && onlyOneSection)}
                title='This month'
                notifications={props.thisMonthNotifications}
                hasMoreNotifications={props.thisMonthNotifications.length < thisMonthNotificationsCount}
                onFetchMoreNotifications={props.onFetchMoreThisMonthNotifications}
                onClickNotification={props.onClick} />
            <NotificationsInfiniteList
                id='scrollableEarlierNotificationsList'
                visible={view === 'earlier' || (earlierNotificationsCount > 0 && onlyOneSection)}
                title='Earlier'
                notifications={props.earlierNotifications}
                hasMoreNotifications={props.earlierNotifications.length < earlierNotificationsCount}
                onFetchMoreNotifications={props.onFetchMoreEarlierNotifications}
                onClickNotification={props.onClick} />
            {!props.loading && todayNotificationsCount < 1 && thisWeekNotificationsCount < 1 && thisMonthNotificationsCount < 1 && earlierNotificationsCount < 1 && (
                <Box
                    component='div'
                    position='absolute'
                    top='50%'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    width='100%'
                >
                    <Typography
                        fontSize={14}
                        color='#A8A8A8'
                    >
                        No recent notifications.
                    </Typography>
                </Box>
            )}
        </SidebarDrawer>
    )
}