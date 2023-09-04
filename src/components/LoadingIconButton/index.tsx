import React from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'


interface Props {
    color: string
    loading: boolean
    iconComponent: React.ReactNode
    onClick: () => void
}

export default function LoadingIconButton({ color, loading, iconComponent, onClick }: Props) {

    return loading ? (
        <Button
            sx={{
                padding: '11px',
                margin: 0,
                minWidth: 0,
            }}
            disabled={true}
        >
            <CircularProgress size={18} sx={{ color }} />
        </Button>
    ) : (
        <IconButton
            sx={{ color }}
            onClick={onClick}
        >
            {iconComponent}
        </IconButton>
    )
}

