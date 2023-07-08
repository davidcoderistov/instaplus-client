import React from 'react'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'


interface User {
    id: string | number
    firstName: string
    lastName: string
    username: string
    photoUrl: string
}

interface Props {
    user: User

    onRemoveUser(id: string | number): void
}

const UserChip = React.memo((props: Props) => {

    const handleRemoveUser = () => {
        props.onRemoveUser(props.user.id)
    }

    return (
        <Chip
            key={props.user.id}
            color='primary'
            label={props.user.username}
            avatar={
                <Avatar
                    alt={`${props.user.username} profile picture`}
                    src={props.user.photoUrl}
                />
            }
            onDelete={handleRemoveUser}
        />
    )
})

export default UserChip