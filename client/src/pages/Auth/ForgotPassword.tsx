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
    <div className='flex w-full items-center justify-center'>
        <Card className='max-w-lg w-full p-10 shadow-[0px_5px_30px] shadow-primary/20'>
            <CardHeader>
                <h1 className='text-3xl font-bold'>Forgot Password</h1>
                <p className='mt-2 text-accent'>Enter your email address to receive a password reset link</p>
            </CardHeader>
            <CardContent className='mt-6'>
                <InputField label='Email Address' placeholder='Enter your email' icon={HiAtSymbol} value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                <Button onClick={sendEmail} className='w-full cursor-pointer py-6 mt-4'>Send Resend Link <HiArrowRight /></Button>
            </CardContent>
            <CardFooter className='bg-transparent p-5 m-5'>
                <Link to="/login" className='w-full py-6 flex gap-4 items-center justify-center cursor-pointer hover:text-primary'><HiArrowLeft /> Back To Login</Link>
            </CardFooter>
        </Card>
    </div>
  )
}
