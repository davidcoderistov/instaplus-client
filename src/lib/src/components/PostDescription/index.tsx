import Box from '@mui/material/Box'


interface Props {
    description: string

    onClick(hashtag: string): void
}

export default function PostDescription(props: Props) {

    return <>
        {props.description.split(/(#[^\s#]+)/g).map((part, index) => {
            if (part.startsWith('#')) {
                return (
                    <Box
                        key={index}
                        component='span'
                        sx={{
                            whiteSpace: 'pre-wrap',
                            cursor: 'pointer',
                            color: '#E0F1FF',
                        }}
                        onClick={() => props.onClick(part.slice(1))}
                    >
                        {part}
                    </Box>
                )
            } else {
                return (
                    <Box
                        key={index}
                        component='span'
                        sx={{ whiteSpace: 'pre-wrap' }}
                    >
                        {part}
                    </Box>
                )
            }
        })}
    </>
}