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
import { LoginSchema, type Login as LoginInput } from '@/schema/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '@/modules/auth/hooks';
import { toast } from 'sonner';

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) })

    const login = useLogin()

    const onSubmit = (data: LoginInput) => {
        login.mutate(data, {
            onSuccess: () => {
                toast.success('Welcome back.')
                window.location.href = '/overview'
            },
            onError: (error) => {
                toast.error(String(error))
                setError('root', { message: String(error)})                
            },
        })
    }


    return (
        <div className="flex w-full items-center justify-center">
            <Card className="w-full max-w-lg p-6">
                <CardHeader className="mb-4">
                    <CardTitle className="dv-h2 mb-2">Sign In</CardTitle>
                    <CardDescription className="dv-body text-muted-foreground">
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
                        {errors.root && <FieldError className="my-2">{errors.root.message}</FieldError>}
                        <MotionWrap
                            as={Button}
                            type="submit"
                            disabled={login.isPending}
                            loading={login.isPending}
                            loadingText="Signing In..."
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 2px 15px rgba(59, 130, 246, 0.35)',
                            }}
                            whileTap={{
                                scale: 0.9,
                            }}
                            className="mt-5 w-full cursor-pointer px-4 py-5"
                        >
                            Sign In
                            <span>
                                <Hi.HiArrowRight />
                                <MotionWrap as="div" />
                            </span>
                        </MotionWrap>
                    </form>
                </CardContent>
                <CardFooter className="mt-4 flex items-center justify-center border-border bg-transparent p-6 text-muted-foreground">
                    <p className="dv-small">
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
