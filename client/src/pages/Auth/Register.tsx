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
import { RegisterSchema, type Register as RegisterInput } from '@/schema/AuthSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as Hi from 'react-icons/hi'
import { Link } from 'react-router'
import { toast } from 'sonner'

export const Register = () => {
    const signup = useRegister()
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
                window.location.href = '/check-email'
            },
            onError: (error) => {
                toast.error(String(error))
                setError('root', { message: String(error) })
            },
        })
    }

    return (
        <div className="w-full flex items-center justify-center">
            <Card className="max-w-lg w-full p-5 shadow-[0px_5px_30px] shadow-primary/20">
                <CardHeader className="mb-5">
                    <CardTitle className="text-3xl mb-2 font-bold">Create Account</CardTitle>
                    <CardDescription className="text-base">
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
                                <div className="flex gap-5">
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
                                boxShadow: '0 2px 15px  var(--color-primary)',
                            }}
                            whileTap={{
                                scale: 0.8,
                            }}
                            className="mt-5 w-full py-6 cursor-pointer"
                        >
                            Create Account
                            <span>
                                <Hi.HiArrowRight />
                            </span>
                        </MotionWrap>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-center bg-transparent p-8 text-accent border-accent mt-5">
                    <p>
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
