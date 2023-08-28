type HeadingProps = {
    title: string;
    description: string;
}
const Heading = ({ title, description }: HeadingProps) => {
    return (
        <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-bold'>{title}</h1>
            <p className='text-[#9FA1A7]'>{description}</p>
        </div>
    )
}

export default Heading