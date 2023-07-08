import React, { useState } from 'react'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { ChatBubble } from '@mui/icons-material'


interface Props {
    id: string | number
    photoUrl: string | null
    multiple?: true
    video?: true
    reel?: true
    viewsCount?: number | string
    showComments?: true
    commentsCount?: number | string

    onClick(id: string | number): void
}

export default function MediaItem(props: Props) {

    const mw736 = useMediaQuery('(min-width:736px)')

    const showPhoto = !!props.photoUrl
    const showCommentsCount = showPhoto && props.showComments && props.commentsCount !== undefined
    const showReelViews = showPhoto && props.reel && props.viewsCount !== undefined

    const [hovered, setHovered] = useState(false)

    const handleMouseEnter = () => {
        if (showCommentsCount) {
            setHovered(true)
        }
    }

    const handleMouseLeave = () => {
        if (showCommentsCount) {
            setHovered(false)
        }
    }

    const handleClickItem = () => {
        if (props.photoUrl) {
            props.onClick(props.id)
        }
    }

    return (
        <Box
            component='div'
            maxHeight='100%'
            maxWidth='100%'
            flexBasis='100%'
            bgcolor='#000000'
            flexGrow='1'
            justifyContent='center'
            overflow='hidden'
            flexShrink='1'
            display='flex'
            flexDirection='column'
            position='relative'
            border='0'
            sx={{
                cursor: props.photoUrl ? 'pointer' : 'default',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClickItem}
        >
            <Box
                component='div'
                padding='0'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                flexShrink='0'
                alignItems='stretch'
                position='relative'
                margin='0'
                border='0'
                sx={{ verticalAlign: 'baseline' }}
            >
                <Box
                    component='div'
                    display='block'
                >
                    <Box
                        component='div'
                        maxHeight='inherit'
                        bgcolor={showPhoto ? '#202020' : 'transparent'}
                        display='block'
                        width='100%'
                        position='relative'
                    >
                        <Box
                            component='div'
                            display='block'
                            position='relative'
                            overflow='hidden'
                            paddingBottom='100%'
                        >
                            {showPhoto ? (
                                <img
                                    alt='Picture'
                                    style={{
                                        objectFit: 'cover',
                                        left: '0',
                                        width: '100%',
                                        userSelect: 'none',
                                        height: '100%',
                                        top: '0',
                                        position: 'absolute',
                                        border: '0',
                                        overflowClipMargin: 'content-box',
                                        overflow: 'clip',
                                    }}
                                    src={props.photoUrl}
                                />
                            ) : (
                                <Skeleton
                                    variant='rounded'
                                    height='100%'
                                    width='100%'
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundColor: '#202020',
                                        borderRadius: '8px',
                                    }} />
                            )}
                        </Box>
                    </Box>
                    {showPhoto && (props.multiple || props.video) && (
                        <Box
                            component='div'
                            margin={mw736 ? '15px 15px 0 0' : '5px 5px 0 0'}
                            alignItems='flex-end'
                            border='0'
                            bottom='0'
                            boxSizing='border-box'
                            display='flex'
                            flexDirection='column'
                            fontSize='100%'
                            justifyContent='flex-start'
                            left='0'
                            padding='0'
                            position='absolute'
                            right='0'
                            top='0'
                            sx={{
                                pointerEvents: 'none',
                                verticalAlign: 'baseline',
                            }}
                        >
                            {props.multiple && (
                                <svg
                                    aria-label='Carousel'
                                    style={{
                                        position: 'relative',
                                        display: 'block',
                                    }}
                                    color='rgb(255, 255, 255)'
                                    fill='rgb(255, 255, 255)'
                                    height='24'
                                    role='img'
                                    viewBox='0 0 48 48'
                                    width='24'
                                >
                                    <title>Carousel</title>
                                    <path
                                        d='M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z' />
                                </svg>
                            )}
                            {props.video && (
                                <svg
                                    aria-label='Reel'
                                    style={{
                                        position: 'relative',
                                        display: 'block',
                                    }}
                                    color='rgb(255, 255, 255)'
                                    fill='rgb(255, 255, 255)'
                                    height='24'
                                    role='img'
                                    viewBox='0 0 24 24'
                                    width='24'
                                >
                                    <title>Reel</title>
                                    <path
                                        d='m12.823 1 2.974 5.002h-5.58l-2.65-4.971c.206-.013.419-.022.642-.027L8.55 1Zm2.327 0h.298c3.06 0 4.468.754 5.64 1.887a6.007 6.007 0 0 1 1.596 2.82l.07.295h-4.629L15.15 1Zm-9.667.377L7.95 6.002H1.244a6.01 6.01 0 0 1 3.942-4.53Zm9.735 12.834-4.545-2.624a.909.909 0 0 0-1.356.668l-.008.12v5.248a.91.91 0 0 0 1.255.84l.109-.053 4.545-2.624a.909.909 0 0 0 .1-1.507l-.1-.068-4.545-2.624Zm-14.2-6.209h21.964l.015.36.003.189v6.899c0 3.061-.755 4.469-1.888 5.64-1.151 1.114-2.5 1.856-5.33 1.909l-.334.003H8.551c-3.06 0-4.467-.755-5.64-1.889-1.114-1.15-1.854-2.498-1.908-5.33L1 15.45V8.551l.003-.189Z'
                                        fillRule='evenodd' />
                                </svg>
                            )}
                        </Box>
                    )}
                    {showReelViews && (
                        <Box
                            component='div'
                            borderRadius='0'
                            bgcolor='transparent'
                            boxSizing='border-box'
                            display='flex'
                            alignItems='center'
                            marginBottom='16px'
                            flexDirection='row'
                            justifyContent='flex-start'
                            bottom='0'
                            marginLeft='16px'
                            position='absolute'
                            sx={{
                                overflowY: 'visible',
                                overflowX: 'visible',
                            }}
                        >
                            <Box
                                component='div'
                                borderRadius='0'
                                bgcolor='transparent'
                                flexDirection='column'
                                boxSizing='border-box'
                                display='flex'
                                flexShrink='0'
                                alignItems='stretch'
                                alignSelf='auto'
                                justifyContent='flex-start'
                                position='relative'
                                marginRight='8px'
                                flexGrow='0'
                                sx={{
                                    overflowY: 'visible',
                                    overflowX: 'visible',
                                }}
                            >
                                <svg
                                    aria-label='Play count icon'
                                    style={{ display: 'block', position: 'relative' }}
                                    color='rgb(255, 255, 255)'
                                    fill='rgb(255, 255, 255)'
                                    height='16'
                                    role='img'
                                    viewBox='0 0 24 24'
                                    width='16'
                                >
                                    <title>Play count icon</title>
                                    <path
                                        d='M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z' />
                                </svg>
                            </Box>
                            <Box
                                component='span'
                                lineHeight='20px'
                                fontSize='16px'
                                minWidth='0'
                                color='#FFFFFF'
                                margin='0!important'
                                fontWeight='600'
                                position='relative'
                                display='block'
                                maxWidth='100%'
                                sx={{
                                    overflowY: 'visible',
                                    overflowX: 'visible',
                                    wordWrap: 'break-word',
                                    whiteSpace: 'pre-line',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {props.viewsCount}
                            </Box>
                        </Box>
                    )}
                    {showCommentsCount && hovered && (
                        <Box
                            component='div'
                            bottom='0'
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                            left='0'
                            position='absolute'
                            right='0'
                            top='0'
                            sx={{
                                background: '#0000004d',
                            }}
                        >
                            <Box
                                component='div'
                                alignItems='center'
                                border='0'
                                display='flex'
                                fontSize='100%'
                                height='100%'
                                justifyContent='center'
                                margin='0'
                                padding='0'
                                width='100%'
                                sx={{
                                    verticalAlign: 'baseline',
                                }}
                            >
                                <Box
                                    component='div'
                                    marginRight='0'
                                    border='0'
                                    display='inline-flex'
                                    flexDirection='row-reverse'
                                    fontSize='100%'
                                    margin='0'
                                    padding='0'
                                    sx={{
                                        verticalAlign: 'baseline',
                                    }}
                                >
                                    <Box
                                        component='span'
                                        lineHeight='20px'
                                        fontSize='16px'
                                        minWidth='0'
                                        color='#FFFFFF'
                                        margin='0!important'
                                        fontWeight='700'
                                        position='relative'
                                        display='block'
                                        maxWidth='100%'
                                        sx={{
                                            overflowY: 'visible',
                                            wordWrap: 'break-word',
                                            overflowX: 'visible',
                                            whiteSpace: 'pre-line',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        {props.commentsCount}
                                    </Box>
                                    <Box
                                        component='span'
                                        border='0'
                                        fontSize='100%'
                                        marginRight='7px'
                                        marginTop='2px'
                                        padding='0'
                                        sx={{
                                            verticalAlign: 'baseline',
                                        }}
                                    >
                                        <ChatBubble sx={{ fontSize: '20px' }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}