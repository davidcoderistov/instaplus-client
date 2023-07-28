import React, { useEffect, useRef } from 'react'
import { useClickOutside } from '../../hooks'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import IconButton from '@mui/material/IconButton'
import { Close } from '@mui/icons-material'
import ImagePreview from '../ImagePreview'


interface Props {
    open: boolean
    photoUrl: string

    onClose(): void
}

export default function ImagePreviewModal(props: Props) {

    const imgRef = useRef<Node | null>(null)

    useEffect(() => {
        const handleKeyPress = (event: React.KeyboardEvent) => {
            if (event.key === 'Escape') {
                props.onClose()
            }
        }
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    useClickOutside(imgRef, props.onClose)

    return (

        <Backdrop
            sx={{ zIndex: 9999 }}
            open={props.open}
        >
            <Box
                component='div'
                position='absolute'
                boxSizing='border-box'
                height='100%'
                width='100%'
                display='block'
            >
                <Box
                    component='div'
                    height='100%'
                    width='100%'
                    position='relative'
                    display='block'
                >
                    <Box
                        component='div'
                        zIndex='3'
                        display='block'
                        overflow='hidden'
                        position='absolute'
                        margin='10px'
                        right='0'
                        sx={{ opacity: '1' }}
                    >
                        <IconButton sx={{ color: '#FFFFFF' }}>
                            <Close />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Box
                component='div'
                width='100%'
                height='100%'
                justifyContent='center'
                minWidth='0'
                boxSizing='border-box'
                display='flex'
                minHeight='0'
                alignItems='flex-start'
                sx={{
                    pointerEvents: 'none',
                }}
            >
                <Box
                    component='div'
                    justifyContent='center'
                    width='100%'
                    flexDirection='column'
                    margin='0'
                    display='flex'
                    alignItems='center'
                    height='100%'
                    position='relative'
                    zIndex='0'
                    boxSizing='content-box'
                    overflow='hidden'
                    sx={{
                        pointerEvents: 'none',
                        outline: 'none',
                    }}
                >
                    <Box
                        component='div'
                        width='100%'
                        margin='auto'
                        maxHeight='calc(100vh-40px)'
                        maxWidth='calc(100%-128px)'
                        overflow='hidden'
                        sx={{
                            borderBottomRightRadius: '4px',
                            borderTopRightRadius: '4px',
                            borderTopLeftRadius: '4px',
                            borderBottomLeftRadius: '4px',
                        }}
                        display='block'
                    >
                        <Box
                            component='div'
                            display='flex'
                            flexDirection='column'
                            height='100%'
                            maxWidth='100%'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <ImagePreview
                                ref={imgRef}
                                visible
                                photoUrl={props.photoUrl}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Backdrop>
    )
}