import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import {
    usePopupState,
    bindPopover,
} from 'material-ui-popup-state/hooks'
import AppDrawerItem from '../AppDrawer/AppDrawerItem'
import AppDrawerIcon from '../AppDrawer/AppDrawerIcon'
import SettingsMenuItem from './SettingsMenuItem'
import { Settings, Person, Logout } from '@mui/icons-material'


interface Props {
    isDrawerOpen: boolean

    onViewSettings(): void

    onViewProfile(): void

    onLogout(): void
}

export default function SettingsMenu(props: Props) {

    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'settingsMenu',
    })

    const handleViewSettings = () => {
        popupState.close()
        props.onViewSettings()
    }

    const handleViewProfile = () => {
        popupState.close()
        props.onViewProfile()
    }

    const handleLogout = () => {
        popupState.close()
        props.onLogout()
    }

    return (
        <>
            <AppDrawerItem
                name='More'
                isActive={popupState.isOpen}
                isCondensed={!props.isDrawerOpen}
                popupState={popupState}
                icon={
                    <AppDrawerIcon
                        ariaLabel='More'
                        path={
                            <>
                                <line fill='none' stroke='currentColor' strokeLinecap='round'
                                      strokeLinejoin='round' strokeWidth='2'
                                      x1='3' x2='21' y1='4' y2='4' />
                                <line fill='none' stroke='currentColor' strokeLinecap='round'
                                      strokeLinejoin='round' strokeWidth='2'
                                      x1='3' x2='21' y1='12' y2='12' />
                                <line fill='none' stroke='currentColor' strokeLinecap='round'
                                      strokeLinejoin='round' strokeWidth='2'
                                      x1='3' x2='21' y1='20' y2='20' />
                            </>
                        }
                    />
                }
                activeIcon={
                    <AppDrawerIcon
                        ariaLabel='More'
                        path={
                            <path
                                d='M3.5 6.5h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3Zm17 4h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Zm0 7h-17a1.5 1.5 0 0 0 0 3h17a1.5 1.5 0 0 0 0-3Z' />
                        }
                    />
                } />
            <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'bottom',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            bgcolor: '#262626',
                            borderRadius: '16px',
                            width: '230px',
                        },
                    },
                }}
            >
                <Box
                    component='div'
                    display='block'
                >
                    <Box
                        component='div'
                        display='flex'
                    >
                        <Box
                            component='div'
                            width='100%'
                            borderRadius='16px'
                            bgcolor='#262626'
                            display='flex'
                            flexDirection='column'
                            height='100%'
                            overflow='hidden'
                            position='relative'
                            sx={{
                                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
                            }}
                        >
                            <Box
                                component='div'
                                display='block'
                            >
                                <Box
                                    component='div'
                                    overflow='hidden'
                                    position='relative'
                                    width='auto'
                                    display='block'
                                >
                                    <Box
                                        component='div'
                                        display='block'
                                        padding='8px'
                                    >
                                        <SettingsMenuItem
                                            title='Settings'
                                            icon={<Settings sx={{ color: '#F5F5F5', fontSize: 23 }} />}
                                            onClick={handleViewSettings} />
                                        <SettingsMenuItem
                                            title='Profile'
                                            icon={<Person sx={{ color: '#F5F5F5', fontSize: 23 }} />}
                                            onClick={handleViewProfile} />
                                        <SettingsMenuItem
                                            title='Logout'
                                            icon={<Logout sx={{ color: '#F5F5F5', fontSize: 23 }} />}
                                            onClick={handleLogout} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Popover>
        </>
    )
}