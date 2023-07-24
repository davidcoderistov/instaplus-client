import { Box, Dialog, IconButton, Typography } from '@mui/material'
import ReactionUser from './ReactionUser'
import { Close } from '@mui/icons-material'
import { Reaction } from '../../types/Message'


interface Props {
    open: boolean
    reactions: Reaction[]
    onCloseModal: () => void
}

export default function ViewReactionsModal(props: Props) {

    return (
        <Dialog
            open={props.open}
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#262626',
                    borderRadius: '12px',
                    maxWidth: '400px',
                    height: '340px',
                },
            }}
            onClose={props.onCloseModal}
        >
            <Box
                component='div'
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                alignItems='center'
                borderBottom='1px solid #363636'
            >
                <Box component='div' />
                <Typography
                    color='#FFFFFF'
                    position='absolute'
                    left='50%'
                    sx={{
                        transform: 'translateX(-50%)',
                    }}
                >
                    Reactions
                </Typography>
                <IconButton
                    aria-label='close'
                    onClick={props.onCloseModal}
                >
                    <Close sx={{ color: '#FFFFFF' }} />
                </IconButton>
            </Box>
            <Box
                component='div'
                display='block'
                width='100%'
                height='100%'
                paddingY='8px'
                sx={{ overflowX: 'hidden', overflowY: 'auto' }}
            >
                {props.reactions.map(reaction => (
                    <ReactionUser
                        key={reaction._id}
                        _id={reaction._id}
                        reaction={reaction.reaction}
                        creator={reaction.creator} />
                ))}
            </Box>
        </Dialog>
    )
}