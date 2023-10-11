import React from 'react'
import { useParams } from "next/navigation"
import { useOrigin } from "../hooks/useOrigin"
import ApiItem from './api-item';

type apiListProps = {
    name: string;
    idName: string;
}

const apiList = ({ name, idName }: apiListProps) => {

    const params = useParams()
    const origin = useOrigin()
    console.log(params)
    const baseURL = `${origin}/api/${params.storeId.toString()}`

    return (
        <>
            <ApiItem title='GET' description={`${baseURL}/${name}`} />
            <ApiItem title='GET' description={`${baseURL}/${name}/${idName}`} />
            <ApiItem title='POST' description={`${baseURL}/${name}`} />
            <ApiItem title='PATCH' description={`${baseURL}/${name}/${idName}`} />
            <ApiItem title='DELETE' description={`${baseURL}/${name}/${idName}`} />
        </>
    )
}

export default apiList