import React, { useState, useCallback, useRef } from 'react'
import Box from '@mui/material/Box'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { useClickOutside } from '../../hooks'


interface Props {
    onPickEmoji(emoji: string): void
}

const ChatFooterEmojiPicker = React.memo(({ onPickEmoji }: Props) => {

    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

    const emojiRef = useRef<Node | null>(null)
    const emojiBtnRef = useRef<Node | null>(null)

    useClickOutside(emojiRef, (target) => {
        if (!emojiPickerOpen || (emojiPickerOpen && !emojiBtnRef.current?.contains(target))) {
            setEmojiPickerOpen(false)
        }
    })

    const handleOpenEmojiPicker = (event: React.MouseEvent) => {
        setEmojiPickerOpen(emojiPickerOpen => !emojiPickerOpen)
        event.stopPropagation()
    }

    const handlePickEmoji = useCallback(({ emoji }: EmojiClickData) => {
        onPickEmoji(emoji)
    }, [onPickEmoji])

    return (
        <>
            {emojiPickerOpen && (
                <Box
                    ref={emojiRef}
                    component='div'
                    display='inline-block'
                    position='absolute'
                    zIndex='100'
                    bottom='70px'
                >
                    <EmojiPicker
                        theme='dark'
                        emojiStyle='native'
                        skinTonesDisabled
                        searchDisabled
                        previewConfig={{ showPreview: false }}
                        height='340px'
                        width='340px'
                        onEmojiClick={handlePickEmoji}
                    />
                </Box>
            )}
            <Box
                ref={emojiBtnRef}
                component='div'
                paddingBottom='4px'
                bgcolor='transparent'
                minWidth='0'
                flexBasis='auto'
                marginTop='0'
                marginBottom='0'
                boxSizing='border-box'
                display='inline-flex'
                minHeight='0'
                flexShrink='0'
                alignItems='stretch'
                flexDirection='row'
                position='relative'
                marginLeft='0'
                zIndex='0'
                paddingTop='4px'
                paddingLeft='4px'
                textAlign='inherit'
                paddingRight='4px'
                marginRight='0'
                sx={{
                    borderRightStyle: 'solid',
                    borderBottomColor: '#00000066',
                    borderLeftWidth: '0',
                    borderTopColor: '#00000066',
                    touchAction: 'manipulation',
                    borderRightWidth: '0',
                    borderRightColor: '#00000066',
                    borderTopWidth: '0',
                    borderTopRightRadius: 'inherit',
                    borderLeftColor: '#00000066',
                    borderLeftStyle: 'solid',
                    cursor: 'pointer',
                    outlineStyle: 'none',
                    borderBottomWidth: '0',
                    borderBottomStyle: 'solid',
                    borderTopLeftRadius: 'inherit',
                    borderBottomRightRadius: 'inherit',
                    borderBottomLeftRadius: 'inherit',
                    borderTopStyle: 'solid',
                }}
                onClick={handleOpenEmojiPicker}
            >
                <svg
                    aria-label='Choose an emoji'
                    style={{ position: 'relative', display: 'block' }}
                    color='rgb(245, 245, 245)'
                    fill='rgb(245, 245, 245)'
                    height='24' role='img'
                    viewBox='0 0 24 24'
                    width='24'>
                    <title>Choose an emoji</title>
                    <path
                        d='M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z' />
                </svg>
            </Box>
        </>
    )
})

export default ChatFooterEmojiPicker