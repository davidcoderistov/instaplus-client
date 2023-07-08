import React, { useState, useCallback } from 'react'
import Button from '../Button'
import UnfollowUserModal from '../UnfollowUserModal'


interface Props {
    contained: boolean
    fullWidth?: boolean
    minWidth?: number
    user: {
        id: string | number
        username: string
        photoUrl: string
        followingLoading: boolean
    }

    onUnfollowUser(id: string | number): void
}

export default function FollowingButton(props: Props) {

    const [unfollowUserModalOpen, setUnfollowUserModalOpen] = useState(false)

    const handleOpenUnfollowUserModal = () => {
        setUnfollowUserModalOpen(true)
    }

    const handleCloseUnfollowUserModal = () => {
        setUnfollowUserModalOpen(false)
    }

    const handleUnfollowUser = useCallback(() => {
        setUnfollowUserModalOpen(false)
        props.onUnfollowUser(props.user.id)
    }, [props.onUnfollowUser])

    return (
        <>
            <Button
                variant='secondary'
                text='Following'
                contained={props.contained}
                minWidth={props.minWidth}
                fullWidth={props.fullWidth}
                loading={props.user.followingLoading}
                onClick={handleOpenUnfollowUserModal}
            />
            <UnfollowUserModal
                open={unfollowUserModalOpen}
                user={props.user}
                onUnfollowUser={handleUnfollowUser}
                onCloseModal={handleCloseUnfollowUserModal}
            />
        </>
    )
}