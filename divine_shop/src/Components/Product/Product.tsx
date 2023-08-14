import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Item } from 'src/Types/items.type'
import { calculate_discount, createSlug, format_currency } from 'src/utils/utils'

type ProductProps = {
  product: Item
  bgColor?: string
}

function Product({ bgColor, product }: ProductProps) {
  return (
    <div
      className={classNames('relative flex flex-col justify-between', {
        'text-white': bgColor
      })}
    >
      <Link to={createSlug(product.item_name, product.item_id)} className='relative'>
        <img className='rounded-md cursor-pointer w-full object-cover' src={product.image} alt='Product Image' />
        <span
          className={classNames('text-white hidden px-2 py-1 bg-zinc-800 rounded-md absolute top-1 left-1', {
            'inline-block': product.quantity === 0
          })}
        >
          Hết hàng
        </span>
      </Link>
      <div>
        <Link
          to={createSlug(product.item_name, product.item_id)}
          className='line-clamp-1 md:line-clamp-2 cursor-pointer pt-2 pb-1 md:pb-0 md:pt-1 md:h-[70px]'
        >
          {product.item_name}
        </Link>
        <div className='flex md:space-x-3 space-x-2'>
          <span className='font-semibold'>{format_currency(product.price)}</span>
          <span className='line-through text-gray-400'>{format_currency(product.priceBeforeDiscount)}</span>
          <span className='px-1 bg-red-500 text-white rounded-md xl:static absolute top-0 right-0 xl:rotate-0 rotate-12'>
            -{calculate_discount(product.price, product.priceBeforeDiscount)}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default Product
