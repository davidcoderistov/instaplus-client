import React, { useCallback } from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'


interface Props {
    message: string
    isUploadingPhoto: boolean

    onChange(message: string): void

    onSendMessage(): void
}

export default function ChatFooterTextInput({ message, isUploadingPhoto, onChange, onSendMessage }: Props) {

    const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }, [onChange])

    const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            if (message.trim().length > 0) {
                onSendMessage()
            }
        }
    }, [onSendMessage, message])

    return (
        <Box
            component='div'
            marginRight='4px'
            bgcolor='transparent'
            minWidth='0'
            flexDirection='column'
            boxSizing='border-box'
            display='flex'
            minHeight='0'
            position='static'
            alignItems='stretch'
            alignSelf='auto'
            justifyContent='flex-start'
            flexGrow='1'
            marginLeft='8px'
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
                component='div'
                position='relative'
                display='block'
            >
                <InputBase
                    value={message}
                    onChange={handleChangeMessage}
                    onKeyPress={handleKeyPress}
                    disabled={isUploadingPhoto}
                    sx={{
                        '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                            display: 'none',
                        },
                        '& input': {
                            MozAppearance: 'textfield',
                        },
                        color: '#FFFFFF',
                        '&.MuiInputBase-root.Mui-disabled': {
                            color: 'red',
                        },
                        '&.Mui-disabled': { '.MuiInputBase-input': { 'WebkitTextFillColor': '#7A7C7F' } },
                    }}
                    placeholder='Message...'
                    fullWidth
                />
            </Box>
        </Box>
    )
}

