import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { useState, type ComponentPropsWithoutRef } from 'react'
import type { FieldError as FE } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi';
import type { IconType } from 'react-icons/lib'
import { Link } from 'react-router'

interface InputFieldProps extends ComponentPropsWithoutRef<'input'> {
    label: string
    placeholder: string
    icon: IconType
    type: string
    enable?: boolean
    errors?: FE
}

export const InputField = ({
    label,
    placeholder,
    icon: Icon,
    type,
    enable,
    errors,
    ...props
}: InputFieldProps) => {

    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPassword ? 'text' : type

    return (
        <Field className="">
            <div className="flex justify-between">
                <FieldLabel className="text-sm font-medium text-foreground">{label}</FieldLabel>
                {enable && isPassword && (
                    <Link to="/forgot-password" className="text-sm text-primary">
                        Forgot Password?
                    </Link>
                )}
            </div>
            <InputGroup className="w-full h-10">
                <InputGroupInput {...props} type={inputType} className='h-10' placeholder={placeholder} />
                <InputGroupAddon>
                    <Icon />
                </InputGroupAddon>
                {isPassword && (
                    <InputGroupAddon align="inline-end">
                        <Button
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <HiEyeOff /> : <HiEye /> }
                        </Button>
                    </InputGroupAddon>
                )}
            </InputGroup>
            {errors && <FieldError>{errors.message}</FieldError>}
        </Field>
    )
}
