import { useRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import NotificationsDrawerTitle from './NotificationsDrawerTitle'
import NotificationsDrawerListItem from '../NotificationsDrawerListItem'
import InfiniteScroll from 'react-infinite-scroll-component'


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

interface Props {
    id: string
    visible: boolean
    title: string
    notifications: NotificationI[]
    hasMoreNotifications: boolean

    onFetchMoreNotifications(): void

    onClickNotification(type: 'follow' | 'like' | 'comment', id: string | number | null): void
}

export default function NotificationsInfiniteList(props: Props) {

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (props.visible) {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0
            }
        }
    }, [props.visible])

    const initialFetch = useRef(true)

    useEffect(() => {
        if (props.visible && initialFetch.current) {
            if (props.hasMoreNotifications && props.notifications.length <= 4) {
                props.onFetchMoreNotifications()
            }
            initialFetch.current = false
        }
    }, [props.visible, props.hasMoreNotifications, props.notifications])

    return (
        <Box
            id={props.id}
            ref={scrollContainerRef}
            component='div'
            display={props.visible ? 'flex' : 'none'}
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
                <InfiniteScroll
                    scrollableTarget={props.id}
                    next={props.onFetchMoreNotifications}
                    hasMore={props.hasMoreNotifications}
                    loader={<Box
                        component='div'
                        display='block'
                    >
                        <NotificationsDrawerListItem loading />
                        <NotificationsDrawerListItem loading />
                    </Box>}
                    dataLength={props.notifications.length}
                >
                    <Box
                        component='div'
                        display='block'
                    >
                        <NotificationsDrawerTitle title={props.title} />
                        {props.notifications.map((notification, index) => (
                            <NotificationsDrawerListItem
                                key={index}
                                notification={notification}
                                onClick={props.onClickNotification}
                            />
                        ))}
                    </Box>
                </InfiniteScroll>
            </Box>
        </Box>
    )
}