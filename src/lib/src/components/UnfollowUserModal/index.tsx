import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'


interface Props {
    open: boolean
    user: {
        id: string | number
        username: string
        photoUrl?: string | null
    }
    onUnfollowUser: (id: string | number) => void
    onCloseModal: () => void
}

export default function UnfollowUserModal(props: Props) {

    const handleUnfollowUser = () => props.onUnfollowUser(props.user.id)

    return (
        <Dialog
            open={props.open}
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: '#262626',
                    borderRadius: '12px',
                    maxWidth: '400px',
                },
            }}
            sx={{ zIndex: 999999 }}
            onClose={props.onCloseModal}
        >
            <Box
                component='div'
                justifyContent='center'
                flexDirection='column'
                display='flex'
                alignItems='center'
                overflow='hidden'
                position='relative'
                zIndex='0'
                boxSizing='content-box'
            >
                <Box
                    component='div'
                    width='400px'
                    flexShrink='1'
                    position='relative'
                    display='block'
                >
                    <Box
                        component='div'
                        display='flex'
                        flexDirection='column'
                    >
                        <Box
                            component='div'
                            flexDirection='column'
                            display='flex'
                            padding='32px'
                        >
                            <Box
                                component='div'
                                alignSelf='center'
                                marginBottom='32px'
                                display='block'
                            >
                                <Box
                                    component='div'
                                    width='90px'
                                    height='90px'
                                    borderRadius='50%'
                                    bgcolor='#121212'
                                    boxSizing='border-box'
                                    overflow='hidden'
                                    position='relative'
                                    display='block'
                                >
                                    {props.user.photoUrl ? (
                                        <img
                                            alt={`${props.user.username} profile picture`}
                                            style={{
                                                fontSize: '100%',
                                                width: '100%',
                                                height: '100%',
                                                verticalAlign: 'baseline',
                                                padding: '0',
                                                margin: '0',
                                                border: '0',
                                            }}
                                            src={props.user.photoUrl} />
                                    ) : (
                                        <Avatar sx={{ height: 90, width: 90 }} />
                                    )}
                                </Box>
                            </Box>
                            <Box
                                component='span'
                                lineHeight='18px'
                                fontSize='14px'
                                overflow='visible'
                                fontWeight='400'
                                minWidth='0'
                                marginBottom='0!important'
                                color='#F5F5F5'
                                textAlign='center'
                                marginRight='0!important'
                                position='relative'
                                display='block'
                                maxWidth='100%'
                                marginLeft='0!important'
                                marginTop='0!important'
                                sx={{
                                    wordWrap: 'break-word',
                                    whiteSpace: 'pre-line',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {`If you change your mind, you'll have to request to follow @${props.user.username} again.`}
                            </Box>
                        </Box>
                        <Button
                            variant='text'
                            fullWidth
                            color='error'
                            size='large'
                            sx={{
                                color: '#ED4956',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'inherit',
                                },
                                borderTop: '1px solid #363636',
                                borderBottom: '1px solid #363636',
                            }}
                            onClick={handleUnfollowUser}
                            disableElevation
                            disableRipple
                        >
                            Unfollow
                        </Button>
                        <Button
                            variant='text'
                            fullWidth
                            sx={{
                                color: '#F5F5F5',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'inherit',
                                },
                            }}
                            onClick={props.onCloseModal}
                            disableElevation
                            disableRipple
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}