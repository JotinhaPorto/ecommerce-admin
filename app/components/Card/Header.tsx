import { HTMLAttributes } from "react"

type HeaderProps = HTMLAttributes<HTMLDivElement>

export const Header = ({ ...props }: HeaderProps) => {
    return <div {...props} className="flex justify-between" />
}

