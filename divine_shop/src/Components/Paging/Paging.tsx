import { Item } from 'src/Types/items.type'
import Product from '../Product'
import classNames from 'classnames'
import ProductSkeleton from '../ProductSkeleton'

type PagingProps = {
  products?: Item[]
  bgColor?: string
  page_size?: number
}

function Paging({ products, bgColor, page_size }: PagingProps) {
  return (
    <div className={`${bgColor}`}>
      <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-5 md:text-base text-sm'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-4'>
          {products
            ? products.map((p) => <Product key={p.item_id} product={p} bgColor={bgColor} />)
            : Array(12)
                .fill(0)
                .map((_, i) => <ProductSkeleton key={i} />)}
        </div>
        <div className='text-center py-4 border-b-[1px] border-gray-200'>
          <button
            className={`text-[#2579F2] font-semibold ${classNames({
              'text-white': bgColor,
              hidden: page_size && page_size === 1
            })}`}
          >
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  )
}

export default Paging
