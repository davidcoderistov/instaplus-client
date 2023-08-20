import React, { useCallback } from 'react'
import ListItem from '../ListItem'
import ListItemAvatar from '../ListItemAvatar'
import ListItemContent from '../ListItemContent'
import ListItemTitle from '../ListItemTitle'
import ListItemSubtitle from '../ListItemSubtitle'
import ListItemActions from '../ListItemActions'
import Button from '../Button'
import FollowingButton from '../FollowingButton'
import Skeleton from '@mui/material/Skeleton'
import _isEqual from 'lodash/isEqual'


interface StaticProps {
    loading?: never
    authUserId: string | number
    user: {
        id: string | number
        username: string
        firstName: string
        lastName: string
        photoUrl: string | null
        following: boolean
        followingLoading: boolean
    }

    onFollowUser(id: string | number): void

    onUnfollowUser(id: string | number): void

    onClickUser(id: string | number): void
}

interface LoadingProps {
    loading: true
    authUserId?: never
    user?: never

    onFollowUser?: never

    onUnfollowUser?: never

    onClickUser?: never
}

type Props = StaticProps | LoadingProps

const FollowableUserListItem = React.memo((props: Props) => {

    const handleFollowUser = useCallback(() => {
        if (!props.loading) {
            props.onFollowUser(props.user.id)
        }
    }, [props.loading, props.onFollowUser])

    const handleClickUser = useCallback(() => {
        if (!props.loading) {
            props.onClickUser(props.user.id)
        }
    }, [props.loading, props.onClickUser])

    return (
        <ListItem>
            <ListItemAvatar
                loading={Boolean(props.loading)}
                loader={
                    <Skeleton
                        variant='circular'
                        width={44}
                        height={44}
                        sx={{ backgroundColor: '#3A3A3A' }} />
                }
                photoUrls={props.loading ? [] : [props.user.photoUrl]}
                usernames={props.loading ? [] : [props.user.username]}
                onClick={handleClickUser}
            />
            <ListItemContent gutters={Boolean(props.loading)}>
                <ListItemTitle
                    loading={Boolean(props.loading)}
                    loader={
                        <Skeleton
                            variant='rounded'
                            width={240}
                            height={14}
                            sx={{
                                backgroundColor: '#3A3A3A',
                                borderRadius: '8px',
                            }} />
                    }
                    title={props.user ? props.user.username : null}
                    onClick={handleClickUser}
                />
                <ListItemSubtitle
                    loading={Boolean(props.loading)}
                    loader={
                        <Skeleton
                            variant='rounded'
                            width={180}
                            height={13}
                            sx={{
                                backgroundColor: '#3A3A3A',
                                borderRadius: '8px',
                            }} />
                    }
                    subtitle={props.user ? `${props.user.firstName} ${props.user.lastName}` : null}
                />
            </ListItemContent>
            {!props.loading && props.authUserId !== props.user.id && (
                <ListItemActions>
                    {props.user.following ? (
                        <FollowingButton
                            contained
                            user={props.user}
                            onUnfollowUser={props.onUnfollowUser}
                        />
                    ) : (
                        <Button
                            variant='primary'
                            text='Follow'
                            contained
                            loading={props.user.followingLoading}
                            onClick={handleFollowUser}
                        />
                    )}
                </ListItemActions>
            )}
        </ListItem>
    )
}, (prevProps, nextProps) => {

    const { user: prevUser, ...prevRest } = prevProps
    const { user: nextUser, ...nextRest } = nextProps

    const usersEqual = _isEqual(prevUser, nextUser)

    const restPropsEqual = _isEqual(prevRest, nextRest)

    return usersEqual && restPropsEqual
})

export default FollowableUserListItem