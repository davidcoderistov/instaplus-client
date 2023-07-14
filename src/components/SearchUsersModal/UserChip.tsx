import React from 'react'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'


interface User {
    _id: string | number
    firstName: string
    lastName: string
    username: string
    photoUrl: string | null
}

interface Props {
    user: User

    onRemoveUser(_id: string | number): void
}

const UserChip = React.memo((props: Props) => {

    const handleRemoveUser = () => {
        props.onRemoveUser(props.user._id)
    }

    return (
        <Chip
            key={props.user._id}
            color='primary'
            label={props.user.username}
            avatar={
                <Avatar
                    alt={`${props.user.username} profile picture`}
                    src={props.user.photoUrl ? props.user.photoUrl : undefined}
                />
            }
            onDelete={handleRemoveUser}
        />
    )
})

export default UserChip