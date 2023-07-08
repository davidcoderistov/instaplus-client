import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { ExpandCircleDown } from '@mui/icons-material'


interface Props {
    left?: boolean
    right?: boolean

    onClick(): void
}

export default function PostSliderArrow(props: Props) {

    return (
        <Box
            position='absolute'
            top='calc(50% - 23px)'
            sx={{
                ...props.left && {
                    left: '0',
                    paddingLeft: '4px',
                },
                ...props.right && {
                    right: '0',
                    paddingRight: '4px',
                },
            }}
        >
            <IconButton
                disableRipple
                disableFocusRipple
                disableTouchRipple
                onClick={props.onClick}
            >
                <ExpandCircleDown sx={{
                    color: '#F5F5F5',
                    fontSize: 30,
                    opacity: 0.7,
                    transform: `rotate(${props.left ? 90 : 270}deg)`,
                }} />
            </IconButton>
        </Box>
    )
}