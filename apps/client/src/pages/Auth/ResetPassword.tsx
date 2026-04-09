import { InputField } from '@/components/features/Reusable/InputField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useResetPassword } from '@/modules/auth/hooks'
import { useState } from 'react'
import { HiArrowLeft, HiLockClosed } from 'react-icons/hi'
import { Link, useSearchParams } from 'react-router'
import { toast } from 'sonner'

export const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const resetPasswordMutation = useResetPassword()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!token) {
            toast.error('Reset token is missing.')
            return
        }
        if (!password || !confirmPassword) {
            toast.error('Please fill in both password fields.')
            return
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.')
            return
        }
        resetPasswordMutation.mutate(
            { token, password },
            {
                onSuccess: () => {
                    toast.success('Password reset successful. Please log in.')
                    window.location.href = '/login'
                },
                onError: (error) => {
                    toast.error(String(error))
                },
            },
        )
    }

    return (
        <div className="flex w-full items-center justify-center px-5">
            <Card className="w-full max-w-lg p-6">
                <CardHeader>
                    <h1 className="dv-h2">Reset Password</h1>
                    <p className="mt-2 dv-body text-muted-foreground">
                        Enter a new password for your account
                    </p>
                </CardHeader>
                <CardContent className="mt-4 space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="Password"
                            placeholder="Enter your new password"
                            icon={HiLockClosed}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputField
                            label="Confirm Password"
                            placeholder="Confirm your new password"
                            icon={HiLockClosed}
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            className="w-full cursor-pointer gap-2 px-4 py-2"
                            type="submit"
                            disabled={resetPasswordMutation.isPending}
                            loading={resetPasswordMutation.isPending}
                            loadingText="Resetting Password..."
                        >
                            Submit
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="mt-4 bg-transparent p-6">
                    <Link
                        to="/login"
                        className="flex w-full cursor-pointer items-center justify-center gap-4 py-2 dv-small text-muted-foreground hover:text-foreground"
                    >
                        <HiArrowLeft /> Back To Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
