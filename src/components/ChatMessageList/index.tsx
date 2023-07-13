import { useCallback } from 'react'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import ChatMessageListItem from '../ChatMessageListItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import _range from 'lodash/range'


export interface ChatMessage {
    id: string | number
    chatMembers: { id: string | number, firstName: string, lastName: string, username: string, photoUrl: string | null }[]
    text: string | null
    photoUrl: string | null
    videoUrl: string | null
    creatorId: string | number
    creatorUsername: string
    timestamp: number
    seen: boolean
    selected: boolean
}

interface StaticProps {
    loading?: never
    chatName: string
    chatMessages: ChatMessage[]
    hasMoreChatMessages: boolean
    authUserId: string | number

    onCreateNewChat(): void

    onClickChatMessage(id: string | number): void

    onFetchMoreChatMessages(): void
}

interface LoadingProps {
    loading: true
    chatName?: never
    chatMessages?: never
    hasMoreChatMessages?: never
    authUserId?: never
    onCreateNewChat?: never
    onFetchMoreChatMessages?: never
    onClickChatMessage?: never
}

type Props = StaticProps | LoadingProps

export default function ChatMessageList(props: Props) {

    const mw900 = useMediaQuery('(min-width:900px)')

    const handleClick = useCallback((id: string | number) => {
        props.onClickChatMessage?.(id)
    }, [props.onClickChatMessage])

    return (
        <Box
            component='div'
            bgcolor='#000000'
            minWidth='0'
            flexDirection='column'
            boxSizing='border-box'
            display='flex'
            flexShrink='0'
            position='relative'
            zIndex='0'
            maxWidth='100%'
        >
            <Box
                component='div'
                bgcolor='#000000'
                borderRight='1px solid #262626'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                top='0'
                width={mw900 ? '398px' : '116px'}
                minHeight='100%'
                maxHeight='0'
                position='relative'
            >
                <Box
                    component='div'
                    paddingRight='24px'
                    paddingBottom='12px'
                    height='75px'
                    paddingTop='36px'
                    width='100%'
                    paddingLeft='24px'
                    marginBottom='0'
                    boxSizing='border-box'
                    display='flex'
                    alignItems='center'
                    minHeight='30px'
                    justifyContent='space-between'
                    flexDirection='row'
                    borderBottom='0'
                >
                    {mw900 && (
                        <Box
                            component='div'
                            flexShrink='1'
                            paddingLeft='0'
                            bgcolor='transparent'
                            paddingTop='0'
                            minWidth='0'
                            marginTop='0'
                            borderLeft='0'
                            marginBottom='0'
                            boxSizing='border-box'
                            display='flex'
                            alignItems='center'
                            paddingRight='0'
                            marginLeft='0'
                            borderRight='0'
                            paddingBottom='0'
                            textAlign='inherit'
                            marginRight='0'
                            borderBottom='0'
                            borderTop='0'
                            sx={{
                                touchAction: 'manipulation',
                                cursor: props.loading ? 'default' : 'pointer',
                                listStyle: 'none',
                                textDecoration: 'none',
                                outline: 'none',
                            }}
                        >
                            <Box
                                component='div'
                                display='flex'
                                alignItems='center'
                                flexDirection='row'
                                height='30px'
                                sx={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflowX: 'hidden',
                                    overflowY: 'hidden',
                                }}
                            >
                                <Box
                                    component='span'
                                    minWidth='0'
                                    marginBottom='0!important'
                                    color='#F5F5F5'
                                    fontWeight='700'
                                    marginRight='0!important'
                                    position='relative'
                                    fontSize='20px'
                                    display='block'
                                    maxWidth='100%'
                                    marginLeft='0!important'
                                    marginTop='0!important'
                                    sx={{
                                        lineHeight: '25px',
                                        overflowY: 'visible',
                                        wordWrap: 'break-word',
                                        overflowX: 'visible',
                                        whiteSpace: 'pre-line',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    <Box
                                        component='span'
                                        display='block'
                                        maxWidth='100%'
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            overflowX: 'hidden',
                                            overflowY: 'hidden',
                                        }}
                                    >
                                        {!props.loading && props.chatName}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    )}
                    <Box
                        component='div'
                        display='flex'
                        paddingLeft='12px'
                        justifyContent='flex-end'
                    >
                        <Box
                            component='div'
                            display='flex'
                        >
                            <Box
                                component='div'
                                paddingBottom='8px'
                                paddingLeft='8px'
                                justifyContent='center'
                                bgcolor='transparent'
                                marginTop='0'
                                borderLeft='0'
                                marginBottom='0'
                                boxSizing='border-box'
                                display='flex'
                                alignItems='center'
                                paddingTop='8px'
                                paddingRight='8px'
                                marginLeft='0'
                                borderRight='0'
                                textAlign='inherit'
                                marginRight='0'
                                borderBottom='0'
                                borderTop='0'
                                sx={{
                                    touchAction: 'manipulation',
                                    borderRightStyle: 'none',
                                    cursor: props.loading ? 'default' : 'pointer',
                                    borderBottomStyle: 'none',
                                    borderTopStyle: 'none',
                                    listStyle: 'none',
                                    textDecoration: 'none',
                                    outline: 'none',
                                }}
                                onClick={props.onCreateNewChat}
                            >
                                {!props.loading && (
                                    <Box
                                        component='div'
                                        justifyContent='center'
                                        flexDirection='column'
                                        display='flex'
                                        alignItems='center'
                                    >
                                        <svg
                                            aria-label='New message'
                                            style={{ position: 'relative', display: 'block' }}
                                            color='rgb(245, 245, 245)'
                                            fill='rgb(245, 245, 245)'
                                            height='24'
                                            role='img'
                                            viewBox='0 0 24 24'
                                            width='24'>
                                            <title>New message</title>
                                            <path
                                                d='M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2' />
                                            <path
                                                d='M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z'
                                                fill='none'
                                                stroke='currentColor'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2' />
                                            <line
                                                fill='none'
                                                stroke='currentColor'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                x1='16.848'
                                                x2='20.076'
                                                y1='3.924'
                                                y2='7.153' />
                                        </svg>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    component='div'
                    paddingTop='14px'
                    paddingRight='24px'
                    paddingLeft='24px'
                    display='flex'
                    alignItems='center'
                    flexDirection='row'
                    justifyContent='flex-start'
                    paddingBottom='10px'
                >
                    <Box
                        component='div'
                        display='block'
                        flexGrow='1'
                    >
                        <Box
                            component='h1'
                            fontSize='16px'
                            minWidth='0'
                            marginBottom='0!important'
                            color='#F5F5F5'
                            fontWeight='700'
                            marginRight='0!important'
                            position='relative'
                            display='block'
                            maxWidth='100%'
                            marginLeft='0!important'
                            marginTop='0!important'
                            sx={{
                                lineHeight: '20px',
                                overflowY: 'visible',
                                wordWrap: 'break-word',
                                overflowX: 'visible',
                                whiteSpace: 'pre-line',
                                wordBreak: 'break-word',
                            }}
                        >
                            {!props.loading && mw900 && 'Messages'}
                        </Box>
                    </Box>
                </Box>
                <Box
                    component='div'
                    flexDirection='column'
                    display='flex'
                    position='relative'
                    flexGrow='1'
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
                            overflowX: 'hidden',
                            overflowY: 'hidden',
                        }}
                    >
                        <Box
                            component='div'
                            flexDirection='column'
                            display='flex'
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
                                position='relative'
                                flexGrow='1'
                                sx={{
                                    overflowX: 'hidden',
                                    overflowY: 'hidden',
                                }}
                            >
                                <Box
                                    id='chatMessagesList'
                                    component='div'
                                    flexShrink='1'
                                    width='100%'
                                    flexDirection='column'
                                    display='flex'
                                    position='relative'
                                    flexGrow='1'
                                    sx={{
                                        overflowX: 'hidden',
                                        overflowAnchor: 'none',
                                        overflowY: props.loading ? 'hidden' : 'scroll',
                                    }}
                                >
                                    {props.loading ? (
                                        <Box
                                            component='div'
                                            display='block'
                                        >
                                            <Box
                                                component='div'
                                                display='block'
                                                position='relative'
                                            >
                                                {_range(8).map(index => (
                                                    <ChatMessageListItem
                                                        key={index}
                                                        loading />
                                                ))}
                                            </Box>
                                        </Box>
                                    ) : (
                                        <InfiniteScroll
                                            scrollableTarget='chatMessagesList'
                                            next={props.onFetchMoreChatMessages}
                                            hasMore={props.hasMoreChatMessages}
                                            loader={<Box
                                                component='div'
                                                display='block'
                                            >
                                                <Box
                                                    component='div'
                                                    display='block'
                                                    position='relative'
                                                >
                                                    <ChatMessageListItem loading />
                                                    <ChatMessageListItem loading />
                                                </Box>
                                            </Box>}
                                            dataLength={props.chatMessages.length}>
                                            <Box
                                                component='div'
                                                display='block'
                                            >
                                                <Box
                                                    component='div'
                                                    display='block'
                                                    position='relative'
                                                >
                                                    {props.chatMessages.map(chatMessage => (
                                                        <ChatMessageListItem
                                                            key={chatMessage.id}
                                                            id={chatMessage.id}
                                                            authUserId={props.authUserId}
                                                            chatMembers={chatMessage.chatMembers}
                                                            text={chatMessage.text}
                                                            photoUrl={chatMessage.photoUrl}
                                                            videoUrl={chatMessage.videoUrl}
                                                            creatorId={chatMessage.creatorId}
                                                            creatorUsername={chatMessage.creatorUsername}
                                                            timestamp={chatMessage.timestamp}
                                                            seen={chatMessage.seen}
                                                            selected={chatMessage.selected}
                                                            onClick={handleClick} />
                                                    ))}
                                                </Box>
                                            </Box>
                                        </InfiniteScroll>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}