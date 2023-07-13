import React, { useCallback } from 'react'
import { useMediaQuery } from '@mui/material'
import { useChatMembers } from '../../hooks'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import ChatAvatar from '../ChatAvatar'
import { getTimeElapsed } from '../../utils'
import _isEqual from 'lodash/isEqual'


interface StaticProps {
    id: string | number
    loading?: never
    chatMembers: { id: string | number, username: string, photoUrl: string | null }[]
    text: string | null
    photoUrl: string | null
    videoUrl: string | null
    creatorId: string | number
    creatorUsername: string
    timestamp: number
    seen: boolean
    selected: boolean
    authUserId: string | number

    onClick(id: string | number): void
}

interface LoadingProps {
    id?: never
    loading: true
    chatMembers?: never
    text?: never
    photoUrl?: never
    videoUrl?: never
    creatorId?: never
    creatorUsername?: never
    timestamp?: never
    seen?: never
    selected?: never
    authUserId?: never

    onClick?: never
}

type Props = StaticProps | LoadingProps


const ChatMessageListItem = React.memo((props: Props) => {

    const mw900 = useMediaQuery('(min-width:900px)')

    const [usernames, photoUrls] = useChatMembers(props.loading ? [] : props.chatMembers, props.loading ? '' : props.authUserId, 2)

    const getMessageText = () => {
        if (!props.loading) {
            if (props.text) {
                if (props.creatorId === props.authUserId) {
                    return `You: ${props.text}`
                } else if (props.chatMembers.length > 2) {
                    return `${props.creatorUsername}: ${props.text}`
                } else {
                    return props.text
                }
            } else if (props.photoUrl) {
                const media = props.videoUrl ? 'video' : 'photo'
                if (props.creatorId === props.authUserId) {
                    return `You sent a ${media}.`
                } else if (props.chatMembers.length > 2) {
                    return `${props.creatorUsername} sent a ${media}.`
                } else {
                    return `${props.creatorUsername} sent you a ${media}.`
                }
            }
        }
        return null
    }

    const handleClickItem = useCallback(() => {
        if (!props.loading) {
            props.onClick(props.id)
        }
    }, [props.loading, props.id, props.onClick])

    return (
        <Box
            component='div'
            width='100%'
            maxWidth='100%'
            paddingLeft='24px'
            paddingRight='8px'
            paddingTop='8px'
            paddingBottom='8px'
            minWidth='0'
            boxSizing='border-box'
            bgcolor={props.selected ? '#262626' : 'transparent'}
            display='flex'
            flexDirection='row'
            sx={{
                cursor: props.loading ? 'default' : 'pointer',
                '&:hover': {
                    ...!props.loading && !props.selected && { backgroundColor: '#121212' },
                },
            }}
            onClick={handleClickItem}
        >
            <Box
                component='div'
                flex='0 0 68px'
            >
                {props.loading ? (
                    <ChatAvatar
                        containerSize={56}
                        loading />
                ) : (
                    <ChatAvatar
                        photoUrls={photoUrls}
                        containerSize={56}
                        avatarSize={photoUrls.length > 1 ? 40 : 56}
                    />
                )}
            </Box>
            {mw900 && (
                <Box
                    component='div'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    flex='1 1 auto'
                    minWidth='0'
                >
                    <Box
                        component='span'
                        lineHeight='18px'
                        fontSize='14px'
                        fontWeight={props.seen ? '400' : '600'}
                        minWidth='0'
                        marginBottom='0!important'
                        color='#F5F5F5'
                        marginRight='0!important'
                        position='relative'
                        display='block'
                        maxWidth='100%'
                        marginLeft='0!important'
                        marginTop='0!important'
                        paddingRight='28px'
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
                            display='block'
                            maxWidth='100%'
                            sx={{
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflowX: 'hidden',
                                overflowY: 'hidden',
                            }}
                        >
                            {props.loading ? (
                                <Skeleton
                                    variant='rounded'
                                    width={240}
                                    height={17}
                                    sx={{
                                        backgroundColor: '#202020',
                                        borderRadius: '8px',
                                    }} />
                            ) : usernames}
                        </Box>
                    </Box>
                    <Box
                        component='div'
                        height='5px'
                        display='block' />
                    <Box
                        component='div'
                        height='18px'
                        bgcolor='transparent'
                        width='100%'
                        boxSizing='border-box'
                        display='flex'
                        alignItems='center'
                        flexShrink='0'
                        position='static'
                        flexDirection='row'
                        alignSelf='auto'
                        justifyContent='flex-start'
                        flexGrow='0'
                        sx={{
                            overflowY: 'visible',
                            borderBottomLeftRadius: '0',
                            borderBottomRightRadius: '0',
                            overflowX: 'visible',
                            borderTopLeftRadius: '0',
                            borderTopRightRadius: '0',
                        }}
                    >
                        {props.loading ? (
                            <Skeleton
                                variant='rounded'
                                width={180}
                                height={16}
                                sx={{
                                    backgroundColor: '#202020',
                                    borderRadius: '8px',
                                }} />
                        ) : (
                            <>
                                <Box
                                    component='span'
                                    lineHeight='16px'
                                    fontWeight={props.seen ? '400' : '700'}
                                    minWidth='0'
                                    marginBottom='0!important'
                                    marginRight='0!important'
                                    color={props.seen ? '#A8A8A8' : '#F5F5F5'}
                                    position='relative'
                                    display='block'
                                    fontSize='12px'
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
                                        display='block'
                                        maxWidth='100%'
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            overflowX: 'hidden',
                                            overflowY: 'hidden',
                                        }}
                                    >
                                        {getMessageText()}
                                    </Box>
                                </Box>
                                <Box
                                    component='span'
                                    marginRight='4px'
                                    marginLeft='4px'
                                    marginTop='0'
                                    marginBottom='0'
                                    flexShrink='0'
                                    color='#A8A8A8'
                                >
                                    <Box
                                        component='span'
                                    >
                                        <Box
                                            component='span'
                                            height='1px'
                                            width='1px'
                                            position='absolute'
                                            sx={{
                                                clip: 'rect(0,0,0,0)',
                                                overflowX: 'hidden',
                                                overflowY: 'hidden',
                                            }}
                                        >
                                            &nbsp;
                                        </Box>
                                        <Box
                                            component='span'
                                        > · </Box>
                                    </Box>
                                </Box>
                                <Box
                                    component='div'
                                    minWidth='0'
                                    flexShrink='0'
                                    display='block'
                                >
                                    <Box
                                        component='span'
                                        lineHeight='16px'
                                        fontWeight='400'
                                        minWidth='0'
                                        marginBottom='0!important'
                                        marginRight='0!important'
                                        color='#A8A8A8'
                                        position='relative'
                                        display='block'
                                        fontSize='12px'
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
                                            display='block'
                                            maxWidth='100%'
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflowX: 'hidden',
                                                overflowY: 'hidden',
                                            }}
                                        >
                                            <Box
                                                component='div'
                                                whiteSpace='nowrap'
                                                display='block'
                                            >
                                                {getTimeElapsed(props.timestamp)}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            )}
            {mw900 && (
                <Box
                    component='div'
                    display='flex'
                    flexShrink='0'
                    paddingLeft='12px'
                    flexDirection='row'
                    justifyContent='flex-end'
                    alignItems='center'
                >
                    {!props.loading && !props.seen && (
                        <Box
                            component='span'
                            height='8px'
                            display='inline-flex'
                            width='8px'
                            bgcolor='#0095F6'
                            marginRight='8px'
                            sx={{
                                borderBottomLeftRadius: '50%',
                                borderTopRightRadius: '50%',
                                borderRightStyle: 'solid',
                                borderLeftWidth: '0',
                                borderRightWidth: '0',
                                borderTopWidth: '0',
                                borderLeftStyle: 'solid',
                                borderBottomWidth: '0',
                                borderBottomStyle: 'solid',
                                borderBottomRightRadius: '50%',
                                borderTopLeftRadius: '50%',
                                borderTopStyle: 'solid',
                            }} />
                    )}
                </Box>
            )}
        </Box>
    )
}, (prevProps, nextProps) => {

    const { chatMembers: prevChatMembers, ...prevRest } = prevProps
    const { chatMembers: nextChatMembers, ...nextRest } = nextProps

    const chatMembersEqual = _isEqual(prevChatMembers, nextChatMembers)

    const restPropsEqual = _isEqual(prevRest, nextRest)

    return chatMembersEqual && restPropsEqual
})

export default ChatMessageListItem