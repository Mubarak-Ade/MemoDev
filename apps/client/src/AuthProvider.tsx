import React from 'react'
import { useLocation } from 'react-router'
import { useGetUser } from './modules/user/hooks'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation()
    const isAuthRoute = location.pathname === '/login' || location.pathname === '/register'
    const { isLoading } = useGetUser()
    if (isAuthRoute) {
        return children
    }
    if (isLoading) {
        return <p>Loading...</p>
    }
    return children
}
