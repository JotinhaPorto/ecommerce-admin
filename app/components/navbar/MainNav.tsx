'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

const MainNav = () => {

    const pathname = usePathname()
    const params = useParams()
    const routes = [
        // {
        //     href: `/${params.storeId}/`,
        //     label: 'Dashboard',
        //     active: pathname === `/${params.storeId}`
        // },
        {
            href: `/${params.storeId}/configuracoes`,
            label: 'Configurações',
            active: pathname === `/${params.storeId}/configuracoes`
        },
        {
            href: `/${params.storeId}/tamanhos`,
            label: 'Tamanhos',
            active: pathname === `/${params.storeId}/tamanhos`
        },
        {
            href: `/${params.storeId}/cores`,
            label: 'Cores',
            active: pathname === `/${params.storeId}/cores`
        },
        {
            href: `/${params.storeId}/outdoors`,
            label: 'Outdoors',
            active: pathname === `/${params.storeId}/outdoors`
        },
        {
            href: `/${params.storeId}/categorias`,
            label: 'Categorias',
            active: pathname === `/${params.storeId}/categorias`
        },
        {
            href: `/${params.storeId}/produtos`,
            label: 'Produtos',
            active: pathname === `/${params.storeId}/produtos`
        },
        {
            href: `/${params.storeId}/pedidos`,
            label: 'Pedidos',
            active: pathname === `/${params.storeId}/pedidos`
        }
    ]

    return (
        <nav className='flex gap-4'>
            {routes.map((route) => (
                <Link
                    className={`${route.active ? 'text-black' : 'text-[#9FA1A7] hover:text-black'}`}
                    key={route.href}
                    href={route.href}

                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}

export default MainNav
