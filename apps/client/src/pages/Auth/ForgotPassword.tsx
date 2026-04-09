import { InputField } from '@/components/features/Reusable/InputField';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { forgotPassword } from '@/modules/auth/services';
import { useState } from 'react';
import { HiArrowLeft, HiArrowRight, HiAtSymbol } from 'react-icons/hi';
import { Link } from 'react-router';
import { toast } from 'sonner';

export const ForgotPassword = () => {

    const [email, setEmail] = useState("")

    const sendEmail = async () => {
        await forgotPassword(email).then(() => {
            toast.success('Password reset link sent to your email')
        })
    }

  return (
    <div className="flex w-full items-center justify-center px-5">
        <Card className="w-full max-w-lg p-6">
            <CardHeader>
                <h1 className="dv-h2">Forgot Password</h1>
                <p className="mt-2 dv-body text-muted-foreground">
                    Enter your email address to receive a password reset link
                </p>
            </CardHeader>
            <CardContent className="mt-4">
                <InputField
                    label="Email Address"
                    placeholder="Enter your email"
                    icon={HiAtSymbol}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                />
                <Button onClick={sendEmail} className="mt-4 w-full cursor-pointer gap-2 px-4 py-2">
                    Send Resend Link <HiArrowRight />
                </Button>
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
