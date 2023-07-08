import React from 'react'
import Box from '@mui/material/Box'


interface Props {
    name: string
    isActive: boolean
    isCondensed: boolean
    isBordered?: boolean
    icon: React.ReactNode
    activeIcon: React.ReactNode
    onClick?: () => void
}

export default function AppDrawerItem(props: Props) {

    return (
        <Box
            component='div'
            display='block'
            height='52px'
        >
            <Box
                component='div'
                display='block'
                position='relative'
            >
                <Box
                    component='span'
                    maxHeight='inherit'
                    maxWidth='inherit'
                    height='inherit'
                    minHeight='inherit'
                    width='inherit'
                    minWidth='inherit'
                >
                    <Box
                        component='div'
                        display='block'
                        position='relative'
                    >
                        <Box
                            component='div'
                            paddingRight='12px'
                            marginTop='4px'
                            alignItems='center'
                            paddingTop='12px'
                            marginBottom='4px'
                            width='100%'
                            flexDirection='row'
                            paddingLeft='12px'
                            paddingBottom='12px'
                            borderRadius='8px'
                            boxSizing='border-box'
                            display='flex'
                            sx={{
                                cursor: 'pointer',
                                ...props.isBordered && { border: '1px solid #DBDBDB' },
                                '&:hover': {
                                    bgcolor: '#1A1A1A',
                                },
                            }}
                            onClick={props.onClick}
                        >
                            <Box
                                component='div'
                                display='block'
                            >
                                <Box
                                    component='div'
                                    borderRadius='0'
                                    bgcolor='transparent'
                                    flexDirection='column'
                                    boxSizing='border-box'
                                    display='flex'
                                    alignItems='stretch'
                                    justifyContent='flex-start'
                                    position='relative'
                                    sx={{
                                        overflowY: 'visible',
                                        overflowX: 'visible',
                                    }}
                                >
                                    <Box
                                        component='div'
                                        height='24px'
                                        width='24px'
                                        boxSizing='border-box'
                                        display='block'
                                    >
                                        {props.isActive ? props.activeIcon : props.icon}
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                component='div'
                                display='flex'
                                height='24px'
                                width='fit-content'
                                boxSizing='border-box'
                                alignItems='center'
                                paddingLeft='16px'
                                sx={{
                                    opacity: 1,
                                    overflowX: 'visible',
                                    overflowY: 'visible',
                                }}
                            >
                                <Box
                                    component='div'
                                    display='block'
                                    width='100%'
                                >
                                    <Box
                                        component='div'
                                        display='block'
                                        overflow='hidden'
                                        color='#F5F5F5'
                                        fontWeight={props.isActive ? '700' : '400'}
                                        fontSize='15px'
                                        lineHeight='24px'
                                        margin='-6px 0 -6px'
                                        sx={{
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {!props.isCondensed && props.name}
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