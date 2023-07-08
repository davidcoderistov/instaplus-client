import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'


export default function ChatLoadingSkeleton() {

    return (
        <Box
            component='div'
            flexShrink='1'
            minWidth='425px'
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
                            <Skeleton
                                variant='circular'
                                width={96}
                                height={96}
                                sx={{ backgroundColor: '#202020' }} />
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
                            <Skeleton
                                variant='rounded'
                                width={200}
                                height={20}
                                sx={{
                                    backgroundColor: '#202020',
                                    borderRadius: '8px',
                                }} />
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
                            <Skeleton
                                variant='rounded'
                                width={400}
                                height={11}
                                sx={{
                                    backgroundColor: '#202020',
                                    borderRadius: '8px',
                                }} />
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
                            <Skeleton
                                variant='rectangular'
                                width={110}
                                height={18}
                                sx={{
                                    backgroundColor: '#202020',
                                    borderRadius: '2px',
                                }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}