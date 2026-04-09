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
        <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="w-full max-w-md space-y-4 rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-center dv-h3">Resend verification email</h2>
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
                    className="w-full cursor-pointer px-4 py-2"
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
                    color: 'text-muted-foreground',
                    icon: HiMail,
                }
        }
    }

    const { message, color, icon: Icon } = statusMessage()

    return (
        <div className="flex flex-col items-center dv-section">
            <span className="text-[28px]">
                <Icon className={color} />
            </span>
            <p className={`dv-h3 mt-6 ${color}`}>{message}</p>
            <Button
                onClick={() => setShowModal(!showModal)}
                className="mt-4 cursor-pointer rounded-[8px] px-4 py-5"
            >
                    Resend Email
            </Button>
            {showModal && (
                <ResendModal closeModal={() => setShowModal(!showModal)} setStatus={setStatus} />
            )}
        </div>
    )
}
