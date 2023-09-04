import { useState } from 'react'
import { useAuthUser } from '../../hooks/misc'
import Box from '@mui/material/Box'
import SettingsMenuItem from './SettingsMenuItem'
import LogoutModal from '../LogoutModal'
import EditProfile from '../../lib/src/components/EditProfile'
import ChangePassword from '../../lib/src/components/ChangePassword'


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

    const [authUser] = useAuthUser()

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
                                    onSaveProfile={console.log}
                                    isSavingProfile={false}
                                    onSaveProfilePhoto={console.log}
                                    isSavingProfilePhoto={false} />
                            )}
                            {activeStep === 2 && (
                                <ChangePassword
                                    authUser={authUser}
                                    onChangePassword={console.log}
                                    isChangingPassword={false} />
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