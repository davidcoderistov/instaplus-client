import Box from '@mui/material/Box'
import Button from '../Button'


interface Props {
    onSendMessage(): void
}

export default function ChatOverview(props: Props) {

    return (
        <Box
            component='div'
            flexShrink='1'
            minWidth='317px'
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
                    boxSizing='border-box'
                    display='flex'
                    minHeight='0'
                    position='relative'
                    flexBasis='100%'
                    zIndex='0'
                    flexGrow='1'
                    maxWidth='100%'
                >
                    <Box
                        component='div'
                        justifyContent='center'
                        flexDirection='column'
                        boxSizing='border-box'
                        display='flex'
                        minHeight='0'
                        position='relative'
                        zIndex='0'
                        flexGrow='1'
                    >
                        {/* Loading here */}
                        <Box
                            component='div'
                            flexDirection='column'
                            boxSizing='border-box'
                            display='flex'
                            alignItems='center'
                            flexShrink='0'
                            position='relative'
                            zIndex='0'
                            maxWidth='100%'
                        >
                            <svg
                                style={{ display: 'block', position: 'relative' }}
                                color='rgb(245, 245, 245)'
                                fill='rgb(245, 245, 245)'
                                height='96'
                                role='img'
                                viewBox='0 0 96 96'
                                width='96'>
                                <path
                                    d='M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0Zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46Zm12.227-53.284-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 0 0-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 0 1 1.661-.005l5.373 4.031a3.453 3.453 0 0 0 4.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453ZM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 0 0 2.582 1.629l4.563-2.013a1.844 1.844 0 0 1 1.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25Zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 0 0-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 0 0-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31Z' />
                            </svg>
                        </Box>
                        <Box
                            component='div'
                            flexDirection='column'
                            boxSizing='border-box'
                            display='flex'
                            alignItems='center'
                            flexShrink='0'
                            position='relative'
                            zIndex='0'
                            paddingTop='20px'
                            maxWidth='100%'
                        >
                            <Box
                                component='span'
                                lineHeight='25px'
                                fontWeight='400'
                                minWidth='0'
                                marginBottom='0!important'
                                color='#F5F5F5'
                                textAlign='center'
                                marginRight='0!important'
                                position='relative'
                                fontSize='20px'
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
                                Your messages
                            </Box>
                        </Box>
                        <Box
                            component='div'
                            flexDirection='column'
                            boxSizing='border-box'
                            display='flex'
                            alignItems='center'
                            flexShrink='0'
                            position='relative'
                            zIndex='0'
                            paddingTop='16px'
                            maxWidth='100%'
                        >
                            <Box
                                component='div'
                                display='block'
                                maxWidth='480px'
                            >
                                <Box
                                    component='div'
                                    lineHeight='18px'
                                    fontSize='14px'
                                    fontWeight='400'
                                    minWidth='0'
                                    marginBottom='0!important'
                                    textAlign='center'
                                    marginRight='0!important'
                                    color='#A8A8A8'
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
                                    Send private photos and messages to a friend or group
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            component='div'
                            flexDirection='column'
                            boxSizing='border-box'
                            display='flex'
                            alignItems='center'
                            flexShrink='0'
                            position='relative'
                            zIndex='0'
                            paddingTop='20px'
                            maxWidth='100%'
                        >
                            <Button
                                variant='primary'
                                text='Send message'
                                contained
                                onClick={props.onSendMessage} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}