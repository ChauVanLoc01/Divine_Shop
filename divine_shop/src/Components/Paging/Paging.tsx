import { Item } from 'src/Types/items.type'
import Product from '../Product'
import classNames from 'classnames'

type PagingProps = {
  products: Item[]
  bgColor?: string
}

function Paging({ products, bgColor }: PagingProps) {
  return (
    <div className={`${bgColor}`}>
      <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-5 md:text-base text-sm'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-4'>
          {products.map((p) => (
            <Product key={p.item_id} product={p} bgColor={bgColor} />
          ))}
        </div>
        <div className='text-center py-4 border-b-[1px] border-gray-200'>
          <button
            className={`text-[#2579F2] font-semibold ${classNames({
              'text-white': bgColor
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
