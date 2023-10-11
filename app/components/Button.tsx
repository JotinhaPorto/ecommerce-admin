'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/libs/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }

const buttonVariants = cva(
    'flex items-center justify-center rounded-md text-sm font-medium cursor-pointer disabled:cursor-not-allowed',
    {
        variants: {
            variant: {
                default:
                    'bg-[#121425] hover:bg-slate-800 text-white',
                primary:
                    'bg-white border border-[#D9D9D9] hover:bg-slate-100',
                secondary:
                    'text-white bg-red-500 hover:bg-red-400'
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10'
            }
        },
        defaultVariants: {
            variant: "default",
            size: 'default'
        }
    }
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, size, variant, ...props }: ButtonProps, ref) => {


    return <button ref={ref} className={cn(buttonVariants({ className, size, variant }))} {...props} />
})

export { Button, buttonVariants }