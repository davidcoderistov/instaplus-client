import { useState } from 'react'
import { useAuthUser } from '../../hooks/misc'
import { useSnackbar } from 'notistack'
import { useMutation, ApolloError } from '@apollo/client'
import { UPDATE_USER, CHANGE_PROFILE_PHOTO, CHANGE_PASSWORD } from '../../graphql/mutations/auth'
import {
    UpdateUserMutationType,
    ChangeProfilePhotoMutationType,
    ChangePasswordMutationType,
} from '../../graphql/types/mutations/auth'
import Box from '@mui/material/Box'
import SettingsMenuItem from './SettingsMenuItem'
import LogoutModal from '../LogoutModal'
import EditProfile, { SaveProfileProps } from '../../lib/src/components/EditProfile'
import ChangePassword, { ChangePasswordProps } from '../../lib/src/components/ChangePassword'
import { AuthUser } from '../../graphql/types/models'
import { User } from '../../types'
import { getValidationError } from '../../utils'


export default function ProfileSettings() {

    const [activeStep, setActiveStep] = useState(1)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

    const handleClickEditProfile = () => {
        if (activeStep !== 1) {
            setActiveStep(1)
        }
    }

    const handleClickChangePassword = () => {
        if (activeStep !== 2) {
            setActiveStep(2)
        }
    }

    const handleClickLogOut = () => {
        setIsLogoutModalOpen(true)
    }

    const handleCloseLogoutModal = () => {
        setIsLogoutModalOpen(false)
    }

    const [authUser, setAuthUser] = useAuthUser()

    const { enqueueSnackbar } = useSnackbar()

    const [updateUser, { loading: isSavingProfile }] = useMutation<UpdateUserMutationType>(UPDATE_USER)

    const handleSaveProfile = ({ data, setServerError }: SaveProfileProps) => {
        updateUser({
            variables: {
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
            },
        }).then(data => {
            const updatedUser = data.data?.updateUser
            if (updatedUser) {
                setAuthUser(getAuthUser(updatedUser))
                enqueueSnackbar('You have updated your profile successfully', { variant: 'success' })
            } else {
                enqueueSnackbar('Profile could not be updated. Please try again later', { variant: 'error' })
            }
        }).catch((err: ApolloError) => {
            const validationError = getValidationError(err)
            if (validationError?.firstName) {
                return setServerError('firstName', validationError.firstName)
            } else if (validationError?.lastName) {
                return setServerError('lastName', validationError.lastName)
            } else if (validationError?.username) {
                return setServerError('username', validationError.username)
            } else {
                enqueueSnackbar('Profile could not be updated. Please try again later', { variant: 'error' })
            }
        })
    }

    const [changeProfilePhoto, { loading: isSavingProfilePhoto }] = useMutation<ChangeProfilePhotoMutationType>(CHANGE_PROFILE_PHOTO)

    const handleSaveProfilePhoto = (photo: File) => {
        changeProfilePhoto({
            variables: {
                photo,
            },
            context: {
                hasUpload: true,
            },
        }).then(data => {
            const updatedUser = data.data?.changeProfilePhoto
            if (updatedUser) {
                setAuthUser(getAuthUser(updatedUser))
                enqueueSnackbar('You have updated your profile photo successfully', { variant: 'success' })
            } else {
                enqueueSnackbar('Profile photo could not be updated. Please try again later', { variant: 'error' })
            }
        }).catch(() => {
            enqueueSnackbar('Profile photo could not be updated. Please try again later', { variant: 'error' })
        })
    }

    const [changePassword, { loading: isChangingPassword }] = useMutation<ChangePasswordMutationType>(CHANGE_PASSWORD)

    const handleChangePassword = ({ data, setServerError }: ChangePasswordProps) => {
        changePassword({
            variables: {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
                confirmNewPassword: data.confirmNewPassword,
            },
        }).then(data => {
            const updatedUser = data.data?.changePassword
            if (updatedUser) {
                setAuthUser(getAuthUser(updatedUser))
                enqueueSnackbar('You have changed your password successfully', { variant: 'success' })
            } else {
                enqueueSnackbar('Password could not be changed. Please try again later', { variant: 'error' })
            }
        }).catch((err: ApolloError) => {
            const validationError = getValidationError(err)
            if (validationError?.oldPassword) {
                return setServerError('oldPassword', validationError.oldPassword)
            } else if (validationError?.newPassword) {
                return setServerError('newPassword', validationError.newPassword)
            } else if (validationError?.confirmNewPassword) {
                return setServerError('confirmNewPassword', validationError.confirmNewPassword)
            } else {
                enqueueSnackbar('Password could not be changed. Please try again later', { variant: 'error' })
            }
        })
    }

    const getAuthUser = ({ user, accessToken, createdAt }: AuthUser): User => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        photoUrl: user.photoUrl,
        accessToken,
        createdAt,
    })

    return (
        <Box
            id='suggestedPostsContainer'
            component='div'
            minHeight='100vh'
            width='100%'
            display='flex'
            flexDirection='column'
            sx={{
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            <Box
                component='div'
                bgcolor='#000000'
                display='flex'
                flexDirection='column'
                flexGrow='1'
            >
                <Box
                    component='h1'
                    border='0'
                    color='#F5F5F5'
                    fontSize='24px'
                    lineHeight='27px'
                    fontWeight='600'
                    marginLeft='24px'
                    marginTop='24px'
                >
                    Settings
                </Box>
                <Box color='#FFFFFF' width='100%' height='calc(100vh - 100px)'>
                    <Box
                        component='div'
                        margin='10px auto 0'
                        bgcolor='#000000'
                        border='1px solid #363636'
                        borderRadius='3px'
                        boxSizing='border-box'
                        display='flex'
                        flexDirection='row'
                        flexGrow='1'
                        justifyContent='stretch'
                        maxWidth='935px'
                        overflow='hidden'
                        width='100%'
                        height='100%'
                    >
                        <Box
                            component='ul'
                            borderRight='1px solid #363636'
                            display='flex'
                            flexBasis='236px'
                            flexDirection='column'
                            flexGrow='0'
                            flexShrink='0'
                            margin='0'
                            padding='0'
                            sx={{
                                listStyleType: 'none',
                                marginInlineStart: '0',
                                marginInlineEnd: '0',
                            }}
                        >
                            <SettingsMenuItem
                                name='Edit profile'
                                isActive={activeStep === 1}
                                onClick={handleClickEditProfile} />
                            <SettingsMenuItem
                                name='Change password'
                                isActive={activeStep === 2}
                                onClick={handleClickChangePassword} />
                            <SettingsMenuItem
                                name='Log out'
                                onClick={handleClickLogOut} />
                        </Box>
                        <Box
                            component='div'
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            width='100%'
                        >
                            {activeStep === 1 && (
                                <EditProfile
                                    authUser={authUser}
                                    onSaveProfile={handleSaveProfile}
                                    isSavingProfile={isSavingProfile}
                                    onSaveProfilePhoto={handleSaveProfilePhoto}
                                    isSavingProfilePhoto={isSavingProfilePhoto} />
                            )}
                            {activeStep === 2 && (
                                <ChangePassword
                                    authUser={authUser}
                                    onChangePassword={handleChangePassword}
                                    isChangingPassword={isChangingPassword} />
                            )}
                        </Box>
                        <LogoutModal
                            open={isLogoutModalOpen}
                            onCloseModal={handleCloseLogoutModal} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}