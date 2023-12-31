import React from 'react'
import { useForm, FieldPath } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import PasswordInput from '../PasswordInput'
import Copyright from '../Copyright'
import { LockOutlined } from '@mui/icons-material'


interface FormData {
    username: string
    password: string
}

export interface SignInProps {
    data: FormData
    setServerError: (name: FieldPath<FormData>, message: string) => void
}

interface Props {
    onSignIn: (props: SignInProps) => void
    signingIn: boolean
}

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
})

export default function SignIn(props: Props) {

    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    })

    const setServerError = (name: FieldPath<FormData>, message: string) => {
        setError(name, { message })
    }

    const handleSignIn = (data: FormData) => {
        props.onSignIn({ data, setServerError })
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Box
                sx={{
                    pt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: '#ff007f' }}>
                    <LockOutlined />
                </Avatar>
                <Typography component='h1' variant='h5' sx={{ mb: 2 }}>
                    Sign in
                </Typography>
                <Box component='form' onSubmit={handleSubmit(handleSignIn)} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                {...register('username')}
                                error={Boolean(errors.username)}
                                helperText={errors.username?.message as string ?? ''}
                                required
                                fullWidth
                                id='username'
                                label='Username'
                                autoComplete='username'
                                autoFocus />
                        </Grid>
                        <Grid item xs={12}>
                            <PasswordInput
                                id='password'
                                label='Password'
                                {...register('password')}
                                error={Boolean(errors.password)}
                                errorMessage={errors.password?.message as string ?? ''} />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        type='submit'
                        fullWidth
                        variant='contained'
                        loading={props.signingIn}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Sign In
                    </LoadingButton>
                </Box>
            </Box>
            <Copyright sx={{ mt: 1 }} />
        </Container>
    )
}