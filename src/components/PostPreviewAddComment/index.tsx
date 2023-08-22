import React, { forwardRef, useCallback, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react'
import Button from '../Button'
import { useClickOutside } from '../../hooks'


const EmojiPickerMemo = React.memo((props: { onEmojiClick(data: EmojiClickData): void }) => {

    return (
        <EmojiPicker
            theme={Theme.DARK}
            emojiStyle={EmojiStyle.NATIVE}
            skinTonesDisabled
            searchDisabled
            previewConfig={{ showPreview: false }}
            height='340px'
            width='340px'
            onEmojiClick={props.onEmojiClick}
        />
    )
})

interface Props {
    isPostingComment: boolean
    disabled?: boolean
    isReplying: boolean
    replyingUsername?: string | null

    onPostComment(comment: string): void

    onCancelReply(): void
}

const PostPreviewAddComment = forwardRef((props: Props, ref) => {

    const [comment, setComment] = useState('')

    const handleChangeComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            if (comment.trim().length > 0) {
                props.onPostComment(comment)
                setComment('')
            }
        }
    }

    const handleClickPostComment = () => {
        props.onPostComment(comment)
        setComment('')
    }

    const [emojiPickerRendered, setEmojiPickerRendered] = useState(false)
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

    const emojiRef = useRef<Node | null>(null)
    const emojiBtnRef = useRef<Node | null>(null)

    useClickOutside(emojiRef, (target) => {
        if (!emojiPickerOpen || (emojiPickerOpen && !emojiBtnRef.current?.contains(target))) {
            setEmojiPickerOpen(false)
        }
    })

    const handleOpenEmojiPicker = (event: React.MouseEvent) => {
        if (!emojiPickerRendered) {
            setEmojiPickerRendered(true)
        }
        setEmojiPickerOpen(emojiPickerOpen => !emojiPickerOpen)
        event.stopPropagation()
    }

    const handlePickEmoji = useCallback(({ emoji }: EmojiClickData) => {
        setComment(comment => `${comment}${emoji}`)
    }, [])

    return (
        <Box
            component='div'
            borderTop='1px solid #262626'
            color='#A8A8A8'
            flexShrink='0'
            fontSize='14px'
            lineHeight='18px'
            position='relative'
            paddingRight='16px'
            order='6'
            paddingBottom='6px'
            paddingTop='6px'
            display='block'
        >
            {props.isReplying && props.replyingUsername && (
                <Box
                    component='div'
                    paddingLeft='15px'
                    bgcolor='#000000'
                    paddingY='5px'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='flex-start'
                >
                    <Box
                        component='div'
                        display='block'
                        marginRight='10px'
                    >
                        <Box
                            component='div'
                            marginBottom='-5px'
                            flexShrink='1'
                            minWidth='0'
                            flexDirection='column'
                            flexBasis='auto'
                            boxSizing='border-box'
                            display='flex'
                            minHeight='0'
                            alignItems='stretch'
                            position='relative'
                            zIndex='0'
                            marginTop='-5px'
                        >
                            <Box
                                component='div'
                                marginBottom='5px'
                                minWidth='0'
                                flexDirection='column'
                                flexBasis='auto'
                                boxSizing='border-box'
                                display='flex'
                                minHeight='0'
                                flexShrink='0'
                                alignItems='stretch'
                                marginTop='5px'
                                position='relative'
                                zIndex='0'
                            >
                                <Box
                                    component='span'
                                    color='#F5F5F5'
                                    lineHeight='1.3333'
                                    minWidth='0'
                                    fontSize='0.9375rem'
                                    textAlign='left'
                                    display='block'
                                    fontWeight='normal'
                                    maxWidth='100%'
                                    sx={{
                                        wordWrap: 'break-word',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    <Box
                                        component='span'
                                        lineHeight='18px'
                                        fontSize='14px'
                                        fontWeight='400'
                                        minWidth='0'
                                        marginBottom='0!important'
                                        position='relative'
                                        display='block'
                                        maxWidth='100%'
                                        marginLeft='0!important'
                                        marginTop='0!important'
                                        sx={{
                                            overflowY: 'visible',
                                            wordWrap: 'break-word',
                                            overflowX: 'visible',
                                            whiteSpace: 'pre-line',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        <Box
                                            component='span'
                                            marginRight='5px'
                                        >
                                            Replying to
                                        </Box>
                                        <Box
                                            component='span'
                                            lineHeight='18px'
                                            fontSize='14px'
                                            display='inline'
                                            minWidth='0'
                                            marginBottom='0!important'
                                            color='#F5F5F5'
                                            marginRight='0!important'
                                            fontWeight='600'
                                            maxWidth='100%'
                                            marginLeft='0!important'
                                            marginTop='0!important'
                                            sx={{
                                                wordWrap: 'break-word',
                                                whiteSpace: 'pre-line',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            {props.replyingUsername}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        component='div'
                        paddingBottom='8px'
                        paddingLeft='8px'
                        justifyContent='center'
                        bgcolor='transparent'
                        paddingTop='0'
                        marginTop='0'
                        marginBottom='0'
                        boxSizing='border-box'
                        display='flex'
                        alignItems='center'
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
                        onClick={props.onCancelReply}
                    >
                        <Box
                            component='div'
                            justifyContent='center'
                            flexDirection='column'
                            display='flex'
                            alignItems='center'
                        >
                            <svg
                                aria-label='Cancel reply'
                                style={{ position: 'relative', display: 'block' }}
                                color='rgb(245, 245, 245)'
                                fill='rgb(245, 245, 245)'
                                height='12'
                                role='img'
                                viewBox='0 0 24 24'
                                width='12'>
                                <title>Cancel reply</title>
                                <polyline
                                    fill='none'
                                    points='20.643 3.357 12 12 3.353 20.647'
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='3' />
                                <line
                                    fill='none'
                                    stroke='currentColor'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='3'
                                    x1='20.649'
                                    x2='3.354'
                                    y1='20.649'
                                    y2='3.354' />
                            </svg>
                        </Box>
                    </Box>
                </Box>
            )}
            {emojiPickerRendered && (
                <Box
                    ref={emojiRef}
                    component='div'
                    display={emojiPickerOpen ? 'inline-block' : 'none'}
                    position='absolute'
                    zIndex='100'
                    bottom='70px'
                >
                    <EmojiPickerMemo onEmojiClick={handlePickEmoji} />
                </Box>
            )}
            <Box
                component='div'
                display='block'
            >
                <Box
                    component='div'
                    border='0'
                    margin='0'
                    padding='0'
                    display='flex'
                    flexDirection='row'
                    fontSize='100%'
                >
                    <Box
                        component='div'
                        alignItems='center'
                        display='flex'
                        flexDirection='row'
                        flexGrow='1'
                        flexShrink='1'
                        fontSize='100%'
                        margin='0'
                        padding='0'
                        sx={{ verticalAlign: 'baseline' }}
                    >
                        <Box
                            component='div'
                            paddingBottom='8px'
                            paddingTop='8px'
                            paddingLeft='16px'
                            paddingRight='16px'
                            display='block'
                        >
                            <Box
                                ref={emojiBtnRef}
                                component='div'
                                justifyContent='center'
                                padding='0'
                                margin='0'
                                border='0'
                                bgcolor='transparent'
                                boxSizing='border-box'
                                display='flex'
                                alignItems='center'
                                textAlign='inherit'
                                sx={{
                                    touchAction: 'manipulation',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                                onClick={handleOpenEmojiPicker}
                            >
                                <Box
                                    component='div'
                                    justifyContent='center'
                                    flexDirection='column'
                                    display='flex'
                                    alignItems='center'
                                >
                                    <svg
                                        aria-label='Emoji'
                                        style={{ display: 'block', position: 'relative' }}
                                        color='rgb(245, 245, 245)'
                                        fill='rgb(245, 245, 245)'
                                        height='24'
                                        role='img'
                                        viewBox='0 0 24 24'
                                        width='24'
                                    >
                                        <title>Emoji</title>
                                        <path
                                            d='M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z' />
                                    </svg>
                                </Box>
                            </Box>
                        </Box>
                        <InputBase
                            inputRef={ref}
                            value={comment}
                            onChange={handleChangeComment}
                            onKeyPress={handleKeyPress}
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
                                fontSize: '14px',
                            }}
                            placeholder='Add a comment...'
                            fullWidth
                        />
                        <Box
                            component='div'
                            marginLeft='8px'
                            display='block'
                        >
                            <Button
                                variant='primary'
                                text='Post'
                                loading={props.isPostingComment}
                                disabled={Boolean(props.disabled) || comment.trim().length < 1}
                                onClick={handleClickPostComment}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
})

export default PostPreviewAddComment