import React, { useState } from 'react'
import Box from '@mui/material/Box'


interface Props {
    children(args: { isHovered: boolean }): React.ReactNode

    onClick(): void
}

export default function PostActionsButton(props: Props) {

    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <Box
            component='div'
            alignItems='center'
            border='none'
            display='flex'
            justifyContent='center'
            padding='8px'
            sx={{ cursor: 'pointer' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={props.onClick}
        >
            <Box
                component='div'
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                {props.children({ isHovered })}
            </Box>
        </Box>
    )
}