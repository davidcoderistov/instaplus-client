import React from 'react'
import Box from '@mui/material/Box'
import ReactPlayer from 'react-player'
import { PlayArrow } from '@mui/icons-material'


interface Props {
    visible: boolean
    videoUrl: string | null
    isPlaying: boolean
    isMuted: boolean
    large?: boolean
    dense?: boolean
    leftSliderArrow?: React.ReactNode
    rightSliderArrow?: React.ReactNode
    slider?: React.ReactNode

    onPlay(): void

    onMute(): void
}

export default function VideoPreviewPlayer(props: Props) {

    return (
        <Box
            component='div'
            maxHeight='674px'
            maxWidth='379.125px'
            flexBasis='379.125px'
            bgcolor='#000000'
            flexGrow='1'
            justifyContent='center'
            minHeight={props.large ? '670px' : props.dense ? '545px' : '450px'}
            overflow='hidden'
            flexShrink='1'
            display={props.visible ? 'flex' : 'none'}
            flexDirection='column'
            position='relative'
            sx={{
                aspectRatio: 1080 / 1920,
                pointerEvents: 'auto',
            }}
        >
            <Box
                component='div'
                display='block'
            >
                <Box
                    component='div'
                    paddingBottom='177.778%'
                    position='relative'
                    display='block'
                >
                    <Box
                        component='div'
                        bgcolor='#000000'
                        width='100%'
                        height='100%'
                        position='absolute'
                        display='block'
                    >
                        <Box
                            component='div'
                            height='100%'
                            width='100%'
                            position='relative'
                            display='block'
                            zIndex='0'
                        >
                            <Box
                                component='div'
                                width='100%'
                                height='100%'
                                position='relative'
                                display='block'
                            >
                                <Box
                                    component='div'
                                    width='100%'
                                    height='100%'
                                    position='relative'
                                    display='block'
                                >
                                    <Box
                                        component='div'
                                        width='100%'
                                        height='100%'
                                        position='relative'
                                        display='block'
                                    >
                                        <ReactPlayer
                                            width='100%'
                                            height='100%'
                                            loop
                                            playing={props.isPlaying}
                                            muted={props.isMuted}
                                            url={props.videoUrl} />
                                        <Box
                                            component='div'
                                            width='100%'
                                            height='100%'
                                            top='0'
                                            position='absolute'
                                            display='block'
                                        >
                                            <Box
                                                component='div'
                                                right='0'
                                                boxSizing='border-box'
                                                bottom='0'
                                                left='0'
                                                top='0'
                                                position='absolute'
                                                display='block'
                                                sx={{
                                                    cursor: 'pointer',
                                                }}
                                                onClick={props.onPlay}
                                            >
                                                {!props.isPlaying && (
                                                    <Box
                                                        component='div'
                                                        top='50%'
                                                        left='50%'
                                                        marginLeft='-67px'
                                                        marginTop='-67px'
                                                        position='absolute'
                                                        display='block'
                                                    >
                                                        <PlayArrow sx={{
                                                            color: '#FFFFFF',
                                                            fontSize: 135,
                                                        }} />
                                                    </Box>
                                                )}
                                            </Box>
                                            <Box
                                                component='div'
                                                borderRadius='0'
                                                bgcolor='transparent'
                                                flexDirection='column'
                                                right='0'
                                                boxSizing='border-box'
                                                display='flex'
                                                alignItems='stretch'
                                                justifyContent='flex-start'
                                                bottom='0'
                                                position='absolute'
                                                sx={{
                                                    overflowY: 'visible',
                                                    overflowX: 'visible',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={props.onMute}
                                            >
                                                <Box
                                                    component='div'
                                                    borderRadius='50%'
                                                    padding='8px'
                                                    marginRight='16px'
                                                    flexDirection='column'
                                                    boxSizing='border-box'
                                                    display='flex'
                                                    marginBottom='28px'
                                                    bgcolor='#262626'
                                                    position='static'
                                                    alignItems='stretch'
                                                    justifyContent='flex-start'
                                                    sx={{
                                                        overflowY: 'visible',
                                                        overflowX: 'visible',
                                                    }}
                                                >
                                                    {props.isMuted ? (
                                                        <svg
                                                            aria-label='Audio is muted.'
                                                            style={{
                                                                position: 'relative',
                                                                display: 'block',
                                                            }}
                                                            color='rgb(255, 255, 255)'
                                                            fill='rgb(255, 255, 255)'
                                                            height='12'
                                                            role='img'
                                                            viewBox='0 0 48 48'
                                                            width='12'
                                                        >
                                                            <title>Audio is muted.</title>
                                                            <path
                                                                clipRule='evenodd'
                                                                d='M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z'
                                                                fillRule='evenodd' />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            aria-label='Audio is playing'
                                                            style={{
                                                                position: 'relative',
                                                                display: 'block',
                                                            }}
                                                            color='rgb(255, 255, 255)'
                                                            fill='rgb(255, 255, 255)'
                                                            height='12'
                                                            role='img'
                                                            viewBox='0 0 24 24'
                                                            width='12'
                                                        >
                                                            <title>Audio is playing</title>
                                                            <path
                                                                d='M16.636 7.028a1.5 1.5 0 1 0-2.395 1.807 5.365 5.365 0 0 1 1.103 3.17 5.378 5.378 0 0 1-1.105 3.176 1.5 1.5 0 1 0 2.395 1.806 8.396 8.396 0 0 0 1.71-4.981 8.39 8.39 0 0 0-1.708-4.978Zm3.73-2.332A1.5 1.5 0 1 0 18.04 6.59 8.823 8.823 0 0 1 20 12.007a8.798 8.798 0 0 1-1.96 5.415 1.5 1.5 0 0 0 2.326 1.894 11.672 11.672 0 0 0 2.635-7.31 11.682 11.682 0 0 0-2.635-7.31Zm-8.963-3.613a1.001 1.001 0 0 0-1.082.187L5.265 6H2a1 1 0 0 0-1 1v10.003a1 1 0 0 0 1 1h3.265l5.01 4.682.02.021a1 1 0 0 0 1.704-.814L12.005 2a1 1 0 0 0-.602-.917Z' />
                                                        </svg>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {props.leftSliderArrow}
            {props.rightSliderArrow}
            {props.slider}
        </Box>
    )
}