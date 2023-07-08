import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'


interface Props {
    username: string
    photoUrl?: string | null
}

export default function UserAvatar(props: Props) {

    return (
        <Box
            component='div'
            borderRadius='0'
            marginRight='16px'
            bgcolor='transparent'
            flexDirection='column'
            boxSizing='border-box'
            display='flex'
            flexShrink='0'
            position='static'
            alignItems='stretch'
            alignSelf='auto'
            justifyContent='flex-start'
            marginLeft='16px'
            flexGrow='0'
            sx={{
                overflowY: 'visible',
                overflowX: 'visible',
            }}
        >
            <Box
                component='div'
                alignItems='stretch'
                border='0'
                boxSizing='border-box'
                display='flex'
                flexDirection='column'
                flexShrink='0'
                fontSize='100%'
                marginBottom='14px'
                marginTop='18px'
                padding='0'
                position='relative'
                sx={{ verticalAlign: 'baseline' }}
            >
                <Box
                    component='div'
                    width='100%'
                    display='block'
                    maxWidth='100%'
                >
                    <Box
                        component='div'
                        borderRadius='0'
                        padding='0'
                        bgcolor='transparent'
                        flexDirection='column'
                        boxSizing='border-box'
                        display='flex'
                        position='static'
                        alignItems='stretch'
                        justifyContent='flex-start'
                        sx={{
                            overflowY: 'visible',
                            overflowX: 'visible',
                        }}
                    >
                        <Box
                            component='div'
                            justifyContent='center'
                            minWidth='0'
                            flexDirection='column'
                            boxSizing='border-box'
                            display='flex'
                            alignItems='stretch'
                            position='relative'
                            flexGrow='1'
                        >
                            <Box
                                component='div'
                                flexWrap='nowrap'
                                boxSizing='border-box'
                                display='flex'
                                alignItems='center'
                                flexShrink='0'
                                justifyContent='space-between'
                                flexDirection='row'
                                position='relative'
                            >
                                <Box
                                    component='div'
                                    minWidth='0'
                                    flexDirection='column'
                                    alignSelf='center'
                                    boxSizing='border-box'
                                    display='flex'
                                    flexShrink='0'
                                    position='relative'
                                    maxWidth='100%'
                                >
                                    <Box
                                        component='div'
                                        marginRight='12px'
                                        borderRadius='0'
                                        bgcolor='transparent'
                                        flexDirection='column'
                                        boxSizing='border-box'
                                        display='flex'
                                        flexShrink='0'
                                        position='static'
                                        alignItems='stretch'
                                        alignSelf='auto'
                                        justifyContent='flex-start'
                                        flexGrow='0'
                                        sx={{
                                            overflowY: 'visible',
                                            overflowX: 'visible',
                                        }}
                                    >
                                        <Box
                                            component='div'
                                            height='28px'
                                            width='28px'
                                            borderRadius='50%'
                                            bgcolor='#1A1A1A'
                                            boxSizing='border-box'
                                            flexShrink='0'
                                            position='relative'
                                            display='block'
                                            overflow='hidden'
                                        >
                                            {props.photoUrl ? (
                                                <img
                                                    alt={`${props.username} profile picture`}
                                                    style={{
                                                        fontSize: '100%',
                                                        width: '100%',
                                                        height: '100%',
                                                        verticalAlign: 'baseline',
                                                        padding: '0',
                                                        margin: '0',
                                                        border: '0',
                                                    }}
                                                    src={props.photoUrl} />
                                            ) : (
                                                <Avatar sx={{ height: 28, width: 28 }} />
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    component='div'
                                    flexShrink='1'
                                    minWidth='0'
                                    flexBasis='auto'
                                    boxSizing='border-box'
                                    display='flex'
                                    alignItems='center'
                                    justifyContent='space-between'
                                    flexDirection='row'
                                    position='relative'
                                    flexGrow='1'
                                    flexWrap='wrap'
                                >
                                    <Box
                                        component='div'
                                        minWidth='0'
                                        flexDirection='column'
                                        boxSizing='border-box'
                                        display='flex'
                                        flexShrink='0'
                                        position='relative'
                                        flexGrow='1'
                                        maxWidth='100%'
                                    >
                                        <Box
                                            component='div'
                                            borderRadius='0'
                                            bgcolor='transparent'
                                            minWidth='0'
                                            flexDirection='column'
                                            boxSizing='border-box'
                                            display='flex'
                                            minHeight='0'
                                            position='static'
                                            alignSelf='auto'
                                            justifyContent='flex-start'
                                            flexGrow='1'
                                            alignItems='flex-start'
                                            sx={{
                                                overflowY: 'visible',
                                                overflowX: 'visible',
                                            }}
                                        >
                                            <Box
                                                component='span'
                                                lineHeight='18px'
                                                fontSize='14px'
                                                minWidth='0'
                                                color='#F5F5F5'
                                                margin='0!important'
                                                fontWeight='600'
                                                position='relative'
                                                display='block'
                                                maxWidth='100%'
                                                sx={{
                                                    overflowY: 'visible',
                                                    overflowX: 'visible',
                                                    wordWrap: 'break-word',
                                                    whiteSpace: 'pre-line',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                <Box
                                                    component='span'
                                                    overflow='hidden'
                                                    display='block'
                                                    maxWidth='100%'
                                                    sx={{
                                                        whiteSpace: 'no-wrap',
                                                        textOverflow: 'ellipsis',
                                                    }}
                                                >
                                                    {props.username}
                                                </Box>
                                            </Box>
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