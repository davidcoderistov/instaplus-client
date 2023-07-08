import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'


interface Props {
    dense?: boolean
    gutters?: boolean
    username: string
    photoUrl?: string | null
}

export default function PostLikeAvatar(props: Props) {

    const size = props.dense ? '14px' : '20px'

    return (
        <Box
            component='div'
            height={size}
            width={size}
            borderColor='transparent'
            alignItems='stretch'
            border='2px solid #000000'
            borderRadius='50%'
            boxSizing='content-box'
            display='flex'
            flexDirection='column'
            flexShrink='0'
            fontSize='100%'
            margin='0'
            padding='0'
            position='relative'
            sx={{
                cursor: 'pointer',
                verticalAlign: 'baseline',
                ...props.gutters && { marginRight: '-9px' },
            }}
        >
            <Box
                component='span'
                height={size}
                width={size}
                borderRadius='50%'
                bgcolor='#1A1A1A'
                boxSizing='border-box'
                overflow='hidden'
                flexShrink='0'
                position='relative'
                display='block'
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
                    <Avatar sx={{ height: size, width: size }} />
                )}
            </Box>
        </Box>
    )
}