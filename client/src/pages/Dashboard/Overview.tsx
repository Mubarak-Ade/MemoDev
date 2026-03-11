import { Button } from '@/components/ui/button';
import { useLogout } from '@/modules/auth/hooks';
import { useGetUser } from '@/modules/user/hooks';
import { useCallback } from 'react';

export const Overview = () => {
    const { data: user } = useGetUser()
    const logout = useLogout()

    const handleLogout = useCallback(() => {
        logout.mutate()
    }, [logout])

    return (
        <div>
            <h1 className="text-2xl">Welcome To Your Dashboard {user?.username}</h1>
            <Button
                variant={'destructive'}
                className="px-6 py-4 cursor-pointer"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    )
}
