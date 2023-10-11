import { HTMLAttributes } from "react"

type FieldProps = HTMLAttributes<HTMLDivElement>

export const Field = ({ ...props }: FieldProps) => {
    return <div className="flex flex-col max-w-sm  w-full relative" {...props} />
}

