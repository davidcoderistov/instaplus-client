import { useMemo } from 'react'
import Box from '@mui/material/Box'


interface Props {
    type: 'single' | 'group'
    empty?: boolean
    lhs?: boolean
    rhs?: boolean
    creator?: {
        id: string | number
        username: string | number
    }
    replyCreator?: {
        id: string | number
        username: string | number
    }
    authUserId: string | number
    reply?: boolean
}

export default function ChatMessageTitle(props: Props) {

    const title = useMemo(() => {
        if (props.reply) {
            if (props.creator?.id === props.replyCreator?.id) {
                return props.lhs ? `${props.creator?.username} replied to themself` : 'You replied to yourself'
            }
            return props.lhs ? `${props.creator?.username} replied to ${props.replyCreator?.id === props.authUserId ? 'you' : props.type === 'group' ? props.replyCreator?.username : 'you'}` : props.rhs ? `You replied to ${props.replyCreator?.username}` : null
        }
        return props.creator?.username
    }, [props.lhs, props.rhs, props.authUserId, props.type, props.reply, props.creator, props.replyCreator])

    return (
        <Box
            component='h4'
            fontSize='inherit'
            fontWeight='inherit'
            color='inherit'
            margin='0'
            padding='0'
            sx={{
                outline: 'none',
            }}
        >
            {props.empty ? (
                <Box
                    component='span'
                    height='1px'
                    width='1px'
                    position='absolute'
                    sx={{
                        clip: 'rect(0,0,0,0)',
                        overflowX: 'hidden',
                        clipPath: 'inset(50%)',
                        overflowY: 'hidden',
                    }}
                >
                    Message title
                </Box>
            ) : (
                <Box
                    component='div'
                    flexDirection='column'
                    display='flex'
                    sx={{ ...props.rhs && { alignItems: 'flex-end' } }}
                >
                    <Box
                        component='div'
                        paddingLeft='50px'
                        alignSelf='stretch'
                        paddingRight='22px'
                        flexDirection='column'
                        bgcolor='#000000'
                        display='flex'
                        alignItems='inherit'
                        flexGrow='0'
                        maxWidth='100%'
                        justifyContent='flex-end'
                    >
                        <Box
                            component='div'
                            paddingTop='10px'
                            display='flex'
                            alignItems='center'
                            paddingBottom='6px'
                            sx={{
                                ...props.rhs && { paddingRight: '8px' },
                                ...props.lhs && { paddingLeft: props.reply ? '8px' : '12px' },
                            }}
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
                                {title}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    )
}