import StoreSwitcher from "./StoreSwitcher"




const Navbar = () => {


    return (
        <div className='fixed w-full z-10  shadow-sm'>
            <div className='border-b-[1px] py-4 px-4'>
                <StoreSwitcher />
            </div>
        </div>
    )
}

export default Navbar