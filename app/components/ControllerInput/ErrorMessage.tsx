import { useFormContext } from 'react-hook-form'


interface ErrorMessageProps {
    field: string
}

function getMessageByField(obj: Record<any, any>, path: string) {
    const toArray = path.split(' ').reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)
    return toArray
}

export const ErrorMessage = ({ field }: ErrorMessageProps) => {

    const { formState: { errors } } = useFormContext()

    const fieldError = getMessageByField(errors, field)


    if (!fieldError) {
        return null
    }

    return (
        <span>{fieldError.message?.toString()}</span>
    )
}

