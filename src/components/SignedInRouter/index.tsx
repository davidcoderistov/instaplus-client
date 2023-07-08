import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthUser } from '../../hooks/misc'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import AppDrawer from '../../lib/src/components/AppDrawer'
import Chat from '../Chat'


export default function SignedInRouter() {

    const [authUser] = useAuthUser()

    return (
        <Box
            component='div'
            display='flex'
            height='100vh'
            width='100%'
            bgcolor='#000000'
        >
            <CssBaseline />
            <AppDrawer
                username={authUser.username}
                photoUrl={authUser.photoUrl}
                isSearchDrawerOpen={false}
                isNotificationsDrawerOpen={false}
                isCreatingNewPost={false}
                isSettingsOpen={false}
                onOpenSearchDrawer={console.log}
                onOpenNotificationsDrawer={console.log}
                onOpenCreateNewPost={console.log} />
            <Routes>
                <Route path='/' element={
                    <div style={{ color: 'white' }}>
                        Home
                    </div>
                } />
                <Route path='/explore' element={
                    <div style={{ color: 'white' }}>
                        Explore
                    </div>
                } />
                <Route path='/reels' element={
                    <div style={{ color: 'white' }}>
                        Reels
                    </div>
                } />
                <Route path='/chat' element={
                    <Chat />
                } />
                <Route path='/profile' element={
                    <div style={{ color: 'white' }}>
                        Profile
                    </div>
                } />
                <Route path='*' element={
                    <Navigate to='/' replace />
                } />
            </Routes>
        </Box>
    )
}