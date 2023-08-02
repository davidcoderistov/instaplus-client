import React from 'react'
import ListItem from '../ListItem'
import ListItemAvatar from '../ListItemAvatar'
import ListItemContent from '../ListItemContent'
import ListItemTitle from '../ListItemTitle'
import ListItemSubtitle from '../ListItemSubtitle'
import ListItemActions from '../ListItemActions'
import Skeleton from '@mui/material/Skeleton'


interface User {
    _id: string | number
    username: string
    firstName: string
    lastName: string
    photoUrl: string | null
    selected: boolean
}

interface StaticProps {
    loading?: never
    _id: string | number
    username: string
    firstName: string
    lastName: string
    photoUrl: string | null
    selected: boolean

    onClickUser(user: User): void
}

interface LoadingProps {
    loading: true
    _id?: never
    username?: never
    firstName?: never
    lastName?: never
    photoUrl?: never
    selected?: never

    onClickUser?: never
}

type Props = StaticProps | LoadingProps

const SearchableUser = React.memo((props: Props) => {

    const handleClickUser = () => {
        if (!props.loading) {
            props.onClickUser(props)
        }
    }

    return (
        <ListItem
            dark
            gutters
            clickable={!props.loading}
            onClick={handleClickUser}
        >
            <ListItemAvatar
                loading={Boolean(props.loading)}
                loader={
                    <Skeleton
                        variant='circular'
                        width={44}
                        height={44}
                        sx={{ backgroundColor: '#3A3A3A' }} />
                }
                photoUrls={props.loading ? [] : [props.photoUrl]}
                usernames={props.loading ? [] : [props.username]}
            />
            <ListItemContent gutters={Boolean(props.loading)}>
                <ListItemTitle
                    loading={Boolean(props.loading)}
                    loader={
                        <Skeleton
                            variant='rounded'
                            width={320}
                            height={14}
                            sx={{
                                backgroundColor: '#3A3A3A',
                                borderRadius: '8px',
                            }} />
                    }
                    title={!props.loading ? props.username : null}
                />
                <ListItemSubtitle
                    loading={Boolean(props.loading)}
                    loader={
                        <Skeleton
                            variant='rounded'
                            width={260}
                            height={13}
                            sx={{
                                backgroundColor: '#3A3A3A',
                                borderRadius: '8px',
                            }} />
                    }
                    subtitle={!props.loading ? `${props.firstName} ${props.lastName}` : null}
                />
            </ListItemContent>
            {!props.loading && (
                <ListItemActions>
                    {props.selected ? (
                        <svg
                            aria-label='Toggle selection'
                            style={{ display: 'block', position: 'relative' }}
                            color='rgb(0, 149, 246)'
                            fill='rgb(0, 149, 246)'
                            height='24'
                            role='img'
                            viewBox='0 0 24 24'
                            width='24'
                        >
                            <title>
                                Toggle selection
                            </title>
                            <path
                                d='M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5.706 9.21-6.5 6.495a1 1 0 0 1-1.414-.001l-3.5-3.503a1 1 0 1 1 1.414-1.414l2.794 2.796L16.293 8.3a1 1 0 0 1 1.414 1.415Z' />
                        </svg>
                    ) : (
                        <svg
                            aria-label='Toggle selection'
                            style={{ display: 'block', position: 'relative' }}
                            color='rgb(245, 245, 245)'
                            fill='rgb(245, 245, 245)'
                            height='24'
                            role='img'
                            viewBox='0 0 24 24'
                            width='24'
                        >
                            <title>
                                Toggle selection
                            </title>
                            <circle
                                cx='12.008'
                                cy='12'
                                fill='none'
                                r='11.25'
                                stroke='currentColor'
                                strokeLinejoin='round'
                                strokeWidth='1.5' />
                        </svg>
                    )}
                </ListItemActions>
            )}
        </ListItem>
    )
})

export default SearchableUser