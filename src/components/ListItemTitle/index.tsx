import React, { useCallback } from 'react'
import Box from '@mui/material/Box'


interface Props {
    loading: boolean
    loader: React.ReactNode | null
    title: string | React.ReactNode | null

    onClick?(): void
}

export default function ListItemTitle(props: Props) {

    const handleClick = useCallback(() => {
        if (!props.loading && !!props.onClick) {
            props.onClick()
        }
    }, [props.loading, props.onClick])

    return (
        <Box
            component='span'
            lineHeight='18px'
            fontSize='14px'
            minWidth='0'
            marginBottom='0!important'
            color='#F5F5F5'
            marginRight='0!important'
            fontWeight='600'
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
                <Box
                    component='div'
                    alignContent='stretch'
                    bgcolor='transparent'
                    boxSizing='border-box'
                    display='flex'
                    flexShrink='0'
                    position='static'
                    alignItems='stretch'
                    flexDirection='row'
                    alignSelf='auto'
                    justifyContent='flex-start'
                    flexGrow='0'
                    sx={{
                        overflowY: 'visible',
                        borderBottomLeftRadius: '0',
                        borderBottomRightRadius: '0',
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                        overflowX: 'visible',
                    }}
                >
                    <Box
                        component='div'
                        display='inline'
                        paddingLeft='0'
                        bgcolor='transparent'
                        paddingTop='0'
                        marginTop='0'
                        borderLeft='0'
                        marginBottom='0'
                        boxSizing='border-box'
                        paddingRight='0'
                        marginLeft='0'
                        borderRight='0'
                        paddingBottom='0'
                        textAlign='inherit'
                        marginRight='0'
                        borderBottom='0'
                        borderTop='0'
                        sx={{
                            touchAction: 'manipulation',
                            cursor: props.loading ? 'default' : 'pointer',
                        }}
                        onClick={handleClick}
                    >
                        <Box
                            component='div'
                            alignContent='stretch'
                            bgcolor='transparent'
                            boxSizing='border-box'
                            display='flex'
                            flexShrink='0'
                            position='static'
                            alignItems='stretch'
                            flexDirection='row'
                            alignSelf='auto'
                            justifyContent='flex-start'
                            flexGrow='0'
                            sx={{
                                overflowY: 'visible',
                                borderBottomLeftRadius: '0',
                                borderBottomRightRadius: '0',
                                overflowX: 'visible',
                                borderTopLeftRadius: '0',
                                borderTopRightRadius: '0',
                            }}
                        >
                            <Box
                                component='span'
                                lineHeight='18px'
                                fontSize='14px'
                                display='inline'
                                minWidth='0'
                                marginBottom='0!important'
                                color='#F5F5F5'
                                marginRight='0!important'
                                fontWeight='600'
                                maxWidth='100%'
                                marginLeft='0!important'
                                marginTop='0!important'
                                sx={{
                                    wordWrap: 'break-word',
                                    whiteSpace: 'pre-line',
                                    wordBreak: 'break-word',
                                }}
                            >
                                <Box
                                    component='div'
                                    alignContent='stretch'
                                    bgcolor='transparent'
                                    boxSizing='border-box'
                                    display='flex'
                                    alignItems='center'
                                    flexShrink='0'
                                    position='static'
                                    flexDirection='row'
                                    alignSelf='auto'
                                    justifyContent='flex-start'
                                    flexGrow='0'
                                    sx={{
                                        overflowY: 'visible',
                                        borderBottomLeftRadius: '0',
                                        borderBottomRightRadius: '0',
                                        overflowX: 'visible',
                                        borderTopLeftRadius: '0',
                                        borderTopRightRadius: '0',
                                    }}
                                >
                                    {props.loading ? props.loader : props.title}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}