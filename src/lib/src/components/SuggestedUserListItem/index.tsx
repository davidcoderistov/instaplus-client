import React, { useMemo } from 'react'
import ListItem from '../ListItem'
import ListItemAvatar from '../ListItemAvatar'
import ListItemContent from '../ListItemContent'
import ListItemTitle from '../ListItemTitle'
import ListItemSubtitle from '../ListItemSubtitle'
import ListItemActions from '../ListItemActions'
import Button from '../Button'
import FollowingButton from '../FollowingButton'
import Skeleton from '@mui/material/Skeleton'
import { PopupState } from 'material-ui-popup-state/hooks'
import _isEqual from 'lodash/isEqual'


interface StaticProps {
    loading?: never
    dense?: boolean
    authUserId: string | number
    user: {
        id: string | number
        username: string
        firstName: string
        lastName: string
        photoUrl: string | null
        following: boolean
        followingLoading: boolean
        followedByUsernames: string[]
        followedByCount: number
    }
    popupState?: PopupState

    onFollowUser(id: string | number): void

    onUnfollowUser(id: string | number): void

    onClickUser(id: string | number): void

    onHoverUser?(id: string | number): void
}

interface LoadingProps {
    loading: true
    dense?: boolean
    authUserId?: never
    user?: never
    popupState?: never

    onFollowUser?: never

    onUnfollowUser?: never

    onClickUser?: never

    onHoverUser?: never
}

type Props = StaticProps | LoadingProps

const SuggestedUserListItem = React.memo((props: Props) => {

    const handleFollowUser = () => {
        if (!props.loading) {
            props.onFollowUser(props.user.id)
        }
    }

    const handleClickUser = () => {
        if (!props.loading) {
            props.onClickUser(props.user.id)
        }
    }

    const handleHoverUser = () => {
        if (!props.loading && props.onHoverUser) {
            props.onHoverUser(props.user.id)
        }
    }

    const followedBy = useMemo(() => {
        if (!props.loading) {
            if (props.user.followedByCount > 0 && props.user.followedByUsernames.length > 0) {
                const usernames = props.user.followedByUsernames.join(props.user.followedByCount === 2 ? ' and ' : ', ')
                if (props.user.followedByCount > 2) {
                    return `Followed by ${usernames} + ${props.user.followedByCount - 2} more`
                }
                return `Followed by ${usernames}`
            }
        }
        return 'Suggested for you'
    }, [props.loading, props.user])

    return (
        <ListItem>
            <ListItemAvatar
                loading={Boolean(props.loading)}
                loader={
                    <Skeleton
                        variant='circular'
                        width={44}
                        height={44}
                        sx={{ backgroundColor: '#202020' }} />
                }
                photoUrls={props.loading ? [] : [props.user.photoUrl]}
                usernames={props.loading ? [] : [props.user.username]}
                onClick={handleClickUser}
                popupState={props.popupState}
                onHover={handleHoverUser}
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
                    title={props.user ? props.user.username : null}
                    onClick={handleClickUser}
                    popupState={props.popupState}
                    onHover={handleHoverUser}
                />
                {!props.dense && (
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
                        subtitle={props.user ? `${props.user.firstName} ${props.user.lastName}` : null}
                    />
                )}
                {!props.loading && (
                    <ListItemSubtitle
                        loading={false}
                        loader={null}
                        subtitle={followedBy}
                        dense
                    />
                )}
            </ListItemContent>
            {!props.loading && props.authUserId !== props.user.id && (
                <ListItemActions>
                    {props.user.following ? (
                        <FollowingButton
                            contained={!props.dense}
                            user={props.user}
                            onUnfollowUser={props.onUnfollowUser}
                        />
                    ) : (
                        <Button
                            variant='primary'
                            text='Follow'
                            contained={!props.dense}
                            loading={props.user.followingLoading}
                            onClick={handleFollowUser}
                        />
                    )}
                </ListItemActions>
            )}
        </ListItem>
    )
}, (prevProps, nextProps) => {

    const { user: prevUser, popupState: prevPopupState, ...prevRest } = prevProps
    const { user: nextUser, popupState: nextPopupState, ...nextRest } = nextProps

    const usersEqual = _isEqual(prevUser, nextUser)

    const restPropsEqual = _isEqual(prevRest, nextRest)

    return usersEqual && restPropsEqual
})

export default SuggestedUserListItem