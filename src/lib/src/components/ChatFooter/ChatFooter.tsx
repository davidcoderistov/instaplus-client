import { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import ChatFooterEmojiPicker from './ChatFooterEmojiPicker'
import ChatFooterTextInput from './ChatFooterTextInput'
import ChatFooterActions from './ChatFooterActions'


interface Props {
    chatId: string | number
    isReplying: boolean
    isUploadingPhoto: boolean

    onSendMessage(chatId: string | number, message: string): void

    onSendLike(chatId: string | number): void

    onUploadFile(chatId: string | number, file: File): void
}

export default function ChatFooter({
                                       chatId,
                                       isReplying,
                                       isUploadingPhoto,
                                       onSendMessage,
                                       onSendLike,
                                       onUploadFile,
                                   }: Props) {

    const [message, setMessage] = useState('')

    const handlePickEmoji = useCallback((emoji: string) => {
        setMessage(message => `${message}${emoji}`)
    }, [])

    const handleSendMessage = useCallback(() => {
        onSendMessage(chatId, message)
        setMessage('')
    }, [message, onSendMessage, chatId])

    return (
        <Box
            component='div'
            marginTop='16px'
            marginRight='16px'
            flexDirection='column'
            display='flex'
            marginBottom='16px'
            alignItems='stretch'
            marginLeft='16px'
            sx={{
                borderLeftWidth: '1px',
                borderRightStyle: 'solid',
                borderBottomWidth: '1px',
                borderRightWidth: '1px',
                borderLeftColor: '#363636',
                borderBottomLeftRadius: '22px',
                borderTopRightRadius: '22px',
                borderLeftStyle: 'solid',
                borderTopColor: '#363636',
                borderBottomStyle: 'solid',
                borderTopLeftRadius: '22px',
                borderBottomColor: '#363636',
                borderBottomRightRadius: '22px',
                borderRightColor: '#363636',
                borderTopWidth: '1px',
                borderTopStyle: 'solid',
            }}
        >
            <Box
                component='div'
                paddingLeft='11px'
                display='flex'
                alignItems='center'
                paddingRight='16px'
                minHeight='44px'
            >
                <ChatFooterEmojiPicker
                    onPickEmoji={handlePickEmoji}
                    isUploadingPhoto={isUploadingPhoto} />
                <ChatFooterTextInput
                    message={message}
                    isUploadingPhoto={isUploadingPhoto}
                    onChange={setMessage}
                    onSendMessage={handleSendMessage} />
                <ChatFooterActions
                    chatId={chatId}
                    isTyping={message.length > 0}
                    isReplying={isReplying}
                    isUploadingPhoto={isUploadingPhoto}
                    onSendMessage={handleSendMessage}
                    onSendLike={onSendLike}
                    onUploadFile={onUploadFile} />
            </Box>
        </Box>
    )
}