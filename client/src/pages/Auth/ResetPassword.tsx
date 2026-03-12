import { InputField } from '@/components/features/Reusable/InputField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { resetPassword } from '@/modules/auth/services'
import { useState } from 'react'
import { HiArrowLeft, HiLockClosed } from 'react-icons/hi'
import { Link, useSearchParams } from 'react-router'
import { toast } from 'sonner'

export const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

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
        try {
            setLoading(true)
            await resetPassword(token, password)
            toast.success('Password reset successful. Please log in.')
            window.location.href = '/login'
        } catch (error) {
            toast.error(String(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex w-full items-center justify-center">
            <Card className="max-w-lg w-full p-10 shadow-[0px_5px_30px] shadow-primary/20">
                <CardHeader>
                    <h1 className="text-3xl font-bold">Reset Password</h1>
                    <p className="mt-2 text-accent">
                        Enter a new password for your account
                    </p>
                </CardHeader>
                <CardContent className="mt-6 space-y-4">
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
                        <Button className="w-full cursor-pointer py-6" type="submit" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="bg-transparent p-5 m-5">
                    <Link
                        to="/login"
                        className="w-full py-6 flex gap-4 items-center justify-center cursor-pointer hover:text-primary"
                    >
                        <HiArrowLeft /> Back To Login
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
