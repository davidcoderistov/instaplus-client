import Box from '@mui/material/Box'
import ChatMessagePhoto from '../ChatMessagePhoto'


interface TextReplyProps {
    lhs?: true
    rhs?: true
    message: string
    photoUrl?: never
    orientation?: never
    isVideo?: never
    onClick?: never
}

interface MediaReplyProps {
    lhs?: true
    rhs?: true
    message?: never
    photoUrl: string
    orientation: 'portrait' | 'landscape'
    isVideo?: boolean

    onClick(): void
}

type Props = TextReplyProps | MediaReplyProps

export default function ChatMessageReply(props: Props) {

    return (
        <Box
            component='div'
            alignItems={props.lhs ? 'flex-start' : 'flex-end'}
            flexDirection='column'
            display='flex'
        >
            <Box
                component='div'
                paddingLeft='50px'
                alignSelf='stretch'
                paddingRight='22px'
                flexDirection='column'
                bgcolor='#000000'
                display='flex'
                flexGrow='1'
                alignItems='inherit'
                maxWidth='100%'
                justifyContent='flex-end'
            >
                <Box
                    component='div'
                    marginBottom='6px'
                    position='relative'
                    display='block'
                    sx={{
                        ...props.lhs && { paddingLeft: '12px' },
                        ...props.rhs && { paddingRight: '12px' },
                    }}
                >
                    {props.lhs && (
                        <Box
                            component='div'
                            height='100%'
                            width='4px'
                            bgcolor='#262626'
                            left='0'
                            top='0'
                            position='absolute'
                            display='block'
                            sx={{
                                borderTopLeftRadius: '2px',
                                borderTopRightRadius: '2px',
                                borderBottomLeftRadius: '2px',
                                borderBottomRightRadius: '2px',
                            }}
                        />
                    )}
                    <Box
                        component='div'
                        paddingLeft='0'
                        bgcolor='transparent'
                        paddingTop='0'
                        minWidth='0'
                        flexBasis='auto'
                        marginTop='0'
                        marginBottom='0'
                        boxSizing='border-box'
                        paddingRight='0'
                        minHeight='0'
                        flexShrink='0'
                        alignItems='stretch'
                        flexDirection='row'
                        position='relative'
                        marginLeft='0'
                        display='block'
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
                            userSelect: 'none',
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
                    >
                        {props.message ? (
                            <Box
                                component='div'
                                zIndex='1'
                                position='relative'
                                maxWidth='100%'
                                display='block'
                            >
                                <Box
                                    component='div'
                                    bgcolor='#262626'
                                    paddingBottom='8px'
                                    paddingRight='12px'
                                    paddingLeft='12px'
                                    paddingTop='8px'
                                    zIndex='1'
                                    maxWidth='564px'
                                    position='relative'
                                    color='#FFFFFF'
                                    display='block'
                                    sx={{
                                        overflowX: 'hidden',
                                        borderBottomLeftRadius: '18px',
                                        borderTopLeftRadius: '18px',
                                        overflowWrap: 'break-word',
                                        borderBottomRightRadius: '18px',
                                        borderTopRightRadius: '18px',
                                        wordBreak: 'break-word',
                                        overflowY: 'hidden',
                                    }}
                                >
                                    <Box
                                        component='div'
                                        height='1px'
                                        boxSizing='border-box'
                                        zIndex='0'
                                        width='1px'
                                        position='absolute'
                                        display='block'
                                        sx={{
                                            clip: 'rect(0,0,0,0)',
                                            overflowX: 'hidden',
                                            clipPath: 'inset(50%)',
                                            overflowY: 'hidden',
                                        }}
                                    />
                                    <Box
                                        component='div'
                                        color='#F5F5F5'
                                        fontSize='0.875rem'
                                        lineHeight='1.333'
                                        display='block'
                                        sx={{
                                            overflowWrap: 'break-word',
                                        }}
                                    >
                                        {props.message}
                                    </Box>
                                </Box>
                            </Box>
                        ) : (
                            <ChatMessagePhoto
                                photoUrl={props.photoUrl}
                                orientation={props.orientation}
                                isVideo={props.isVideo}
                                onClick={props.onClick}
                                reply
                            />
                        )}
                    </Box>
                    {props.rhs && (
                        <Box
                            component='div'
                            right='0'
                            height='100%'
                            width='4px'
                            bgcolor='#262626'
                            top='0'
                            position='absolute'
                            display='block'
                            sx={{
                                borderTopLeftRadius: '2px',
                                borderTopRightRadius: '2px',
                                borderBottomLeftRadius: '2px',
                                borderBottomRightRadius: '2px',
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    )
}