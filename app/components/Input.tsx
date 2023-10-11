import { InputHTMLAttributes } from 'react'
import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    error: string;
    label: string;
    register: UseFormRegister<FieldValues>;
}

const Input = ({ error, label, id, register, ...props }: InputProps) => {

    return (
        <>
            <label>{label}</label>
            <input
                {...props}
                id={id}
                type={props.type}
                placeholder={props.placeholder}
                {...register(id)}
                className='px-2 py-[5px] rounded border border-[#D9D9D9] shadow outline-[#8B8B8C]  
                disabled:opacity-70
                disabled:cursor-not-allowed'
            />
            {error}
        </>
    )
}

export default Input

