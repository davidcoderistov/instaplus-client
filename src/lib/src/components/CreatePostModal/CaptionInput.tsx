import React, { useCallback, useMemo, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import InputBase from '@mui/material/InputBase'
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react'
import Hashtag from './Hashtag'
import { useClickOutside } from '../../hooks'


const EmojiPickerMemo = React.memo((props: { onEmojiClick(data: EmojiClickData): void }) => {

    return (
        <EmojiPicker
            theme={Theme.DARK}
            emojiStyle={EmojiStyle.NATIVE}
            skinTonesDisabled
            searchDisabled
            previewConfig={{ showPreview: false }}
            height='250px'
            width='250px'
            onEmojiClick={props.onEmojiClick}
        />
    )
})

interface IHashtag {
    _id: string | number
    name: string
    postIds: string[]
}

interface Props {
    hashtags: IHashtag[]
    hashtagsLoading: boolean

    onFetchHashtags(searchQuery: string): void

    onChangeValue(value: string): void
}

export default function CaptionInput(props: Props) {

    const [caption, setCaption] = useState('')

    const isTypingHashtag = useMemo(() => {
        const r = /#[^\s#]+$/
        const hashtags = caption.match(r)
        return Array.isArray(hashtags) && hashtags.length > 0
    }, [caption])

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const caption = event.target.value
        setCaption(caption)
        props.onChangeValue(caption)
        const r = /#[^\s#]+$/
        const hashtags = caption.match(r)
        const isTypingHashtag = Array.isArray(hashtags) && hashtags.length > 0
        if (isTypingHashtag) {
            props.onFetchHashtags(hashtags[0].slice(1))
        }
    }

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleClickHashtag = (hashtag: IHashtag) => {
        const r = /#[^\s#]+$/
        const hashtags = caption.match(r)
        if (Array.isArray(hashtags) && hashtags.length > 0) {
            setCaption(caption => {
                const newCaption = `${caption.slice(0, -hashtags[0].length)}#${hashtag.name} `
                props.onChangeValue(newCaption)
                inputRef.current?.focus()
                return newCaption
            })
        }
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
        setCaption(caption => {
            const newCaption = `${caption}${emoji}`
            props.onChangeValue(newCaption)
            return newCaption
        })
    }, [])

    return (
        <>
            <Box
                component='div'
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
                marginTop='5px'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                }}
            >
                <Box
                    component='div'
                    width='100%'
                    display='flex'
                    alignItems='center'
                    position='relative'
                >
                    <InputBase
                        inputRef={inputRef}
                        value={caption}
                        onChange={handleChangeValue}
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
                            paddingX: '16px',
                        }}
                        inputProps={{
                            maxLength: 125,
                        }}
                        placeholder='Write a caption...'
                        multiline
                        minRows={7}
                        maxRows={7}
                        fullWidth
                    />
                </Box>
                <Box
                    component='div'
                    padding='0'
                    margin='0'
                    boxSizing='border-box'
                    display='flex'
                    flexShrink='0'
                    justifyContent='space-between'
                    alignItems='stretch'
                    flexDirection='row'
                    position='relative'
                    sx={{ verticalAlign: 'baseline' }}
                >
                    <Box
                        component='div'
                        paddingLeft='8px'
                        borderRadius='0'
                        paddingBottom='4px'
                        bgcolor='transparent'
                        minWidth='0'
                        flexDirection='column'
                        boxSizing='border-box'
                        display='flex'
                        minHeight='0'
                        paddingRight='8px'
                        alignSelf='auto'
                        justifyContent='flex-start'
                        position='relative'
                        flexGrow='1'
                        paddingTop='4px'
                        alignItems='flex-start'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                        }}
                    >
                        {emojiPickerRendered && (
                            <Box
                                ref={emojiRef}
                                component='div'
                                display={emojiPickerOpen ? 'inline-block' : 'none'}
                                position='absolute'
                                top='35px'
                                left='16px'
                                zIndex='100'
                            >
                                <EmojiPickerMemo onEmojiClick={handlePickEmoji} />
                            </Box>
                        )}
                        <Box
                            ref={emojiBtnRef}
                            component='div'
                            alignItems='center'
                            border='none'
                            display='flex'
                            justifyContent='center'
                            padding='8px'
                            sx={{ cursor: 'pointer' }}
                            onClick={handleOpenEmojiPicker}
                        >
                            <Box
                                component='div'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                            >
                                <svg
                                    aria-label='Emoji'
                                    style={{ display: 'block', position: 'relative' }}
                                    color='rgb(168, 168, 168)'
                                    fill='rgb(168, 168, 168)'
                                    height='20'
                                    role='img'
                                    viewBox='0 0 24 24'
                                    width='20'
                                >
                                    <title>Emoji</title>
                                    <path
                                        d='M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z' />
                                </svg>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        component='div'
                        flexShrink='1'
                        borderRadius='0'
                        paddingRight='12px'
                        justifyContent='center'
                        bgcolor='transparent'
                        flexDirection='column'
                        boxSizing='border-box'
                        display='flex'
                        paddingLeft='12px'
                        alignItems='stretch'
                        alignSelf='auto'
                        position='relative'
                        flexGrow='0'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                        }}
                    >
                        <Box
                            component='div'
                            textAlign='right'
                            justifyContent='center'
                            bgcolor='transparent'
                            minWidth='0'
                            flexBasis='auto'
                            margin='0'
                            boxSizing='border-box'
                            display='flex'
                            minHeight='0'
                            flexShrink='0'
                            alignItems='stretch'
                            flexDirection='row'
                            position='relative'
                            paddingX='4px'
                            sx={{
                                touchAction: 'manipulation',
                            }}
                        >
                            <Box
                                component='span'
                                lineHeight='16px'
                                fontWeight='400'
                                minWidth='0'
                                color='#737373'
                                margin='0!important'
                                position='relative'
                                display='block'
                                fontSize='12px'
                                maxWidth='100%'
                                sx={{
                                    wordWrap: 'break-word',
                                    whiteSpace: 'pre-line',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {caption.length}/125
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                component='div'
                maxHeight='136px'
                sx={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                }}
                marginBottom='5px'
            >
                {isTypingHashtag && props.hashtagsLoading && (
                    <Box
                        component='div'
                        width='100%'
                        height='136px'
                        display='flex'
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                        bgcolor='#000000'
                    >
                        <CircularProgress
                            size={30}
                            thickness={3}
                            sx={{
                                color: 'grey',
                            }} />
                    </Box>
                )}
                {isTypingHashtag && !props.hashtagsLoading && props.hashtags.length > 0 &&
                    props.hashtags.map(hashtag => (
                        <Hashtag
                            key={hashtag._id}
                            hashtag={hashtag}
                            onClick={handleClickHashtag} />
                    ))}
            </Box>
        </>
    )
}