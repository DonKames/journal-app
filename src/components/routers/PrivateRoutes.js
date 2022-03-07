import React from 'react'
import { Navigate } from 'react-router-dom'
import { JournalScreen } from '../journal/JournalScreen'

export const PrivateRoutes = ({ isLoggedIn }) => {
    return (
        isLoggedIn ? <JournalScreen /> : <Navigate to="auth/login" />
    )
}
