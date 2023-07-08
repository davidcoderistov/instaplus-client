import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


export default function SignedInRouter() {

    return (
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
                <div style={{ color: 'white' }}>
                    Chat
                </div>
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
    )
}