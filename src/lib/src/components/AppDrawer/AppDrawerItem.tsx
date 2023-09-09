import React from 'react'
import Box from '@mui/material/Box'
import { bindTrigger, PopupState } from 'material-ui-popup-state/hooks'


interface Props {
    name: string
    isActive: boolean
    isCondensed: boolean
    isBordered?: boolean
    count?: number
    icon: React.ReactNode
    activeIcon: React.ReactNode
    popupState?: PopupState
    onClick?: (event: React.MouseEvent) => void
}

export default function AppDrawerItem(props: Props) {

    const popoverProps = props.popupState ? bindTrigger(props.popupState) : {}

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
                        {...popoverProps}
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
                                    {props.count && props.count > 0 && (
                                        <Box
                                            component='div'
                                            display='block'
                                            top='-7px'
                                            lineHeight='18px!important'
                                            zIndex='1'
                                            right='-7px'
                                            position='absolute'
                                        >
                                            <Box
                                                component='div'
                                                borderRadius='50px'
                                                border='1.5px solid #000000'
                                                height='18px'
                                                display='flex'
                                                justifyContent='center'
                                                alignItems='center'
                                                maxWidth='36px'
                                                minWidth='18px'
                                                bgcolor='#FF3040'
                                            >
                                                <Box
                                                    component='span'
                                                    paddingTop='3px'
                                                    color='#FFFFFF'
                                                    fontWeight='400'
                                                    paddingBottom='3px'
                                                    paddingLeft='5px'
                                                    fontSize='0.6875rem'
                                                    paddingRight='5px'
                                                >
                                                    {props.count}
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
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