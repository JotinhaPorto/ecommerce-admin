



type pageProps = {
    params: { storeId: string }
}



const page = ({ params: { storeId } }: pageProps) => {

    console.log(storeId)

    return (
        <div>page</div>
    )
}

export default page