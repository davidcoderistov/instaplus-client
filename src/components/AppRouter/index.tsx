import React, { useState, useEffect } from 'react'
import AppContext from '../../config/context'
import { User } from '../../types'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApolloClient, useMutation } from '@apollo/client'
import {
    REFRESH,
    LOGOUT,
} from '../../graphql/mutations/auth'
import {
    RefreshMutationType,
    LogoutMutationType,
} from '../../graphql/types/mutations/auth'
import { setStorageLoggedInUser } from '../../localStorage'
import { isInvalidSessionError } from '../../utils'
import Box from '@mui/material/Box'
import ReactLoading from 'react-loading'
import SignedInRouter from '../SignedInRouter'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import SessionModal from '../SessionModal'


export default function AppRouter() {

    const [loggedInUser, setUser] = useState<User | null>(null)
    const [sessionModalOpen, setSessionModalOpen] = useState(false)

    const [refresh] = useMutation<RefreshMutationType>(REFRESH)
    const [logout] = useMutation<LogoutMutationType>(LOGOUT)

    const [loadingInitialUser, setLoadingInitialUser] = useState(false)
    const [refreshingSession, setRefreshingSession] = useState(false)
    const [invalidatingSession, setInvalidatingSession] = useState(false)
    const [sessionModalTimeout, setSessionModalTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const getInitialUser = async () => {
            setLoadingInitialUser(true)
            try {
                const user: { data?: RefreshMutationType | null } = await refresh()
                if (user.data) {
                    setLoggedInUser(getRefreshUser(user.data))
                }
            } catch (err) {
            } finally {
                setLoadingInitialUser(false)
            }
        }
        getInitialUser()
    }, [])

    const setLoggedInUser = (user: User | null) => {
        setStorageLoggedInUser(user)
        setUser(user)
    }

    useEffect(() => {
        if (loggedInUser) {
            setSessionModalTimeout(setTimeout(() => {
                setSessionModalOpen(true)
            }, 119 * 60000))
        }
    }, [loggedInUser])

    const getRefreshUser = (data: RefreshMutationType): User => {
        return {
            _id: data.refresh.user._id,
            firstName: data.refresh.user.firstName,
            lastName: data.refresh.user.lastName,
            username: data.refresh.user.username,
            photoUrl: data.refresh.user.photoUrl,
            accessToken: data.refresh.accessToken,
        }
    }

    const refreshSession = async () => {
        setRefreshingSession(true)
        try {
            const user: { data?: RefreshMutationType | null } = await refresh()
            if (user.data) {
                setLoggedInUser(getRefreshUser(user.data))
            }
        } catch (err) {
            if (isInvalidSessionError(err)) {
                setLoggedInUser(null)
            } else {
                await invalidateSession()
            }
        } finally {
            setRefreshingSession(false)
            setSessionModalOpen(false)
        }
    }

    const client = useApolloClient()

    const invalidateSession = async () => {
        setInvalidatingSession(true)
        try {
            await logout()
            await client.clearStore()
            setLoggedInUser(null)
        } catch (err) {
            if (isInvalidSessionError(err)) {
                setLoggedInUser(null)
            } else {
                console.error(err)
            }
        } finally {
            setInvalidatingSession(false)
            setSessionModalOpen(false)
        }
    }

    const handleRefreshSession = () => {
        refreshSession()
    }

    const handleInvalidateSession = () => {
        invalidateSession()
    }

    const handleLogout = () => {
        setLoggedInUser(null)
        if (sessionModalTimeout) {
            clearTimeout(sessionModalTimeout)
        }
    }

    return (
        <>
            {loadingInitialUser ? (
                <Box
                    component='div'
                    width='100%'
                    height='100vh'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                >
                    <ReactLoading
                        type='spinningBubbles'
                        color='#a94064'
                        height='200px'
                        width='200px' />
                </Box>
            ) : loggedInUser ? (
                <AppContext.Provider value={{ loggedInUser, setLoggedInUser }}>
                    <SignedInRouter />
                </AppContext.Provider>
            ) : (
                <AppContext.Provider value={{ loggedInUser, setLoggedInUser }}>
                    <Routes>
                        <Route path='/signin' element={
                            <SignIn />
                        } />
                        <Route path='/signup' element={
                            <SignUp />
                        } />
                        <Route path='*' element={
                            <Navigate to='/signin' replace />
                        } />
                    </Routes>
                </AppContext.Provider>
            )}
            <SessionModal
                open={sessionModalOpen}
                refreshingSession={refreshingSession}
                invalidatingSession={invalidatingSession}
                onRefreshSession={handleRefreshSession}
                onInvalidateSession={handleInvalidateSession} />
        </>
    )
}