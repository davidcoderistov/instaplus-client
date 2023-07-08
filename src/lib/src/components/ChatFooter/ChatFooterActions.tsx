import { useRef, useCallback } from 'react'
import Box from '@mui/material/Box'
import Button from '../Button'
import { useSnackbar } from 'notistack'


interface Props {
    isTyping: boolean
    isReplying: boolean

    onSendMessage(): void

    onSendLike(): void

    onUploadFile(file: File): void
}

export default function ChatFooterAction(props: Props) {

    const { enqueueSnackbar } = useSnackbar()

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleChangeFile = useCallback((event) => {
        const file: File | null = event.target.files[0]
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
            props.onUploadFile(file)
        } else {
            enqueueSnackbar('You can upload photos and videos only', {
                variant: 'error', anchorOrigin: { horizontal: 'right', vertical: 'bottom' }, autoHideDuration: 3000,
            })
        }
        event.target.value = null
    }, [props.onUploadFile, enqueueSnackbar])

    const handleClickUploadFile = () => {
        fileInputRef.current?.click()
    }

    return props.isTyping ? (
        <Button
            variant='primary'
            text='Send'
            onClick={props.onSendMessage}
        />
    ) : (
        <Box
            component='div'
            display='flex'
        >
            {!props.isReplying && (
                <Box
                    component='div'
                    paddingBottom='8px'
                    paddingLeft='8px'
                    justifyContent='center'
                    bgcolor='transparent'
                    marginTop='0'
                    marginBottom='0'
                    boxSizing='border-box'
                    display='flex'
                    alignItems='center'
                    paddingTop='8px'
                    paddingRight='8px'
                    marginLeft='0'
                    textAlign='inherit'
                    marginRight='0'
                    sx={{
                        touchAction: 'manipulation',
                        borderRightStyle: 'none',
                        borderLeft: '0',
                        cursor: 'pointer',
                        borderBottomStyle: 'none',
                        borderTopStyle: 'none',
                        borderRight: '0',
                        borderBottom: '0',
                        borderTop: '0',
                    }}
                    onClick={handleClickUploadFile}
                >
                    <Box
                        component='div'
                        justifyContent='center'
                        flexDirection='column'
                        display='flex'
                        alignItems='center'
                    >
                        <input
                            ref={fileInputRef}
                            type='file'
                            accept='image/*,video/*'
                            onChange={handleChangeFile}
                            style={{ display: 'none' }}
                        />
                        <svg
                            aria-label='Add Photo or Video'
                            style={{
                                position: 'relative',
                                display: 'block',
                            }}
                            color='rgb(245, 245, 245)'
                            fill='rgb(245, 245, 245)'
                            height='24'
                            role='img'
                            viewBox='0 0 24 24'
                            width='24'>
                            <title>Add Photo or Video</title>
                            <path
                                d='M6.549 5.013A1.557 1.557 0 1 0 8.106 6.57a1.557 1.557 0 0 0-1.557-1.557Z'
                                fillRule='evenodd' />
                            <path
                                d='m2 18.605 3.901-3.9a.908.908 0 0 1 1.284 0l2.807 2.806a.908.908 0 0 0 1.283 0l5.534-5.534a.908.908 0 0 1 1.283 0l3.905 3.905'
                                fill='none' stroke='currentColor'
                                strokeLinejoin='round'
                                strokeWidth='2' />
                            <path
                                d='M18.44 2.004A3.56 3.56 0 0 1 22 5.564h0v12.873a3.56 3.56 0 0 1-3.56 3.56H5.568a3.56 3.56 0 0 1-3.56-3.56V5.563a3.56 3.56 0 0 1 3.56-3.56Z'
                                fill='none' stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2' />
                        </svg>
                    </Box>
                </Box>
            )}
            <Box
                component='div'
                paddingBottom='8px'
                paddingLeft='8px'
                justifyContent='center'
                bgcolor='transparent'
                marginTop='0'
                marginBottom='0'
                boxSizing='border-box'
                display='flex'
                alignItems='center'
                paddingTop='8px'
                paddingRight='8px'
                marginLeft='0'
                textAlign='inherit'
                marginRight='0'
                sx={{
                    touchAction: 'manipulation',
                    borderRightStyle: 'none',
                    borderLeft: '0',
                    cursor: 'pointer',
                    borderBottomStyle: 'none',
                    borderTopStyle: 'none',
                    borderRight: '0',
                    borderBottom: '0',
                    borderTop: '0',
                }}
                onClick={props.onSendLike}
            >
                <Box
                    component='div'
                    justifyContent='center'
                    flexDirection='column'
                    display='flex'
                    alignItems='center'
                >
                    <svg aria-label='Like'
                         style={{
                             position: 'relative',
                             display: 'block',
                         }}
                         color='rgb(245, 245, 245)'
                         fill='rgb(245, 245, 245)'
                         height='24'
                         role='img'
                         viewBox='0 0 24 24'
                         width='24'>
                        <title>Like</title>
                        <path
                            d='M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z' />
                    </svg>
                </Box>
            </Box>
        </Box>
    )
}