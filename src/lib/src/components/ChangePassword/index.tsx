import React from 'react'
import { useForm, FieldPath } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PasswordInput from '../PasswordInput'


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

interface FormData {
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}

const validationSchema = yup.object().shape({
    oldPassword: yup.string()
        .required('Old password is required')
        .min(8, 'Old password must be at least 8 characters'),
    newPassword: yup.string()
        .required('New password is required')
        .min(8, 'New password must be at least 8 characters'),
    confirmNewPassword: yup.string()
        .required('Confirm new password is required')
        .min(8, 'Confirm new password must be at least 8 characters')
        .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
})

export interface ChangePasswordProps {
    data: FormData
    setServerError: (name: FieldPath<FormData>, message: string) => void
}

interface Props {
    authUser: {
        username: string
        photoUrl: string | null
    }
    isChangingPassword: boolean

    onChangePassword(props: ChangePasswordProps): void
}

export default function ChangePassword(props: Props) {

    const { register, handleSubmit, formState: { errors, isDirty }, setError } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    })

    const setServerError = (name: FieldPath<FormData>, message: string) => {
        setError(name, { message })
    }

    const handleChangePassword = (data: FormData) => {
        props.onChangePassword({ data, setServerError })
    }

    return (
        <Container component='main' maxWidth='sm'>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 4,
                }}
            >
                <Typography component='h1' variant='h5' sx={{ mb: 2 }} alignSelf='flex-start'>
                    Change password
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12}>
                        <Box
                            component='div'
                            display='flex'
                            flexDirection='row'
                            justifyContent='flex-start'
                            alignItems='center'
                            columnGap='10px'
                        >
                            <Box
                                component='div'
                                minWidth='0'
                                flexDirection='column'
                                alignSelf='center'
                                boxSizing='border-box'
                                display='flex'
                                flexShrink='0'
                                position='relative'
                                zIndex='0'
                                maxWidth='100%'
                            >
                                <Box
                                    component='div'
                                    marginRight='4px'
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
                                        component='div'
                                        alignSelf='center'
                                        display='block'
                                        flex='none'
                                        position='relative'
                                    >
                                        <Box
                                            component='div'
                                            width='44px'
                                            height='44px'
                                            borderRadius='50%'
                                            padding='0'
                                            minWidth='0'
                                            flexDirection='column'
                                            flexBasis='auto'
                                            margin='0'
                                            boxSizing='border-box'
                                            display='flex'
                                            minHeight='0'
                                            alignItems='stretch'
                                            position='relative'
                                            zIndex='0'
                                            textAlign='inherit'
                                            overflow='hidden'
                                            sx={{
                                                borderStyle: 'solid',
                                                borderColor: '#00000066',
                                                borderWidth: '0',
                                                touchAction: 'manipulation',
                                                outlineStyle: 'none',
                                            }}
                                        >
                                            {props.authUser.photoUrl ? (
                                                <img
                                                    alt={`${props.authUser.username} profile picture`}
                                                    style={{
                                                        fontSize: '100%',
                                                        width: '100%',
                                                        height: '100%',
                                                        verticalAlign: 'baseline',
                                                        padding: '0',
                                                        margin: '0',
                                                        border: '0',
                                                        overflowClipMargin: 'content-box',
                                                        overflow: 'clip',
                                                    }}
                                                    src={props.authUser.photoUrl} />
                                            ) : (
                                                <Avatar sx={{ height: 44, width: 44 }} />
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                component='div'
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'
                                alignItems='flex-start'
                            >
                                <Box
                                    component='span'
                                    lineHeight='18px'
                                    fontSize='14px'
                                    minWidth='0'
                                    margin='0!important'
                                    color='#F5F5F5'
                                    fontWeight='600'
                                    position='relative'
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
                                    <Box
                                        component='span'
                                        display='block'
                                        overflow='hidden'
                                        maxWidth='100%'
                                        sx={{
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        <Box
                                            component='div'
                                            borderRadius='0'
                                            bgcolor='transparent'
                                            minWidth='0'
                                            boxSizing='border-box'
                                            display='flex'
                                            minHeight='0'
                                            position='static'
                                            alignItems='stretch'
                                            flexDirection='row'
                                            justifyContent='flex-start'
                                            marginLeft='0'
                                            sx={{
                                                overflowY: 'visible',
                                                overflowX: 'visible',
                                            }}
                                        >
                                            {props.authUser.username}
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box component='form' onSubmit={handleSubmit(handleChangePassword)} noValidate sx={{ mt: 1 }}>
                    <ThemeProvider theme={darkTheme}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <PasswordInput
                                    id='oldPassword'
                                    label='Old Password'
                                    dark
                                    {...register('oldPassword')}
                                    error={Boolean(errors.oldPassword)}
                                    errorMessage={errors.oldPassword?.message as string ?? ''} />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordInput
                                    id='newPassword'
                                    label='New Password'
                                    dark
                                    {...register('newPassword')}
                                    error={Boolean(errors.newPassword)}
                                    errorMessage={errors.newPassword?.message as string ?? ''} />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordInput
                                    id='confirmNewPassword'
                                    label='Confirm New Password'
                                    dark
                                    {...register('confirmNewPassword')}
                                    error={Boolean(errors.confirmNewPassword)}
                                    errorMessage={errors.confirmNewPassword?.message as string ?? ''} />
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                    <LoadingButton
                        type='submit'
                        variant='contained'
                        loading={props.isChangingPassword}
                        disabled={!isDirty}
                        sx={{
                            mt: 2,
                            mb: 2,
                            textTransform: 'none',
                            '&.Mui-disabled': { color: '#A8A8A8', backgroundColor: '#0069AD' },
                            '&.MuiLoadingButton-loading': { color: '#1976D2', backgroundColor: '#1976D2' },
                            '.MuiLoadingButton-loadingIndicator': { color: '#FFFFFF' },
                        }}
                    >
                        Submit
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    )
}