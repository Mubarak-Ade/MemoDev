import { InputField } from '@/components/features/Reusable/InputField'
import { MotionWrap } from '@/components/features/Reusable/Motion'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { FieldError, FieldGroup, FieldSet } from '@/components/ui/field'
import { useRegister } from '@/modules/auth/hooks'
import { RegisterSchema, type Register as RegisterInput } from '@/schema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as Hi from 'react-icons/hi'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'

export const Register = () => {
    const signup = useRegister()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterInput>({ resolver: zodResolver(RegisterSchema) })

    const onSubmit = (data: RegisterInput) => {
        signup.mutate(data, {
            onSuccess: () => {
                toast.success('Account created. Check your email to verify.')
                navigate('/check-email')
            },
            onError: (error) => {

                toast.error(String(error))
                setError('root', { message: String(error) })
            },
        })
    }

    return (
        <div className="flex w-full items-center justify-center">
            <Card className="w-full max-w-lg p-6">
                <CardHeader className="mb-4">
                    <CardTitle className="dv-h2 mb-2">Create Account</CardTitle>
                    <CardDescription className="dv-body text-muted-foreground">
                        Secure your digital legacy with high-contrast utility.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldSet>
                            <FieldGroup>
                                <InputField
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    icon={Hi.HiUser}
                                    type="text"
                                    {...register('username')}
                                    errors={errors.username}
                                />
                                <InputField
                                    label="Email"
                                    placeholder="Enter your email"
                                    icon={Hi.HiMail}
                                    type="email"
                                    {...register('email')}
                                    errors={errors.email}
                                />
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    <InputField
                                        label="Password"
                                        placeholder="Enter your Password"
                                        icon={Hi.HiLockClosed}
                                        type="password"
                                        {...register('password')}
                                        errors={errors.password}
                                    />
                                    <InputField
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                        icon={Hi.HiShieldCheck}
                                        type="password"
                                        {...register('confirmPassword')}
                                        errors={errors.confirmPassword}
                                    />
                                </div>
                            </FieldGroup>
                        </FieldSet>
                        {errors.root && (
                            <FieldError className="my-2">{errors.root.message}</FieldError>
                        )}

                        <MotionWrap
                            as={Button}
                            type="submit"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 2px 15px rgba(59, 130, 246, 0.35)',
                            }}
                            whileTap={{
                                scale: 0.8,
                            }}
                            className="mt-5 w-full cursor-pointer px-4 py-5"
                        >
                            Create Account
                            <span>
                                <Hi.HiArrowRight />
                            </span>
                        </MotionWrap>
                    </form>
                </CardContent>
                <CardFooter className="mt-4 flex items-center justify-center border-border bg-transparent p-6 text-muted-foreground">
                    <p className="dv-small">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary">
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
