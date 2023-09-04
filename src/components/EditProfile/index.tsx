import React, { useState, useEffect } from 'react'
import { useForm, FieldPath } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import { Check, Close } from '@mui/icons-material'
import Button from '../Button'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import LoadingIconButton from '../LoadingIconButton'
import FileInput from '../FileInput'
import AvatarEditor from 'react-avatar-editor'


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

interface FormData {
    firstName: string
    lastName: string
    username: string
}

interface Editor {
    getImage: () => HTMLCanvasElement
}

const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    username: yup.string().required('Username is required'),
})

export interface SaveProfileProps {
    data: FormData
    setServerError: (name: FieldPath<FormData>, message: string) => void
}

interface Props {
    authUser: {
        firstName: string
        lastName: string
        username: string
        photoUrl: string | null
    }
    isSavingProfile: boolean
    isSavingProfilePhoto: boolean

    onSaveProfile(props: SaveProfileProps): void

    onSaveProfilePhoto(photo: File): void
}

export default function EditProfile(props: Props) {

    const [uploadFile, setUploadFile] = useState<File | null>(null)
    const [editor, setEditor] = useState<Editor | null>(null)

    const { register, handleSubmit, formState: { errors, isDirty }, setError } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    })

    const setServerError = (name: FieldPath<FormData>, message: string) => {
        setError(name, { message })
    }

    const handleEditUser = (data: FormData) => {
        props.onSaveProfile({ data, setServerError })
    }

    const handleChangeProfilePhoto = (files: File[]) => {
        setUploadFile(files[0])
    }

    const [isSavingProfilePhoto, setIsSavingProfilePhoto] = useState(false)

    const handleSaveProfilePhoto = () => {
        if (editor && uploadFile) {
            setIsSavingProfilePhoto(true)

            const delegate = new Promise((resolve) => {
                resolve(undefined)
            })

            delegate.then(() => {
                editor.getImage().toBlob(blob => {
                    const photo = new File([blob], uploadFile.name, { type: blob.type })
                    props.onSaveProfilePhoto(photo)
                    setIsSavingProfilePhoto(false)
                })
            })
        }
    }

    useEffect(() => {
        if (!props.isSavingProfilePhoto) {
            setUploadFile(null)
        }
    }, [props.isSavingProfilePhoto])

    const handleDiscardProfilePhoto = () => {
        setUploadFile(null)
    }

    const setEditorRef = (editor: Editor | null) => {
        setEditor(editor)
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
                                <Button
                                    variant='primary'
                                    text={
                                        <>
                                            Change profile photo
                                            <FileInput onUploadFiles={handleChangeProfilePhoto} />
                                        </>
                                    }
                                    onClick={() => {
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                {uploadFile && (
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sx={{ '&.MuiGrid-item': { paddingTop: 0 } }}>
                            <Box
                                component='div'
                                display='flex'
                                flexDirection='column'
                                justifyContent='center'
                                alignItems='center'
                            >
                                <Box
                                    component='div'
                                    display='flex'
                                    flexDirection='row'
                                    justifyContent='center'
                                    alignItems='center'
                                    columnGap='5px'
                                >
                                    <LoadingIconButton
                                        color='#4caf50'
                                        loading={props.isSavingProfilePhoto || isSavingProfilePhoto}
                                        iconComponent={<Check />}
                                        onClick={handleSaveProfilePhoto} />
                                    <IconButton sx={{ padding: 0 }} onClick={handleDiscardProfilePhoto}>
                                        <Close sx={{ color: '#ED4956' }} />
                                    </IconButton>
                                </Box>
                                <AvatarEditor
                                    ref={setEditorRef}
                                    image={uploadFile}
                                    width={150}
                                    height={150}
                                    border={5}
                                    borderRadius={120}
                                    color={[255, 255, 255, 0.4]}
                                    scale={1.2}
                                    rotate={0}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                )}
                <Box component='form' onSubmit={handleSubmit(handleEditUser)} noValidate sx={{ mt: 1 }}>
                    <ThemeProvider theme={darkTheme}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('firstName')}
                                    error={Boolean(errors.firstName)}
                                    helperText={errors.firstName?.message as string ?? ''}
                                    defaultValue={props.authUser.firstName}
                                    required
                                    fullWidth
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: '#F5F5F5',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#F5F5F5',
                                            },
                                        },
                                    }}
                                    id='firstName'
                                    label='First Name'
                                    autoComplete='firstName' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('lastName')}
                                    error={Boolean(errors.lastName)}
                                    helperText={errors.lastName?.message as string ?? ''}
                                    defaultValue={props.authUser.lastName}
                                    required
                                    fullWidth
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: '#F5F5F5',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#F5F5F5',
                                            },
                                        },
                                    }}
                                    id='lastName'
                                    label='Last Name'
                                    autoComplete='lastName' />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register('username')}
                                    error={Boolean(errors.username)}
                                    helperText={errors.username?.message as string ?? ''}
                                    defaultValue={props.authUser.username}
                                    required
                                    fullWidth
                                    sx={{
                                        '& label.Mui-focused': {
                                            color: '#F5F5F5',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#F5F5F5',
                                            },
                                        },
                                    }}
                                    id='username'
                                    label='Username'
                                    autoComplete='username' />
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                    <LoadingButton
                        type='submit'
                        variant='contained'
                        loading={props.isSavingProfile}
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