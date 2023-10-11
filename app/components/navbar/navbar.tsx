import StoreSwitcher from "./StoreSwitcher"
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import getStores from "@/actions/getStores";
import MainNav from "./MainNav";
import User from "../User";




const Navbar = async () => {

    const session = await getCurrentUser()

    if (!session?.id) {
        redirect('/login')
    }

    const stores = await getStores(session.id)

    return (
        <div className='relative w-full z-10  shadow-sm bg-white'>
            <div className='border-b-[1px] py-2 px-4 flex items-center justify-between gap-6 '>
                <div className="flex items-center gap-4">
                    <StoreSwitcher stores={stores} />
                    <MainNav />
                </div>
                <User user={session} />
            </div>
        </div>
    )
}

export default Navbar