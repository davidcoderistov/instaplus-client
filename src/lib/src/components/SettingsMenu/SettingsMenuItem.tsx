import React from 'react'
import Box from '@mui/material/Box'


interface Props {
    title: string
    icon: React.ReactNode

    onClick(): void
}

export default function SettingsMenuItem(props: Props) {

    return (
        <Box
            component='div'
            width='100%'
            minWidth='0'
            minHeight='0'
            boxSizing='border-box'
            position='relative'
            maxWidth='100%'
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    bgcolor: '#3C3C3C',
                    borderRadius: '8px',
                },
            }}
            onClick={props.onClick}
        >
            <Box
                component='div'
                padding='16px'
                bgcolor='transparent'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                position='static'
                alignItems='stretch'
                justifyContent='flex-start'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                }}
            >
                <Box
                    component='div'
                    justifyContent='center'
                    minWidth='0'
                    flexDirection='column'
                    boxSizing='border-box'
                    display='flex'
                    alignItems='stretch'
                    position='relative'
                    flexGrow='1'
                >
                    <Box
                        component='div'
                        flexWrap='nowrap'
                        boxSizing='border-box'
                        display='flex'
                        alignItems='center'
                        flexShrink='0'
                        justifyContent='space-between'
                        flexDirection='row'
                        position='relative'
                    >
                        <Box
                            component='div'
                            minWidth='0'
                            flexDirection='column'
                            alignSelf='center'
                            boxSizing='border-box'
                            display='flex'
                            flexShrink='0'
                            position='relative'
                            maxWidth='100%'
                        >
                            <Box
                                component='div'
                                marginRight='12px'
                                bgcolor='transparent'
                                boxSizing='border-box'
                                display='flex'
                                flexDirection='column'
                                flexShrink='0'
                                position='static'
                                alignItems='stretch'
                                alignSelf='auto'
                                justifyContent='flex-start'
                                flexGrow='0'
                                sx={{
                                    overflowY: 'visible',
                                    overflowX: 'visible',
                                }}
                            >
                                {props.icon}
                            </Box>
                        </Box>
                        <Box
                            component='div'
                            flexShrink='1'
                            minWidth='0'
                            flexBasis='auto'
                            boxSizing='border-box'
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                            flexDirection='row'
                            position='relative'
                            flexGrow='1'
                            flexWrap='wrap'
                        >
                            <Box
                                component='div'
                                minWidth='0'
                                flexDirection='column'
                                boxSizing='border-box'
                                display='flex'
                                flexShrink='0'
                                position='relative'
                                flexGrow='1'
                                maxWidth='100%'
                            >
                                <Box
                                    component='div'
                                    bgcolor='transparent'
                                    minWidth='0'
                                    flexDirection='column'
                                    boxSizing='border-box'
                                    display='flex'
                                    minHeight='0'
                                    position='static'
                                    alignSelf='auto'
                                    justifyContent='flex-start'
                                    flexGrow='1'
                                    alignItems='flex-start'
                                    sx={{
                                        overflowY: 'visible',
                                        overflowX: 'visible',
                                    }}
                                >
                                    <Box
                                        component='span'
                                        lineHeight='19px'
                                        fontSize='15px'
                                        fontWeight='400'
                                        minWidth='0'
                                        color='#F5F5F5'
                                        position='relative'
                                        maxWidth='100%'
                                        sx={{
                                            wordWrap: 'break-word',
                                            whiteSpace: 'pre-line',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        <Box
                                            component='span'
                                            overflow='hidden'
                                            display='block'
                                            maxWidth='100%'
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {props.title}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}