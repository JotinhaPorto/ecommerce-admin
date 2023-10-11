import { HTMLAttributes } from "react"

type TitleProps = HTMLAttributes<HTMLSpanElement>

export const Title = ({ ...props }: TitleProps) => {
    return <span {...props} className="font-semibold" />
}

