




type layoutProps = {
    children: React.ReactNode;
    params: { storeId: string }
}



const layout = ({ children, params }: layoutProps) => {
    return (
        <div>

            {children}
        </div>
    )
}

export default layout