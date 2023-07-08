import React from 'react'
import Box from '@mui/material/Box'


interface Props {
    loading: boolean
    loader: React.ReactNode
    subtitle: string | null
    dense?: boolean
}

export default function ListItemSubtitle(props: Props) {

    return (
        <Box
            component='span'
            lineHeight={props.dense ? '16px' : '18px'}
            fontSize={props.dense ? '12px' : '14px'}
            fontWeight='400'
            minWidth='0'
            marginBottom='0!important'
            marginRight='0!important'
            color='#A8A8A8'
            position='relative'
            display='block'
            maxWidth='100%'
            marginLeft='0!important'
            marginTop='0!important'
            sx={{
                overflowY: 'visible',
                wordWrap: 'break-word',
                overflowX: 'visible',
                whiteSpace: 'pre-line',
                wordBreak: 'break-word',
            }}
        >
            <Box
                component='span'
                display='block'
                maxWidth='100%'
                sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflowX: 'hidden',
                    overflowY: 'hidden',
                }}
            >
                {props.loading ? props.loader : props.subtitle}
            </Box>
        </Box>
    )
}