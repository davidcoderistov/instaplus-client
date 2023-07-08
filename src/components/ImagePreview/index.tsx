import React from 'react'
import Box from '@mui/material/Box'


interface Props {
    visible: boolean
    photoUrl: string | null
    large?: boolean
    dense?: boolean
    leftSliderArrow?: React.ReactNode
    rightSliderArrow?: React.ReactNode
    slider?: React.ReactNode
}

export default function ImagePreview(props: Props) {

    return (
        <Box
            component='div'
            maxHeight={props.dense ? '470px' : '674px'}
            maxWidth={props.dense ? '470px' : '674px'}
            flexBasis={props.dense ? '470px' : '674px'}
            bgcolor='#000000'
            flexGrow='1'
            justifyContent='center'
            minHeight={props.large ? '640px' : '450px'}
            overflow='hidden'
            flexShrink='1'
            display={props.visible ? 'flex' : 'none'}
            flexDirection='column'
            position='relative'
            sx={{
                aspectRatio: 1,
                pointerEvents: 'auto',
            }}
        >
            <Box
                component='div'
                padding='0'
                margin='0'
                border='0'
                fontSize='100%'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                flexShrink='0'
                alignItems='stretch'
                position='relative'
                sx={{
                    touchAction: 'manipulation',
                    verticalAlign: 'baseline',
                }}
            >
                <Box
                    component='div'
                    display='block'
                >
                    <Box
                        component='div'
                        position='relative'
                        maxHeight='inherit'
                        display='block'
                        sx={{ cursor: props.photoUrl ? 'pointer' : 'default' }}
                    >
                        <Box
                            component='div'
                            bgcolor='#262626'
                            display='block'
                            width='100%'
                            position='relative'
                            maxHeight='inherit'
                        >
                            <Box
                                component='div'
                                display='block'
                                position='relative'
                                overflow='hidden'
                                paddingBottom='100%'
                            >
                                {props.photoUrl && (
                                    <img
                                        alt='Post photo'
                                        src={props.photoUrl}
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
                                    />
                                )}
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