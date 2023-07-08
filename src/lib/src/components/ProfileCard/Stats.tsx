import { useMemo } from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import { formatNumber } from '../../utils'


interface Props {
    loading: boolean
    title?: string
    count?: number
}

export default function Stats(props: Props) {

    const count = useMemo(() => {
        if (!props.loading) {
            return formatNumber(props.count)
        }
        return null
    }, [props.loading, props.count])

    return (
        <Box
            component='div'
            paddingX='8px'
            paddingY='0'
            display='block'
            textAlign='center'
        >
            <Box
                component='div'
            >
                <Box
                    component='span'
                    lineHeight='18px'
                    display='inline'
                    fontSize='14px'
                    minWidth='0'
                    margin='0'
                    color='#F5F5F5'
                    fontWeight='700'
                    maxWidth='100%'
                    sx={{
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-line',
                        wordBreak: 'break-word',
                    }}
                >
                    {props.loading ? (
                        <Box
                            component='div'
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Skeleton
                                variant='rounded'
                                sx={{
                                    width: '35%',
                                    backgroundColor: '#202020',
                                    borderRadius: '4px',
                                }} />
                        </Box>
                    ) : count}
                </Box>
            </Box>
            <Box
                component='div'
            >
                <Box
                    component='span'
                    lineHeight='18px'
                    display='inline'
                    fontSize='14px'
                    minWidth='0'
                    margin='0'
                    color='#F5F5F5'
                    fontWeight='400'
                    maxWidth='100%'
                    sx={{
                        wordWrap: 'break-word',
                        whiteSpace: 'pre-line',
                        wordBreak: 'break-word',
                    }}
                >
                    {props.loading ? (
                        <Box
                            component='div'
                            display='flex'
                            flexDirection='column'
                            justifyContent='center'
                            alignItems='center'
                        >
                            <Skeleton
                                variant='rounded'
                                sx={{
                                    width: '60%',
                                    backgroundColor: '#202020',
                                    borderRadius: '4px',
                                }} />
                        </Box>
                    ) : props.title}
                </Box>
            </Box>
        </Box>
    )
}