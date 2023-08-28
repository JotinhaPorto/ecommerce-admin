import { InputHTMLAttributes } from 'react'
import { UseFormRegister, FieldValues, FieldError } from 'react-hook-form'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = ({ disabled, error, id, label, register, type, placeholder }: InputProps) => {

    return (
        <>
            <label>{label}</label>
            <input
                id={id}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
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

