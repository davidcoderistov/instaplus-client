import React, { useMemo } from 'react'
import ListItem from '../ListItem'
import ListItemAvatar from '../ListItemAvatar'
import ListItemContent from '../ListItemContent'
import ListItemTitle from '../ListItemTitle'
import ListItemSubtitle from '../ListItemSubtitle'
import ListItemActions from '../ListItemActions'
import Skeleton from '@mui/material/Skeleton'
import IconButton from '@mui/material/IconButton'
import { Close } from '@mui/icons-material'
import { formatNumber } from '../../utils'


interface User {
    _id: string | number
    firstName: string
    lastName: string
    username: string
    photoUrl: string | null
}

interface Hashtag {
    _id: string | number
    name: string
    postIds: string[]
}

interface SearchUser {
    user: User
    latestFollower: Pick<User, '_id' | 'username'> | null
    followersCount: number
}

interface UserSearch {
    searchUser: SearchUser | null
    hashtag: Hashtag | null
}

interface StaticProps {
    loading?: never
    item: UserSearch

    onClickItem?(item: UserSearch): void

    onRemoveItem?(item: UserSearch): void
}

interface LoadingProps {
    loading: true
    item?: never

    onClickItem?: never

    onRemoveItem?: never
}

type Props = StaticProps | LoadingProps

const SearchDrawerListItem = React.memo((props: Props) => {

    const handleClickItem = () => {
        if (!props.loading && props.onClickItem) {
            props.onClickItem(props.item)
        }
    }

    const handleRemoveItem = (event: React.MouseEvent) => {
        if (!props.loading && props.onRemoveItem) {
            event.stopPropagation()
            props.onRemoveItem(props.item)
        }
    }

    const subtitle = useMemo(() => {
        if (!props.loading) {
            if (props.item.searchUser) {
                let followedBy = null
                if (props.item.searchUser.followersCount > 0 && props.item.searchUser.latestFollower) {
                    const username = props.item.searchUser.latestFollower.username
                    if (props.item.searchUser.followersCount > 1) {
                        followedBy = `Followed by ${username} + ${props.item.searchUser.followersCount - 1} more`
                    } else {
                        followedBy = `Followed by ${username}`
                    }
                }
                const user = `${props.item.searchUser.user.firstName} ${props.item.searchUser.user.lastName}`
                return followedBy ? `${user} • ${followedBy}` : user
            } else {
                const hashtag = props.item.hashtag as Hashtag
                if (hashtag.postIds.length > 0) {
                    return `${formatNumber(hashtag.postIds.length)} ${hashtag.postIds.length > 1 ? 'posts' : 'post'}`
                }
            }
        }
        return null
    }, [props.loading, props.item])

    return (
        <ListItem
            gutters
            clickable={!props.loading}
            onClick={handleClickItem}
        >
            <ListItemAvatar
                loading={Boolean(props.loading)}
                hashtag={Boolean(!props.loading && props.item.hashtag)}
                loader={
                    <Skeleton
                        variant='circular'
                        width={44}
                        height={44}
                        sx={{ backgroundColor: '#202020' }} />
                }
                photoUrls={!props.loading && props.item.searchUser ? [props.item.searchUser.user.photoUrl] : []}
                usernames={!props.loading && props.item.searchUser ? [props.item.searchUser.user.username] : []}
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
                    title={!props.loading ? props.item.searchUser ? props.item.searchUser.user.username : `#${props.item.hashtag?.name}` : null}
                />
                {(props.loading || props.item.searchUser || (props.item.hashtag && props.item.hashtag.postIds.length > 0)) && (
                    <ListItemSubtitle
                        loading={Boolean(props.loading)}
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
                        subtitle={subtitle}
                    />
                )}
            </ListItemContent>
            {!props.loading && !!props.onRemoveItem && (
                <ListItemActions>
                    <IconButton
                        sx={{ padding: '4px' }}
                        onClick={handleRemoveItem}
                    >
                        <Close sx={{ color: '#A8A8A8' }} />
                    </IconButton>
                </ListItemActions>
            )}
        </ListItem>
    )
})

export default SearchDrawerListItem