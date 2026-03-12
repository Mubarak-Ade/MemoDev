import { InputField } from '@/components/features/Reusable/InputField';
import { Button } from '@/components/ui/button';
import api from '@/utils/api';
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { HiCheck, HiMail, HiX } from 'react-icons/hi';
import { Link, useSearchParams } from 'react-router';
import { toast } from 'sonner';

const VerifyModal = ({ closeModal, setStatus }: { closeModal: () => void, setStatus: Dispatch<SetStateAction<'loading' | 'success' | 'error' | 'resend'>>}) => {
    const [email, setEmail] = useState('')

    const resend = () => {
        api.post(`/auth/resend-email`, { email }).then(() => {
            closeModal()
            setStatus('resend')
        })
    }

    return (
        <div className="absolute top-0 left-0 w-full h-screen backdrop-blur-3xl flex items-center justify-center">
            <div className="bg-card p-5 space-y-4 max-w-md w-full rounded-md">
                <h2 className="text-xl font-bold mb-5 text-center">Verify your email</h2>
                <InputField
                    label="Email"
                    placeholder="Email"
                    type="email"
                    icon={HiMail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={resend} type='button' className="cursor-pointer w-full py-6">
                    Submit
                </Button>
            </div>
        </div>
    )
}

export const VerifyEmail = () => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'resend'>('loading')
    const [showModal, setShowModal] = useState(false)
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const missingToken = !token
    const verifyOnceRef = useRef<string | null>(null)
    useEffect(() => {
        if (!token) {
            return
        }
        if (verifyOnceRef.current === token) {
            return
        }
        verifyOnceRef.current = token
        api.get(`/auth/verify`, { params: { token } })
            .then(() => {
                setStatus('success')
                toast.success('Email verified successfully.')
            })
            .catch(() => {
                setStatus('error')
                toast.error('Verification failed. The link may be invalid or expired.')
            })
    }, [token])

    const checkStatus = () => {
        switch (status) {
            case 'success':
                return {
                    message: 'Verification successful',
                    color: 'text-green-600',
                    icon: (
                        <HiCheck className="text-green-600 border border-green-600 rounded-full p-2" />
                    ),
                }
            case 'error':
                return {
                    message: 'Invalid or expired link',
                    color: 'text-red-600',
                    icon: <HiX className="text-red-600 border border-red-600 rounded-full p-2" />,
                }
            case 'resend': 
                return {
                    message: 'Email sent successfully',
                    color: 'text-green-600',
                    icon: (
                        <HiCheck className="text-green-600 border border-green-600 rounded-full p-2" />
                    ),
                }
            case 'loading':
                if (missingToken) {
                    return {
                        message: 'Check your inbox for a verification link.',
                        color: 'text-accent',
                        icon: <HiMail className="text-accent border border-accent rounded-full p-2" />,
                    }
                }
                return {
                    message: 'Verifying...',
                    color: 'text-green-600',
                    icon: (
                        <HiCheck className="text-green-600 animate-spin border-green-600 rounded-full p-2" />
                    ),
                }
            default:
                return {
                    message: 'Verifying...',
                    color: 'text-green-600',
                    icon: (
                        <HiCheck className="text-green-600 animate-spin border-green-600 rounded-full p-2" />
                    ),
                }
        }
    }
    return (
        <div className="flex flex-col items-center p-20">
            <span className="text-6xl">{checkStatus().icon}</span>
            <p className={`text-2xl mt-8 ${checkStatus().color}`}>{checkStatus().message}</p>
            {(status === 'error' || missingToken) && (
                <Button
                    onClick={() => setShowModal(!showModal)}
                    className="rounded-md mt-4 cursor-pointer p-6"
                >
                    Resend Email
                </Button>
            )}
            {status === 'success' && (
                <Link to="/login">
                    <Button className="rounded-md mt-4 cursor-pointer p-6">Login</Button>
                </Link>
            )}
            {showModal && <VerifyModal setStatus={setStatus} closeModal={() => setShowModal(!showModal)} />}
        </div>
    )
}
