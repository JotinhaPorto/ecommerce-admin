import getCategoriesOrNull from '@/actions/getCategories'
import CategoriasForm from '@/app/components/CategoriasForm'
import prismadb from '@/libs/prisma'
import React from 'react'
type pageProps = {
  params: { categoriasId: string, storeId: string }
}
const page = async ({ params }: pageProps) => {

  const category = await getCategoriesOrNull(params.categoriasId)
  const outdoors = await prismadb.outdoor.findMany({
    where: {
      storeId: params.storeId
    }
  })
  return (
    <div className='pt-4 px-6 '>
      <CategoriasForm category={category} outdoors={outdoors} />
    </div>
  )
}

export default page