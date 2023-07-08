import { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import ChatFooterEmojiPicker from './ChatFooterEmojiPicker'
import ChatFooterTextInput from './ChatFooterTextInput'
import ChatFooterActions from './ChatFooterActions'


interface Props {
    isReplying: boolean

    onSendMessage(message: string): void

    onSendLike(): void

    onUploadFile(file: File): void
}

export default function ChatFooter({ isReplying, onSendMessage, onSendLike, onUploadFile }: Props) {

    const [message, setMessage] = useState('')

    const handlePickEmoji = useCallback((emoji: string) => {
        setMessage(message => `${message}${emoji}`)
    }, [])

    const handleSendMessage = useCallback(() => {
        onSendMessage(message)
        setMessage('')
    }, [message, onSendMessage])

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
                    onPickEmoji={handlePickEmoji} />
                <ChatFooterTextInput
                    message={message}
                    onChange={setMessage}
                    onSendMessage={handleSendMessage} />
                <ChatFooterActions
                    isTyping={message.length > 0}
                    isReplying={isReplying}
                    onSendMessage={handleSendMessage}
                    onSendLike={onSendLike}
                    onUploadFile={onUploadFile} />
            </Box>
        </Box>
    )
}