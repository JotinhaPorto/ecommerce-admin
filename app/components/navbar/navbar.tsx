import { StoreType } from "@/types/StoreType"
import StoreSwitcher from "./StoreSwitcher"
import prismadb from "@/libs/prisma";
import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import getStores from "@/actions/getStores";
import { signOut } from "next-auth/react";
import User from "../User";
import MainNav from "../MainNav";




const Navbar = async () => {

    const session = await getCurrentUser()

    if (!session?.id) {
        redirect('/login')
    }

    const stores = await getStores(session.id)

    return (
        <div className='fixed w-full z-10  shadow-sm'>
            <div className='border-b-[1px] py-2 px-4 flex items-center gap-6'>
                <StoreSwitcher stores={stores} />
                <MainNav />
                {/* <User user={session} /> */}
            </div>
        </div>
    )
}

export default Navbar