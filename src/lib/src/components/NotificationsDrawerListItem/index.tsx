import React, { useMemo } from 'react'
import ListItem from '../ListItem'
import ListItemAvatar from '../ListItemAvatar'
import ListItemContent from '../ListItemContent'
import ListItemTitle from '../ListItemTitle'
import ListItemSubtitle from '../ListItemSubtitle'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { getTimeElapsed } from '../../utils'


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

interface StaticProps {
    loading?: never
    notification: FollowNotification | LikeNotification | CommentNotification

    onClick(type: 'follow' | 'like' | 'comment', id: string | number | null): void
}

interface LoadingProps {
    loading: true
    notification?: never

    onClick?: never
}

type Props = StaticProps | LoadingProps

const NotificationsDrawerListItem = React.memo((props: Props) => {

    const handleClickItem = () => {
        if (!props.loading) {
            props.onClick(
                props.notification.type,
                props.notification.type === 'follow' ?
                    props.notification.users.length < 2 ? props.notification.users[0]._id : null
                    : props.notification.postId,
            )
        }
    }

    const usernames = useMemo(() => {
        if (!props.loading) {
            const usernames = props.notification.users.map(user => user.username).slice(0, 2).join(props.notification.peopleCount === 2 ? ' and ' : ', ')
            if (props.notification.peopleCount > 2) {
                const othersCount = props.notification.peopleCount - 2
                return `${usernames} and ${othersCount} ${othersCount > 1 ? 'others' : 'other'}`
            }
            return usernames
        }
        return null
    }, [props.loading, props.notification])

    const text = useMemo(() => {
        if (!props.loading) {
            let text = null
            if (props.notification.type === 'follow') {
                text = 'started following you.'
            } else if (props.notification.type === 'like') {
                text = `liked your post.`
            } else if (props.notification.type === 'comment') {
                text = `commented on your post.`
            }
            return (
                <Box
                    component='span'
                    fontWeight='400'
                >
                    {text}
                </Box>
            )
        }
        return null
    }, [props.loading, props.notification])

    const ago = useMemo(() => {
        if (!props.loading) {
            return (
                <Box
                    component='span'
                    fontWeight='400'
                    color='#A8A8A8'
                >
                    {getTimeElapsed(props.notification.createdAt, 'hours')}
                </Box>
            )
        }
        return null
    }, [props.loading, props.notification])

    const title = useMemo(() => {
        if (!props.loading) {
            return (
                <Box
                    component='span'
                >
                    {usernames} {text} {ago}
                </Box>
            )
        }
        return null
    }, [props.loading, usernames, text, ago])

    return (
        <ListItem
            gutters
            clickable={!props.loading}
            onClick={handleClickItem}
        >
            <ListItemAvatar
                loading={Boolean(props.loading)}
                loader={
                    <Skeleton
                        variant='circular'
                        width={44}
                        height={44}
                        sx={{ backgroundColor: '#202020' }} />
                }
                photoUrls={!props.loading ? props.notification.users.map(user => user.photoUrl) : []}
                usernames={!props.loading ? props.notification.users.map(user => user.username) : []}
            />
            <ListItemContent gutters={Boolean(props.loading)}>
                <ListItemTitle
                    loading={Boolean(props.loading)}
                    loader={
                        <Skeleton
                            variant='rounded'
                            width={240}
                            height={17}
                            sx={{
                                backgroundColor: '#202020',
                                borderRadius: '8px',
                            }} />
                    }
                    title={title}
                />
                {props.loading && (
                    <ListItemSubtitle
                        loading={props.loading}
                        loader={
                            <Skeleton
                                variant='rounded'
                                width={180}
                                height={16}
                                sx={{
                                    backgroundColor: '#202020',
                                    borderRadius: '8px',
                                }} />
                        }
                        subtitle={null}
                    />
                )}
            </ListItemContent>
            {!props.loading && (props.notification.type === 'like' || props.notification.type === 'comment') && (
                <Box
                    component='div'
                    flexShrink='0'
                    marginLeft='12px'
                    lineHeight='0'
                    display='block'
                >
                    <Box
                        component='span'
                        height='44px'
                        width='44px'
                        position='relative'
                        display='block'
                        sx={{
                            overflowX: 'hidden',
                            overflowY: 'hidden',
                        }}
                    >
                        <img alt='Post photo'
                             style={{
                                 height: '100%',
                                 width: '100%',
                                 border: '0',
                                 overflowClipMargin: 'content-box',
                                 overflow: 'clip',
                             }}
                             height='44'
                             src={props.notification.postPhotoUrls[0]}
                             width='44' />
                    </Box>
                </Box>
            )}
        </ListItem>
    )
})

export default NotificationsDrawerListItem