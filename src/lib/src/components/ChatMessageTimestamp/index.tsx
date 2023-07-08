import { useMemo } from 'react'
import Box from '@mui/material/Box'
import moment from 'moment'


interface Props {
    timestamp: number
}

export default function ChatMessageTimestamp(props: Props) {

    const ago = useMemo(() => {
        const now = moment()
        const date = moment(props.timestamp)
        const diffInDays = now.diff(date, 'days')
        if (diffInDays < 1) {
            return date.format('LT')
        } else if (diffInDays < 2) {
            return `Yesterday ${date.format('LT')}`
        } else if (diffInDays < 7) {
            return date.format('dddd LT')
        } else {
            return date.format('MMMM D, YYYY LT')
        }
    }, [props.timestamp])

    return (
        <Box
            component='div'
            display='block'
        >
            <Box
                component='div'
                position='relative'
                display='block'
            >
                <Box
                    component='div'
                    flexDirection='column'
                    bgcolor='#000000'
                    display='flex'
                    alignItems='inherit'
                    maxWidth='100%'
                    justifyContent='flex-end'
                >
                    <Box
                        component='div'
                        paddingTop='16px'
                        paddingRight='20px'
                        paddingLeft='20px'
                        paddingBottom='16px'
                        display='block'
                    >
                        <Box
                            component='div'
                            margin='auto'
                            textAlign='center'
                            maxWidth='457px'
                            display='block'
                            sx={{ wordBreak: 'break-word' }}
                        >
                            <Box
                                component='h3'
                                fontSize='inherit'
                                fontWeight='inherit'
                                color='inherit'
                                outline='none'
                            >
                                <Box
                                    component='div'
                                    marginTop='2px'
                                    marginBottom='2px'
                                    textAlign='center'
                                    display='block'
                                >
                                    <Box
                                        component='span'
                                        lineHeight='1.3333'
                                        minWidth='0'
                                        fontSize='0.75rem'
                                        display='block'
                                        fontWeight='normal'
                                        maxWidth='100%'
                                        color='#65676B'
                                        sx={{
                                            wordWrap: 'break-word',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        <Box
                                            component='span'
                                            fontWeight='500'
                                        >
                                            {ago}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}