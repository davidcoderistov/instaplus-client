import Box from '@mui/material/Box'


interface Props {
    title: string
    subtitle: string
}

export default function DataFallback(props: Props) {

    return (
        <Box
            component='div'
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
                component='span'
                lineHeight='30px'
                minWidth='0'
                margin='0!important'
                color='#F5F5F5'
                textAlign='center'
                fontWeight='700'
                position='relative'
                display='block'
                maxWidth='100%'
                fontSize='24px'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word',
                }}
            >
                <Box
                    component='div'
                    display='grid'
                    textAlign='center'
                    paddingLeft='16px'
                    paddingRight='16px'
                    paddingBottom='16px'
                    paddingTop='4px'
                    justifyItems='center'
                    sx={{ gridRowGap: '8px' }}
                >
                    <Box
                        component='div'
                        width='48px'
                        height='48px'
                    >
                        <Box component='div' paddingLeft='8px' paddingTop='12px'>
                            <svg
                                aria-label='InstaPlus'
                                style={{ display: 'block', position: 'relative' }}
                                height='64'
                                color='rgb(245,245,245)'
                                fill='rgb(245,245,245)'
                                role='img'
                                viewBox='0 0 48 48'
                                width='64'
                            >
                                <title>InstaPlus</title>
                                <path
                                    d='M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.012 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.988 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.988 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.012 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z' />
                            </svg>
                        </Box>
                    </Box>
                    <Box
                        component='span'
                        lineHeight='30px'
                        fontSize='24px'
                        display='inline'
                        minWidth='0'
                        margin='0!important'
                        color='#F5F5F5'
                        fontWeight='700'
                        maxWidth='100%'
                        sx={{
                            whiteSpace: 'pre-line',
                            wordBreak: 'break-word',
                            wordWrap: 'break-word',
                        }}
                    >
                        {props.title}
                    </Box>
                    <Box
                        component='span'
                        lineHeight='18px'
                        fontSize='14px'
                        display='inline'
                        minWidth='0'
                        margin='0!important'
                        color='#A8A8A8'
                        fontWeight='400'
                        maxWidth='100%'
                        sx={{
                            whiteSpace: 'pre-line',
                            wordBreak: 'break-word',
                            wordWrap: 'break-word',
                        }}
                    >
                        {props.subtitle}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}