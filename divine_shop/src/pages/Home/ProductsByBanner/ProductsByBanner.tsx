import classNames from 'classnames'
import { ReactNode } from 'react'
import Paging from 'src/Components/Paging'

type ProductsByBannnerType = {
  title: string | ReactNode
  img?: string
  bgcolor?: string
  desc?: string
  products: any[]
}

function ProductsByBanner({ title, img, bgcolor, desc, products }: ProductsByBannnerType) {
  const title_node = typeof title === 'string' ? <span className='text-2xl font-semibold'>{title}</span> : title
  const img_url = `bg-[url("${img}")]`
  return (
    <div>
      <div
        className={` ${img_url} ${classNames({
          'pt-3 pb-6': !img,
          'pt-28 pb-6': img
        })}`}
      >
        <div className='xl:max-w-7xl xl:mx-auto xl:px-0 px-2 md:px-4 md:text-base text-sm'>
          <div className='flex justify-between'>
            <div>{title_node}</div>
            <div>
              <button className='bg-[#2579F2] text-white px-3 py-1 rounded-md hover:scale-[1.03] transition-all duration-100'>
                Khám phá
              </button>
            </div>
          </div>
          <div className='w-3/4'>{desc}</div>
        </div>
      </div>
      <Paging products={products} bgColor={bgcolor} />
    </div>
  )
}

export default ProductsByBanner
