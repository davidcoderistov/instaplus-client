import { useChatMembers } from '../../hooks'
import Box from '@mui/material/Box'
import ChatAvatar from '../ChatAvatar'


interface Props {
    chatMembers: { id: string | number, username: string, photoUrl: string | null }[]
    authUserId: string | number
    isViewingChatDetails: boolean

    onClickChatMembers(): void

    onClickChatDetails(): void
}

export default function ChatHeader(props: Props) {

    const [usernames, photoUrls] = useChatMembers(props.chatMembers, props.authUserId, 5)

    return (
        <Box
            component='div'
            zIndex='1'
            display='block'
        >
            <Box
                component='div'
                height='75px'
                width='100%'
                marginBottom='0'
                boxSizing='border-box'
                display='flex'
                alignItems='center'
                minHeight='75px'
                paddingLeft='16px'
                flexDirection='row'
                paddingRight='16px'
                borderBottom='1px solid #262626'
            >
                <Box
                    component='div'
                    marginRight='-6px'
                    flexShrink='1'
                    flexWrap='nowrap'
                    marginTop='-6px'
                    minWidth='0'
                    marginLeft='-6px'
                    boxSizing='border-box'
                    display='flex'
                    alignItems='center'
                    marginBottom='-6px'
                    flexBasis='0'
                    justifyContent='space-between'
                    flexDirection='row'
                    position='relative'
                    zIndex='0'
                    flexGrow='1'
                >
                    <Box
                        component='div'
                        paddingRight='6px'
                        minWidth='0'
                        flexDirection='column'
                        boxSizing='border-box'
                        display='flex'
                        flexShrink='0'
                        paddingTop='6px'
                        position='relative'
                        zIndex='0'
                        maxWidth='100%'
                        paddingLeft='6px'
                        paddingBottom='6px'
                    >
                        <Box
                            component='div'
                            paddingLeft='0'
                            bgcolor='transparent'
                            paddingTop='0'
                            minWidth='0'
                            width='fit-content'
                            flexBasis='auto'
                            marginTop='0'
                            marginBottom='0'
                            boxSizing='border-box'
                            paddingRight='0'
                            minHeight='0'
                            flexShrink='0'
                            position='relative'
                            marginLeft='0'
                            zIndex='0'
                            paddingBottom='0'
                            textAlign='inherit'
                            marginRight='0'
                            sx={{
                                borderRightStyle: 'solid',
                                borderBottomColor: '#00000066',
                                borderLeftWidth: '0',
                                borderTopColor: '#00000066',
                                touchAction: 'manipulation',
                                borderRightWidth: 0,
                                borderRightColor: '#00000066',
                                borderTopWidth: 0,
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
                            onClick={props.onClickChatMembers}
                        >
                            <ChatAvatar
                                photoUrls={photoUrls}
                                containerSize={44}
                                avatarSize={photoUrls.length > 1 ? 32 : 44}
                                dense />
                        </Box>
                    </Box>
                    <Box
                        component='div'
                        paddingRight='6px'
                        flexShrink='1'
                        minWidth='0'
                        flexDirection='column'
                        boxSizing='border-box'
                        display='flex'
                        paddingTop='6px'
                        flexBasis='0'
                        position='relative'
                        zIndex='0'
                        flexGrow='1'
                        maxWidth='100%'
                        paddingLeft='6px'
                        paddingBottom='6px'
                    >
                        <Box
                            component='div'
                            paddingLeft='0'
                            bgcolor='transparent'
                            paddingTop='0'
                            minWidth='0'
                            width='fit-content'
                            flexBasis='auto'
                            marginTop='0'
                            marginBottom='0'
                            boxSizing='border-box'
                            display='inline-flex'
                            maxWidth='100%'
                            paddingRight='0'
                            minHeight='0'
                            flexShrink='0'
                            position='relative'
                            marginLeft='0'
                            zIndex='0'
                            paddingBottom='0'
                            textAlign='inherit'
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
                            onClick={props.onClickChatMembers}
                        >
                            <Box
                                component='div'
                                bgcolor='transparent'
                                width='fit-content'
                                flexDirection='column'
                                boxSizing='border-box'
                                display='flex'
                                flexShrink='0'
                                position='static'
                                alignItems='stretch'
                                alignSelf='auto'
                                justifyContent='flex-start'
                                flexGrow='0'
                                maxWidth='100%'
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
                                    bgcolor='transparent'
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
                                    <Box
                                        component='span'
                                        lineHeight='20px'
                                        fontSize='16px'
                                        minWidth='0'
                                        marginBottom='0!important'
                                        fontWeight='600'
                                        position='relative'
                                        display='block'
                                        maxWidth='100%'
                                        marginLeft='0!important'
                                        marginTop='0!important'
                                        color='#F5F5F5'
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
                                            {usernames}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    component='div'
                    display='flex'
                    paddingLeft='12px'
                    justifyContent='flex-end'
                >
                    <Box
                        component='div'
                        paddingLeft='8px'
                        display='flex'
                        paddingRight='0'
                        paddingTop='0'
                        marginTop='0'
                    >
                        <Box
                            component='div'
                            justifyContent='center'
                            paddingLeft='0'
                            bgcolor='transparent'
                            paddingTop='0'
                            marginTop='0'
                            marginBottom='0'
                            boxSizing='border-box'
                            display='flex'
                            alignItems='center'
                            paddingRight='0'
                            marginLeft='0'
                            paddingBottom='0'
                            textAlign='inherit'
                            marginRight='0'
                            sx={{
                                cursor: 'pointer',
                                touchAction: 'manipulation',
                                borderRightStyle: 'none',
                                borderLeft: '0',
                                borderBottomStyle: 'none',
                                borderTopStyle: 'none',
                                borderRight: '0',
                                borderBottom: '0',
                                borderTop: '0',
                            }}
                            onClick={props.onClickChatDetails}
                        >
                            <Box
                                component='div'
                                justifyContent='center'
                                flexDirection='column'
                                display='flex'
                                alignItems='center'
                            >
                                {props.isViewingChatDetails ? (
                                    <svg aria-label='Conversation information'
                                         style={{ position: 'relative', display: 'block' }}
                                         color='rgb(245, 245, 245)'
                                         fill='rgb(245, 245, 245)'
                                         height='24'
                                         role='img'
                                         viewBox='0 0 24 24'
                                         width='24'>
                                        <title>Conversation information</title>
                                        <path
                                            d='M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm-.182 5.955a1.25 1.25 0 1 1-1.25 1.25 1.25 1.25 0 0 1 1.25-1.25Zm1.614 11.318h-2.865a1 1 0 0 1 0-2H11V12.05h-.432a1 1 0 0 1 0-2H12a1 1 0 0 1 1 1v4.727h.433a1 1 0 1 1 0 2Z' />
                                    </svg>
                                ) : (
                                    <svg aria-label='Conversation information'
                                         style={{ position: 'relative', display: 'block' }}
                                         color='rgb(245, 245, 245)'
                                         fill='rgb(245, 245, 245)'
                                         height='24'
                                         role='img'
                                         viewBox='0 0 24 24'
                                         width='24'>
                                        <title>Conversation information</title>
                                        <circle
                                            cx='12.001'
                                            cy='12.005'
                                            fill='none'
                                            r='10.5'
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2' />
                                        <circle
                                            cx='11.819'
                                            cy='7.709'
                                            r='1.25' />
                                        <line
                                            fill='none'
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            x1='10.569'
                                            x2='13.432'
                                            y1='16.777'
                                            y2='16.777' />
                                        <polyline
                                            fill='none'
                                            points='10.569 11.05 12 11.05 12 16.777'
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2' />
                                    </svg>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}