import { InputField } from '@/components/features/Reusable/InputField'
import { Button } from '@/components/ui/button'
import api from '@/utils/api'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { HiCheck, HiMail, HiX } from 'react-icons/hi'
import { toast } from 'sonner'

const ResendModal = ({
    closeModal,
    setStatus,
}: {
    closeModal: () => void
    setStatus: Dispatch<SetStateAction<'idle' | 'sent' | 'skipped' | 'error'>>
}) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const resend = async () => {
        try {
            setLoading(true)
            const res = await api.post('/auth/resend-email', { email })
            if (res?.data?.sent) {
                setStatus('sent')
                toast.success('Verification email sent.')
            } else {
                setStatus('skipped')
                toast.message('If the email exists and is unverified, a link has been sent.')
            }
            closeModal()
        } catch {
            setStatus('error')
            toast.error('Failed to send email. Try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="absolute top-0 left-0 w-full h-screen backdrop-blur-3xl flex items-center justify-center">
            <div className="bg-card p-5 space-y-4 max-w-md w-full rounded-md">
                <h2 className="text-xl font-bold mb-5 text-center">Resend verification email</h2>
                <InputField
                    label="Email"
                    placeholder="Email"
                    type="email"
                    icon={HiMail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    onClick={resend}
                    type="button"
                    className="cursor-pointer w-full py-6"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Submit'}
                </Button>
            </div>
        </div>
    )
}

export const CheckEmail = () => {
    const [showModal, setShowModal] = useState(false)
    const [status, setStatus] = useState<'idle' | 'sent' | 'skipped' | 'error'>('idle')

    const statusMessage = () => {
        switch (status) {
            case 'sent':
                return { message: 'Email sent successfully', color: 'text-green-600', icon: HiCheck }
            case 'skipped':
                return {
                    message: 'If the email exists and is unverified, a link has been sent',
                    color: 'text-green-600',
                    icon: HiCheck,
                }
            case 'error':
                return { message: 'Failed to send email. Try again.', color: 'text-red-600', icon: HiX }
            default:
                return {
                    message: 'Check your inbox for a verification link.',
                    color: 'text-accent',
                    icon: HiMail,
                }
        }
    }

    const { message, color, icon: Icon } = statusMessage()

    return (
        <div className="flex flex-col items-center p-20">
            <span className="text-6xl">
                <Icon className={color} />
            </span>
            <p className={`text-2xl mt-8 ${color}`}>{message}</p>
            <Button
                onClick={() => setShowModal(!showModal)}
                className="rounded-md mt-4 cursor-pointer p-6"
            >
                Resend Email
            </Button>
            {showModal && (
                <ResendModal closeModal={() => setShowModal(!showModal)} setStatus={setStatus} />
            )}
        </div>
    )
}
