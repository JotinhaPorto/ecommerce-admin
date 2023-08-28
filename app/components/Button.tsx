'use client'
import { IconType } from 'react-icons'
import { ButtonHTMLAttributes } from 'react'

type ButtonProps = {
    onClick?: () => void;
    small?: boolean;
    medium?: boolean
    large?: boolean;
    icon?: IconType;
    disabled: boolean;
    label?: string;
    containerStyles: string;
    type?: string;
}
const Button = ({ label, small, disabled, icon: Icon, large, medium, onClick, containerStyles, type }: ButtonProps, props: ButtonHTMLAttributes<HTMLButtonElement>) => {


    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${containerStyles} disabled:opacity-70 disabled:cursor-not-allowed `}
        >
            {Icon && (
                <Icon />
            )}
            {label}
        </button>
    )
}

export default Button