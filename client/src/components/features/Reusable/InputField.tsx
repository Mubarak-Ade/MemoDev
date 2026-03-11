import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import type { FieldError as FE } from 'react-hook-form';
import type { IconType } from 'react-icons/lib';
import { Link } from 'react-router';

interface InputFieldProps {
    label: string
    placeholder: string
    icon: IconType
    type: string,
    enable?: boolean,
    errors?: FE
}

export const InputField = ({ label, placeholder, icon: Icon, type, enable, errors, ...props}: InputFieldProps) => {
    return (
        <Field className="space-y-2">
            <div className="flex justify-between">
                <FieldLabel className="text-accent">{label}</FieldLabel>
                {enable && type === 'password' && <Link to="forgot-password" className="text-primary">Forgot Password?</Link>}
            </div>
            <InputGroup className="w-full py-6 ring ring-accent">
                <InputGroupInput {...props} type={type} placeholder={placeholder} />
                <InputGroupAddon>
                    <Icon />
                </InputGroupAddon>
            </InputGroup>
            {errors && <FieldError>{errors.message}</FieldError>}
        </Field>
    )
}
