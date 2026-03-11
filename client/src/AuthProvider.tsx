import React from 'react'
import { useGetUser } from './modules/user/hooks'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useGetUser()
    if (isLoading) {
        return <p>Loading...</p>
    }
    return children
}
