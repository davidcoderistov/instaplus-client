import React from 'react'
import Box from '@mui/material/Box'
import Button from '../Button'
import FileInput from '../FileInput'


interface Props {
    onUploadFiles(files: File[]): void
}

export default function UploadMedia(props: Props) {

    return (
        <Box
            component='div'
            height='calc(100% - 73px)'
            width='100%'
            padding='24px'
            borderRadius='0'
            justifyContent='center'
            bgcolor='transparent'
            flexDirection='column'
            boxSizing='border-box'
            display='flex'
            alignItems='center'
            flexShrink='0'
            alignSelf='auto'
            position='relative'
            flexGrow='0'
            sx={{
                overflowY: 'visible',
                overflowX: 'visible',
            }}
        >
            <svg
                aria-label='Icon to represent media such as images or videos'
                style={{ display: 'block', position: 'relative' }}
                color='rgb(245, 245, 245)'
                fill='rgb(245, 245, 245)'
                height='77'
                role='img'
                viewBox='0 0 97.6 77.3'
                width='96'
            >
                <title>Icon to represent media such as images or videos</title>
                <path
                    d='M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z'
                    fill='currentColor' />
                <path
                    d='M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z'
                    fill='currentColor' />
                <path
                    d='M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z'
                    fill='currentColor' />
            </svg>
            <Box
                component='div'
                marginTop='16px'
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
                flexGrow='0'
                sx={{
                    overflowX: 'visible',
                    overflowY: 'visible',
                }}
            >
                <Box
                    component='span'
                    lineHeight='25px'
                    fontWeight='400'
                    minWidth='0'
                    margin='0!important'
                    color='#F5F5F5'
                    textAlign='center'
                    position='relative'
                    fontSize='20px'
                    display='block'
                    maxWidth='100%'
                    sx={{
                        overflowX: 'visible',
                        overflowY: 'visible',
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-line',
                        wordBreak: 'break-word',
                    }}
                >
                    Upload photos here
                </Box>
            </Box>
            <Box
                component='div'
                marginTop='24px'
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
                flexGrow='0'
                sx={{
                    overflowX: 'visible',
                    overflowY: 'visible',
                }}
            >
                <Button
                    variant='primary'
                    text={
                        <>
                            Select from computer
                            <FileInput
                                multiple
                                onUploadFiles={props.onUploadFiles} />
                        </>
                    }
                    onClick={() => {
                    }}
                    contained
                />
            </Box>
        </Box>
    )
}