import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'


export default function NotFound() {

    const navigate = useNavigate()

    const handleClickGoBack = () => {
        navigate('/')
    }

    return (
        <Box
            component='div'
            display='block'
            maxWidth='100%'
        >
            <Box
                component='div'
                borderRadius='0'
                padding='40px'
                justifyContent='center'
                bgcolor='transparent'
                flexDirection='column'
                boxSizing='border-box'
                display='flex'
                alignItems='stretch'
                position='relative'
                sx={{
                    overflowY: 'visible',
                    overflowX: 'visible',
                }}
            >
                <Box
                    component='span'
                    lineHeight='30px'
                    minWidth='0'
                    color='#F5F5F5'
                    textAlign='center'
                    margin='0'
                    fontWeight='600'
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
                    Sorry, this page isn't available.
                </Box>
                <Box
                    component='div'
                    borderRadius='0'
                    bgcolor='transparent'
                    marginBottom='20px'
                    flexDirection='column'
                    boxSizing='border-box'
                    display='flex'
                    flexShrink='0'
                    marginTop='40px'
                    alignItems='stretch'
                    alignSelf='auto'
                    justifyContent='flex-start'
                    position='relative'
                    flexGrow='0'
                    sx={{
                        overflowY: 'visible',
                        overflowX: 'visible',
                    }}
                >
                    <Box
                        component='span'
                        lineHeight='20px'
                        fontWeight='400'
                        fontSize='16px'
                        minWidth='0'
                        color='#F5F5F5'
                        textAlign='center'
                        position='relative'
                        display='block'
                        maxWidth='100%'
                        sx={{
                            overflowX: 'visible',
                            overflowY: 'visible',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-line',
                            wordBreak: 'break-word',
                        }}
                    >
                        The link you followed may be broken, or the page may have been removed. <Box
                        component='span'
                        color='#E0F1FF'
                        sx={{
                            cursor: 'pointer',
                        }}
                        onClick={handleClickGoBack}
                    >
                        Go back to InstaPlus.
                    </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}