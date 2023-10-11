import { HTMLAttributes } from "react"

type ContentProps = HTMLAttributes<HTMLDivElement>
export const Content = ({ ...props }: ContentProps) => {
    return <div {...props} className="font-bold mt-2 text-2xl" />
}

