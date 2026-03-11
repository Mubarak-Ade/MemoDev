import { InputField } from '@/components/features/Reusable/InputField'
import { MotionWrap } from '@/components/features/Reusable/Motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup, FieldSet } from '@/components/ui/field'
import * as Hi from 'react-icons/hi'
import { Link } from 'react-router';

export const Register = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="max-w-lg w-full p-5">
                <CardHeader className="mb-5">
                    <CardTitle className="text-3xl mb-2 font-bold">Create Account</CardTitle>
                    <CardDescription className="text-base">
                        Secure your digital legacy with high-contrast utility.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FieldSet>
                        <FieldGroup>
                            <InputField
                                label="Full Name"
                                placeholder="Enter your full name"
                                icon={Hi.HiUser}
                                type="text"
                            />
                            <InputField
                                label="Email"
                                placeholder="Enter your email"
                                icon={Hi.HiMail}
                                type="email"
                            />
                            <div className="flex gap-5">
                                <InputField
                                    label="Password"
                                    placeholder="Enter your Password"
                                    icon={Hi.HiLockClosed}
                                    type="text"
                                />
                                <InputField
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    icon={Hi.HiShieldCheck}
                                    type="email"
                                />
                            </div>
                        </FieldGroup>
                    </FieldSet>
                    <MotionWrap
                        as={Button}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 2px 15px  var(--color-primary)',
                        }}
                        whileTap={{
                            scale: 0.9,
                        }}
                        className="mt-5 w-full py-6 cursor-pointer"
                    >
                        Create Account
                        <span>
                            <Hi.HiArrowRight />
                        </span>
                    </MotionWrap>
                </CardContent>
                <CardFooter className='flex items-center justify-center bg-transparent p-8 text-accent border-accent mt-5'>
                    <p>Already have an account? <Link to="/login" className='text-primary'>Log in</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}
