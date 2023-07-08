import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'


interface ButtonProps {
    variant: 'primary' | 'secondary'
    text: string | React.ReactNode
    minWidth?: number
    fullWidth?: boolean
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    contained?: boolean
    loading?: boolean
    disabled?: boolean
    onClick: (event: React.MouseEvent) => void
}

export default function Button(props: ButtonProps) {

    const primary = props.variant === 'primary'

    return (
        <LoadingButton
            {...typeof props.text !== 'string' && { component: 'label' }}
            variant={props.contained ? 'contained' : 'text'}
            sx={props.contained ? {
                textTransform: 'none',
                borderRadius: '10px',
                height: '34px',
                ...!!props.minWidth && { minWidth: props.minWidth },
                backgroundColor: primary ? '#0095F6' : '#EFEFEF',
                ...!primary && { color: '#000000' },
                '&:hover': {
                    backgroundColor: primary ? '#1877F2' : '#DBDBDB',
                },
                '&.MuiLoadingButton-loading': {
                    backgroundColor: primary ? '#0095F6' : '#FFFFFF',
                },
                '.MuiLoadingButton-loadingIndicator': {
                    color: primary ? '#FFFFFF' : '#000000',
                },
                ...props.text === 'Follow' && { paddingX: '20px' },
                ...props.text === 'Following' && { paddingX: '24px' },
            } : {
                textTransform: 'none',
                color: primary ? '#0095F6' : '#DBDBDB',
                '&:hover': {
                    color: '#FFFFFF',
                },
                '.MuiLoadingButton-loadingIndicator': {
                    color: primary ? '#0095F6' : '#DBDBDB',
                },
                '&.Mui-disabled': {
                    color: props.loading ? 'default' : '#4F6070',
                },
                padding: 0,
                margin: 0,
                lineHeight: '18px',
                minWidth: 0,
                ...props.text === 'Follow' && { minWidth: '46px' },
            }}
            fullWidth={Boolean(props.fullWidth)}
            startIcon={props.startIcon ?? null}
            endIcon={props.endIcon ?? null}
            loading={props.loading}
            onClick={props.onClick}
            disableFocusRipple
            disabled={props.disabled}
        >
            {props.text}
        </LoadingButton>
    )
}