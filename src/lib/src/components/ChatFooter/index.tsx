import Box from '@mui/material/Box'
import ChatFooterWrapper from './ChatFooter'
import { Message } from '../../types/Message'


interface Props {
    authUserId: string
    replyingMessage: Message | null

    onSendMessage(message: string): void

    onSendLike(): void

    onUploadFile(file: File): void

    onCancelReply(): void
}

export default function ChatFooter(props: Props) {

    return (
        <Box
            component='div'
            display='block'
        >
            {props.replyingMessage && (
                <Box
                    component='div'
                    paddingLeft='15px'
                    bgcolor='#000000'
                    paddingBottom='3px'
                    paddingTop='10px'
                    display='flex'
                    justifyContent='space-between'
                    alignItems='flex-start'
                    paddingRight='15px'
                    borderTop='1px solid #262626'
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
                                            {props.authUserId === props.replyingMessage.creator.id ? 'yourself' : props.replyingMessage.creator.username}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                component='div'
                                minWidth='0'
                                flexDirection='column'
                                flexBasis='auto'
                                boxSizing='border-box'
                                display='flex'
                                minHeight='0'
                                flexShrink='0'
                                alignItems='stretch'
                                position='relative'
                                zIndex='0'
                            >
                                <Box
                                    component='span'
                                    color='#8E8E8E'
                                    minWidth='0'
                                    textAlign='left'
                                    lineHeight='1.2308'
                                    fontSize='0.8125rem'
                                    display='block'
                                    fontWeight='normal'
                                    maxWidth='100%'
                                    sx={{
                                        wordWrap: 'break-word',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    <Box
                                        component='div'
                                        color='#8E8E8E'
                                        display='block'
                                    >
                                        {props.replyingMessage.text ? props.replyingMessage.text : props.replyingMessage.videoUrl ? 'Video' : props.replyingMessage.photoUrl ? 'Image' : null}
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
            <ChatFooterWrapper
                isReplying={!!props.replyingMessage}
                onSendMessage={props.onSendMessage}
                onSendLike={props.onSendLike}
                onUploadFile={props.onUploadFile} />
        </Box>
    )
}