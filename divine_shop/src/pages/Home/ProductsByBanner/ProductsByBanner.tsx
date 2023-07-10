import { ReactNode } from 'react'
import Paging from 'src/Components/Paging'

type ProductsByBannnerType = {
  title: string | ReactNode
  desc?: string
  products: any[]
}

function ProductsByBanner({ title, desc, products }: ProductsByBannnerType) {
  const title_node = typeof title === 'string' ? <span className='text-2xl font-semibold'>{title}</span> : title
  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <div className='flex justify-between'>
          <div>{title_node}</div>
          <button className='bg-[#2579F2] text-white px-3 py-1 rounded-md hover:scale-[1.03] transition-all duration-100'>
            Khám phá
          </button>
        </div>
        <div>{desc}</div>
      </div>
      <Paging products={products} />
    </div>
  )
}

export default ProductsByBanner
