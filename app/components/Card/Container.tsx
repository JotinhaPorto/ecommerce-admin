import { HTMLAttributes } from "react"

type ContainerProps = HTMLAttributes<HTMLDivElement>
export const Container = ({ ...props }: ContainerProps) => {
    return <div {...props} className="flex flex-col px-4 py-6 border rounded w-80 mt-4 shadow" />
}

