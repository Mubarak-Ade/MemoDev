import { InputField } from '@/components/features/Reusable/InputField'
import { MotionWrap } from '@/components/features/Reusable/Motion'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { FieldError, FieldGroup, FieldSet } from '@/components/ui/field'
import * as Hi from 'react-icons/hi'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { LoginSchema, type Login as LoginInput } from '@/schema/AuthSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query';
import { useLogin } from '@/modules/auth/hooks';

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) })

    const login = useMutation(useLogin())

    const onSubmit = (data: LoginInput) => {
        login.mutate(data, {
            onSuccess: () => {
                window.location.href = '/dashboard'
            },
            onError: (error) => {
                setError('root', { message: String(error)})                
            },
        })
    }


    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="max-w-lg w-full p-5">
                <CardHeader className="mb-5">
                    <CardTitle className="text-3xl mb-2 font-bold">Sign In</CardTitle>
                    <CardDescription className="text-base">
                        Access Your Secure Digital Vault.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldSet>
                            <FieldGroup>
                                <InputField
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    icon={Hi.HiMail}
                                    errors={errors.email}
                                    type="email"
                                    {...register('email')}
                                />
                                <InputField
                                    {...register('password')}
                                    label="Password"
                                    enable
                                    placeholder="Enter your Password"
                                    icon={Hi.HiLockClosed}
                                    errors={errors.password}
                                    type="password"
                                />
                            </FieldGroup>
                        </FieldSet>
                        {errors.root &&<FieldError className='my-2'>{errors.root.message}</FieldError>}
                        <MotionWrap
                            as={Button}
                            type="submit"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 2px 15px  var(--color-primary)',
                            }}
                            whileTap={{
                                scale: 0.9,
                            }}
                            className="mt-5 w-full py-6 cursor-pointer"
                        >
                            Sign In
                            <span>
                                <Hi.HiArrowRight />
                            </span>
                        </MotionWrap>
                    </form>
                </CardContent>
                <CardFooter className="flex items-center justify-center bg-transparent p-8 text-accent border-accent mt-5">
                    <p>
                        New To The Vault?{' '}
                        <Link to="/register" className="text-primary">
                            Create An Account
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
