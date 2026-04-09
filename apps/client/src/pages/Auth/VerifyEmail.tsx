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
        <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-center dv-h3">Verify your email</h2>
                <InputField
                    label="Email"
                    placeholder="Email"
                    type="email"
                    icon={HiMail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={resend} type="button" className="w-full cursor-pointer px-4 py-2">
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
                    color: 'text-success',
                    icon: (
                        <HiCheck className="rounded-full border border-success p-2 text-success" />
                    ),
                }
            case 'error':
                return {
                    message: 'Invalid or expired link',
                    color: 'text-danger',
                    icon: <HiX className="rounded-full border border-danger p-2 text-danger" />,
                }
            case 'resend': 
                return {
                    message: 'Email sent successfully',
                    color: 'text-success',
                    icon: (
                        <HiCheck className="rounded-full border border-success p-2 text-success" />
                    ),
                }
            case 'loading':
                if (missingToken) {
                    return {
                        message: 'Check your inbox for a verification link.',
                        color: 'text-muted-foreground',
                        icon: <HiMail className="rounded-full border border-border p-2 text-muted-foreground" />,
                    }
                }
                return {
                    message: 'Verifying...',
                    color: 'text-success',
                    icon: (
                        <HiCheck className="animate-spin rounded-full border border-success p-2 text-success" />
                    ),
                }
            default:
                return {
                    message: 'Verifying...',
                    color: 'text-success',
                    icon: (
                        <HiCheck className="animate-spin rounded-full border border-success p-2 text-success" />
                    ),
                }
        }
    }
    return (
        <div className="flex flex-col items-center dv-section">
            <span className="text-[28px]">{checkStatus().icon}</span>
            <p className={`dv-h3 mt-6 ${checkStatus().color}`}>{checkStatus().message}</p>
            {(status === 'error' || missingToken) && (
                <Button
                    onClick={() => setShowModal(!showModal)}
                    className="mt-4 cursor-pointer rounded-[8px] px-4 py-5"
                >
                    Resend Email
                </Button>
            )}
            {status === 'success' && (
                <Link to="/login">
                    <Button className="mt-4 cursor-pointer rounded-[8px] px-4 py-5">
                        Login
                    </Button>
                </Link>
            )}
            {showModal && <VerifyModal setStatus={setStatus} closeModal={() => setShowModal(!showModal)} />}
        </div>
    )
}
