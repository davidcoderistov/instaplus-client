import { useAuthUser } from '../../hooks/misc'
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/client'
import { LOGOUT } from '../../graphql/mutations/auth'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import Dialog from '@mui/material/Dialog'


interface Props {
    open: boolean

    onCloseModal(): void
}

export default function LogoutModal(props: Props) {

    const [, setAuthUser] = useAuthUser()

    const { enqueueSnackbar } = useSnackbar()

    const [logout, { loading }] = useMutation(LOGOUT)

    const handleLogout = () => {
        logout().then(() => {
            setAuthUser(null)
            props.onCloseModal()
        }).catch(() => {
            enqueueSnackbar('Could not log out. Please try again later', { variant: 'error' })
        })
    }

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
                            margin='32px'
                            alignItems='stretch'
                            border='0'
                            boxSizing='border-box'
                            display='flex'
                            flexDirection='column'
                            flexShrink='0'
                            fontSize='100%'
                            padding='0'
                            position='relative'
                            textAlign='center'
                            sx={{ verticalAlign: 'baseline' }}
                        >
                            <Box
                                component='span'
                                lineHeight='25px'
                                fontWeight='400'
                                minWidth='0'
                                margin='0!important'
                                color='#F5F5F5'
                                position='relative'
                                fontSize='20px'
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
                                Log out?
                            </Box>
                            <Box
                                component='span'
                                lineHeight='18px'
                                paddingTop='10px'
                                fontSize='14px'
                                fontWeight='400'
                                minWidth='0'
                                margin='0!important'
                                color='#A8A8A8'
                                position='relative'
                                display='block'
                                maxWidth='100%'
                                sx={{
                                    overflowY: 'visible',
                                    wordWrap: 'break-word',
                                    overflowX: 'visible',
                                    whiteSpace: 'pre-line',
                                    wordBreak: 'break-word',
                                }}
                            >
                                If you change your mind, you'll have to login again.
                            </Box>
                        </Box>
                        <LoadingButton
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
                                '.MuiLoadingButton-loadingIndicator': {
                                    color: '#ED4956',
                                },
                                borderTop: '1px solid #363636',
                                borderBottom: '1px solid #363636',
                            }}
                            onClick={handleLogout}
                            loading={loading}
                            disableElevation
                            disableRipple
                        >
                            Log out
                        </LoadingButton>
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
                            Not now
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}