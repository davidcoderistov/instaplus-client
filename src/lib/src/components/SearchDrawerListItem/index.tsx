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


interface Tag {
    type: 'tag'
    id: string | number
    name: string
    postsCount: number
}

interface User {
    type: 'user'
    id: string | number
    username: string
    firstName: string
    lastName: string
    photoUrl?: string | null
    followedByUsernames: string[]
    followedByCount: number
}

interface StaticProps {
    loading?: never
    item: Tag | User

    onClickItem?(id: string | number, type: 'tag' | 'user'): void

    onRemoveItem?(id: string | number, type: 'tag' | 'user'): void
}

interface LoadingProps {
    loading: true
    item: Tag | User

    onClickItem?: never

    onRemoveItem?: never
}

type Props = StaticProps | LoadingProps

const SearchDrawerListItem = React.memo((props: Props) => {

    const handleClickItem = () => {
        if (!props.loading && props.onClickItem) {
            props.onClickItem(props.item.id, props.item.type)
        }
    }

    const handleRemoveItem = (event: React.MouseEvent) => {
        if (!props.loading && props.onRemoveItem) {
            event.stopPropagation()
            props.onRemoveItem(props.item.id, props.item.type)
        }
    }

    const subtitle = useMemo(() => {
        if (!props.loading) {
            if (props.item.type === 'user') {
                let followedBy = null
                if (props.item.followedByCount > 0 && props.item.followedByUsernames.length > 0) {
                    const username = props.item.followedByUsernames[0]
                    if (props.item.followedByCount > 1) {
                        followedBy = `Followed by ${username} + ${props.item.followedByCount - 1} more`
                    } else {
                        followedBy = `Followed by ${username}`
                    }
                }
                const user = `${props.item.firstName} ${props.item.lastName}`
                return followedBy ? `${user} • ${followedBy}` : user
            }
            if (props.item.postsCount > 0) {
                return `${formatNumber(props.item.postsCount)} posts`
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
                loading={props.loading}
                hashtag={!props.loading && props.item.type === 'tag'}
                loader={
                    <Skeleton
                        variant='circular'
                        width={44}
                        height={44}
                        sx={{ backgroundColor: '#202020' }} />
                }
                photoUrls={!props.loading && props.item.type === 'user' && props.item.photoUrl ? [props.item.photoUrl] : []}
                usernames={!props.loading && props.item.type === 'user' ? [props.item.username] : []}
            />
            <ListItemContent gutters={props.loading}>
                <ListItemTitle
                    loading={props.loading}
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
                    title={!props.loading ? props.item.type === 'user' ? props.item.username : `#${props.item.name}` : null}
                />
                {(props.loading || props.item.type === 'user' || props.item.postsCount > 0) && (
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