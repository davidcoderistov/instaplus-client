import React, { useState, useEffect, useMemo, useCallback, useRef, forwardRef } from 'react'
import { useClickOutside } from '../../hooks'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import ChatHeader from '../ChatHeader'
import ChatFooter from '../ChatFooter'
import ChatDescription from '../ChatDescription'
import ChatMessage from '../ChatMessage'
import ChatMessageTimestamp from '../ChatMessageTimestamp'
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme } from 'emoji-picker-react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Message, ReplyMessage } from '../../types/Message'
import moment from 'moment'


interface Props {
    type: 'single' | 'group'
    authUserId: number | string
    loading: boolean
    isViewingChatDetails: boolean

    messages: Message[]
    hasMoreMessages: boolean

    onFetchMoreMessages(): void

    chatId: string | number
    creator: {
        id: string | number
        username: string
    }
    chatMembers: { id: string | number, username: string, photoUrl: string | null }[]

    onViewChatDetails(chatId: string | number): void

    onViewUser(userId: string | number): void

    onClickPhoto(message: Message): void

    onClickReplyPhoto(message: ReplyMessage): void

    onReact(emoji: string, message: Message): void

    onSendMessage(chatId: string | number, message: string, replyingMessage: Message | null): void

    onSendLike(chatId: string | number): void

    onUploadFile(chatId: string | number, file: File): void
}

const ForwardedChatMessage = React.memo(forwardRef<any, any>((props, ref) => (
    <ChatMessage {...props} emojiRef={ref} />
)))

const Chat = React.memo((props: Props) => {

    const timestampMessages = useCallback((messages: Message[], hasMoreMessages: boolean)
        : Array<{ message: Message, timestamp: boolean }> => {
        const messagesCopy = messages.map(message => ({
            message,
            timestamp: false,
        }))
        if (messagesCopy.length > 0) {
            let separatorsCount = 0
            for (let i = 0; i < messages.length - 1; ++i) {
                const first = moment(messages[i].createdAt)
                const second = moment(messages[i + 1].createdAt)
                if (second.diff(first, 'minutes') > 10) {
                    messagesCopy.splice(separatorsCount + i + 1, 0, {
                        message: messages[i + 1],
                        timestamp: true,
                    })
                    ++separatorsCount
                }
            }
            if (!hasMoreMessages) {
                messagesCopy.splice(0, 0, {
                    message: messages[0],
                    timestamp: true,
                })
            }
        }
        return messagesCopy
    }, [])

    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const [emojiPickerTop, setEmojiPickerTop] = useState(0)
    const [emojiPickerRight, setEmojiPickerRight] = useState(0)
    const [emojiMessage, setEmojiMessage] = useState<Message | null>(null)

    const emojiRef = useRef<Node | null>(null)
    const emojiBtnRef = useRef<Node | null>(null)

    useClickOutside(emojiRef, (target) => {
        if (!emojiPickerOpen || (emojiPickerOpen && !emojiBtnRef.current?.contains(target))) {
            setEmojiPickerOpen(false)
        }
    })

    const handleOpenEmojiPicker = useCallback((message: Message, lhs: boolean, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect()
        if (window.innerHeight - rect.bottom >= 350) {
            setEmojiPickerTop(rect.bottom)
            if (lhs) {
                setEmojiPickerRight(window.innerWidth - rect.left - 348)
            } else {
                setEmojiPickerRight(window.innerWidth - rect.right + 8)
            }
        } else if (rect.top >= 350) {
            setEmojiPickerTop(rect.top - 340)
            if (lhs) {
                setEmojiPickerRight(window.innerWidth - rect.left - 348)
            } else {
                setEmojiPickerRight(window.innerWidth - rect.right + 8)
            }
        } else {
            setEmojiPickerTop(rect.top - 154)
            if (lhs) {
                setEmojiPickerRight(window.innerWidth - rect.right - 348)
            } else {
                setEmojiPickerRight(window.innerWidth - rect.left + 8)
            }
        }
        setEmojiPickerOpen(emojiPickerOpen => !emojiPickerOpen)
        setEmojiMessage(message)
        event.stopPropagation()
    }, [])

    const handlePickEmoji = useCallback(({ emoji }: EmojiClickData) => {
        props.onReact(emoji, emojiMessage as Message)
        setEmojiPickerOpen(false)
    }, [props.onReact, emojiMessage])

    const [replyingMessage, setReplyingMessage] = useState<Message | null>(null)

    const handleReplyMessage = useCallback((replyingMessage: Message) => {
        setReplyingMessage(replyingMessage)
    }, [])

    const handleCancelReplyMessage = useCallback(() => {
        setReplyingMessage(null)
    }, [])

    const handleSendMessage = useCallback((chatId: string | number, message: string) => {
        props.onSendMessage(chatId, message, replyingMessage)
        setReplyingMessage(null)
    }, [props.onSendMessage, replyingMessage])

    const messages = useMemo(() => {
        return timestampMessages(Array.from(props.messages).reverse(), props.hasMoreMessages).map(
            ({ message, timestamp }, index, messages) => {
                if (timestamp) {
                    return (
                        <ChatMessageTimestamp
                            key={`message-timestamp-${index}`}
                            timestamp={message.createdAt} />
                    )
                }
                let position
                const isPrevMessageFromSameUser = index - 1 > -1 && index - 1 < messages.length &&
                    !messages[index - 1].timestamp && messages[index - 1].message.creator.id === message.creator.id
                const isNextMessageFromSameUser = index + 1 < messages.length &&
                    !messages[index + 1].timestamp && messages[index + 1].message.creator.id === message.creator.id
                if (isPrevMessageFromSameUser) {
                    if (isNextMessageFromSameUser) {
                        position = 'between'
                    } else {
                        position = 'end'
                    }
                } else {
                    if (isNextMessageFromSameUser) {
                        position = 'start'
                    } else {
                        position = 'solo'
                    }
                }
                return (
                    <ForwardedChatMessage
                        ref={emojiBtnRef}
                        key={message.id}
                        type={props.type}
                        position={position}
                        lhs={message.creator.id !== props.authUserId}
                        authUserId={props.authUserId}
                        message={message}
                        onClickPhoto={props.onClickPhoto}
                        onClickReplyPhoto={props.onClickReplyPhoto}
                        onReact={handleOpenEmojiPicker}
                        onReply={handleReplyMessage}
                    />
                )
            })
    }, [props.messages, props.hasMoreMessages, props.type, props.authUserId, timestampMessages, handleReplyMessage, props.onClickPhoto, props.onClickReplyPhoto, props.onReact, emojiBtnRef])

    const scrollableChatRef = useRef<HTMLDivElement>(null)
    const shouldScrollToBottomRef = useRef(false)
    const initialRenderRef = useRef(true)

    useEffect(() => {
        if (shouldScrollToBottomRef.current && scrollableChatRef.current) {
            scrollableChatRef.current.scrollTop = scrollableChatRef.current.scrollHeight
            shouldScrollToBottomRef.current = false
        }
    }, [scrollableChatRef.current])

    useEffect(() => {
        if (scrollableChatRef.current) {
            scrollableChatRef.current.scrollTop = scrollableChatRef.current.scrollHeight
        } else {
            if (initialRenderRef.current) {
                initialRenderRef.current = false
            } else {
                shouldScrollToBottomRef.current = true
            }
        }
    }, [props.chatId])

    return (
        <Box
            component='div'
            flexShrink='1'
            minWidth='337px'
            flexDirection='column'
            boxSizing='border-box'
            display='flex'
            flexBasis='0'
            position='relative'
            zIndex='0'
            flexGrow='1'
            maxWidth='100%'
        >
            <Box
                component='div'
                bgcolor='#000000'
                minWidth='0'
                flexDirection='column'
                display='flex'
                minHeight='inherit'
                position='relative'
                zIndex='0'
                flexGrow='1'
            >
                <Box
                    component='div'
                    flexShrink='1'
                    flexDirection='column'
                    bgcolor='#000000'
                    boxSizing='border-box'
                    display='flex'
                    fontSize='.9375rem'
                    minHeight='0'
                    position='relative'
                    flexBasis='100%'
                    zIndex='0'
                    flexGrow='1'
                    maxWidth='100%'
                    sx={{
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                    }}
                >
                    <Box
                        component='div'
                        flexDirection='column'
                        boxSizing='border-box'
                        display='flex'
                        minHeight='0'
                        position='relative'
                        zIndex='0'
                        flexGrow='1'
                    >
                        <Box
                            component='div'
                            flexShrink='1'
                            flexWrap='nowrap'
                            paddingTop='0'
                            minWidth='0'
                            boxSizing='border-box'
                            display='flex'
                            flexBasis='0'
                            justifyContent='space-between'
                            alignItems='stretch'
                            flexDirection='row'
                            position='relative'
                            zIndex='0'
                            flexGrow='1'
                        >
                            <Box
                                component='div'
                                flexShrink='1'
                                minWidth='0'
                                flexDirection='column'
                                boxSizing='border-box'
                                display='flex'
                                flexBasis='0'
                                position='relative'
                                zIndex='0'
                                flexGrow='1'
                                maxWidth='100%'
                                sx={{
                                    overflowX: 'hidden',
                                    overflowY: 'hidden',
                                }}
                            >
                                <ChatHeader
                                    chatId={props.chatId}
                                    chatMembers={props.chatMembers}
                                    authUserId={props.authUserId}
                                    isViewingChatDetails={props.isViewingChatDetails}
                                    onViewChatDetails={props.onViewChatDetails}
                                    onViewUser={props.onViewUser}
                                />
                                <Box
                                    component='div'
                                    maxHeight='inherit'
                                    justifyContent='inherit'
                                    flexGrow='inherit'
                                    minWidth='inherit'
                                    height='inherit'
                                    minHeight='inherit'
                                    width='inherit'
                                    position='relative'
                                    maxWidth='inherit'
                                    display='inherit'
                                    alignItems='inherit'
                                    flexDirection='inherit'
                                    flexShrink='inherit'
                                >
                                    <Box
                                        component='div'
                                        display='flex'
                                        height='100%'
                                        flexGrow='1'
                                    >
                                        <Box
                                            component='div'
                                            flexDirection='column'
                                            display='flex'
                                            minHeight='0'
                                            position='relative'
                                            zIndex='0'
                                            flexGrow='1'
                                            maxWidth='100%'
                                        >
                                            <Box
                                                component='div'
                                                maxHeight='100%'
                                                flexDirection='column'
                                                display='flex'
                                                flexBasis='0'
                                                position='relative'
                                                flexGrow='1'
                                                sx={{
                                                    overflowX: 'hidden',
                                                    overflowY: 'hidden',
                                                }}
                                            >
                                                <Box
                                                    component='div'
                                                    flexDirection='column'
                                                    display='flex'
                                                    height='100%'
                                                    flexGrow='1'
                                                >
                                                    <Box
                                                        component='div'
                                                        flexDirection='column'
                                                        display='flex'
                                                        borderRight='2px solid #000000'
                                                        flexGrow='1'
                                                        borderLeft='2px solid #000000'
                                                        sx={{
                                                            overflowX: 'hidden',
                                                            overflowY: 'hidden',
                                                        }}
                                                    >
                                                        <Box
                                                            component='div'
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
                                                            flexGrow='1'
                                                            sx={{
                                                                isolation: 'isolate',
                                                                overflowX: 'hidden',
                                                                overflowY: 'hidden',
                                                            }}
                                                        >
                                                            <Box
                                                                component='div'
                                                                flexShrink='1'
                                                                flexDirection='column'
                                                                display='flex'
                                                                zIndex='0'
                                                                flexGrow='1'
                                                                sx={{
                                                                    isolation: 'isolate',
                                                                    overflowX: 'hidden',
                                                                    overflowY: 'hidden',
                                                                }}
                                                            >
                                                                <Box
                                                                    component='div'
                                                                    flexDirection='column'
                                                                    display='flex'
                                                                    position='relative'
                                                                    flexGrow='1'
                                                                    sx={{
                                                                        overflowX: 'hidden',
                                                                        overflowAnchor: 'none',
                                                                        overflowY: 'hidden',
                                                                    }}
                                                                >
                                                                    {props.loading ? (
                                                                        <Box
                                                                            component='div'
                                                                            display='flex'
                                                                            flexDirection='row'
                                                                            justifyContent='center'
                                                                            alignItems='flex-start'
                                                                            height='50px'
                                                                        >
                                                                            <CircularProgress
                                                                                size={25}
                                                                                thickness={5}
                                                                                sx={{
                                                                                    color: 'grey',
                                                                                    mt: 1,
                                                                                }} />
                                                                        </Box>
                                                                    ) : (
                                                                        <Box
                                                                            id='scrollableChat'
                                                                            ref={scrollableChatRef}
                                                                            component='div'
                                                                            flexShrink='1'
                                                                            width='100%'
                                                                            flexDirection='column-reverse'
                                                                            display='flex'
                                                                            position='relative'
                                                                            flexGrow='1'
                                                                            sx={{
                                                                                overflowX: 'hidden',
                                                                                overflowAnchor: 'none',
                                                                                overflowY: 'scroll',
                                                                            }}
                                                                        >
                                                                            <InfiniteScroll
                                                                                next={props.onFetchMoreMessages}
                                                                                hasMore={props.hasMoreMessages}
                                                                                loader={
                                                                                    <Box
                                                                                        component='div'
                                                                                        display='flex'
                                                                                        flexDirection='row'
                                                                                        justifyContent='center'
                                                                                        alignItems='flex-start'
                                                                                        height='50px'
                                                                                    >
                                                                                        <CircularProgress
                                                                                            size={25}
                                                                                            thickness={5}
                                                                                            sx={{
                                                                                                color: 'grey',
                                                                                                mt: 1,
                                                                                            }} />
                                                                                    </Box>
                                                                                }
                                                                                dataLength={props.messages.length}
                                                                                scrollableTarget='scrollableChat'
                                                                                inverse={true}
                                                                                style={{
                                                                                    display: 'flex',
                                                                                    flexDirection: 'column-reverse',
                                                                                }}
                                                                            >
                                                                                <Box
                                                                                    component='div'
                                                                                    display='block'
                                                                                >
                                                                                    {!props.hasMoreMessages && (
                                                                                        <>
                                                                                            <ChatDescription
                                                                                                chatId={props.chatId}
                                                                                                chatMembers={props.chatMembers}
                                                                                                authUserId={props.authUserId}
                                                                                                creator={props.creator.username}
                                                                                                onViewChatDetails={props.onViewChatDetails}
                                                                                                onViewUser={props.onViewUser}
                                                                                            />
                                                                                            <Box
                                                                                                component='div'
                                                                                                minWidth='0'
                                                                                                position='relative'
                                                                                                zIndex='0'
                                                                                                flexGrow='1'
                                                                                                flexBasis='auto'
                                                                                                flexShrink='0'
                                                                                                display='flex'
                                                                                                flexDirection='column'
                                                                                                minHeight='0'
                                                                                                alignItems='stretch'
                                                                                                height='calc(100vh - 572px)'
                                                                                            />
                                                                                        </>
                                                                                    )}
                                                                                    {messages}
                                                                                </Box>
                                                                            </InfiniteScroll>
                                                                        </Box>
                                                                    )}
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <ChatFooter
                                                chatId={props.chatId}
                                                authUserId={props.authUserId}
                                                replyingMessage={replyingMessage}
                                                onSendMessage={handleSendMessage}
                                                onSendLike={props.onSendLike}
                                                onUploadFile={props.onUploadFile}
                                                onCancelReply={handleCancelReplyMessage}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            {emojiPickerOpen && (
                <Box
                    ref={emojiRef}
                    position='absolute'
                    display={emojiPickerOpen ? 'block' : 'none'}
                    top={`${emojiPickerTop}px`}
                    right={`${emojiPickerRight}px`}
                    zIndex='100'
                >
                    <EmojiPicker
                        theme={Theme.DARK}
                        emojiStyle={EmojiStyle.NATIVE}
                        skinTonesDisabled
                        searchDisabled
                        previewConfig={{ showPreview: false }}
                        height='340px'
                        width='340px'
                        onEmojiClick={handlePickEmoji}
                    />
                </Box>
            )}
        </Box>
    )
})

export default Chat