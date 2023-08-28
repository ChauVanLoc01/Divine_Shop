import { Popconfirm } from 'antd'
import { useDispatch } from 'react-redux'
import LinkToTop from 'src/Components/LinkToTop'
import { Item } from 'src/Types/items.type'
import { AppDispatch } from 'src/store'
import { addItemsIntoCart } from 'src/utils/slices/items.slice'
import { calculate_discount, createSlug, format_currency } from 'src/utils/utils'

type FavorateProps = {
  item: Item
  deleteFavorate: (item_id: string) => () => Promise<void>
}

function Favorate({ item, deleteFavorate }: FavorateProps) {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className='flex md:flex-row flex-col lg:gap-x-5 gap-x-2 md:gap-x-3 py-2'>
      <LinkToTop
        to={`/${createSlug(item.item_name, item.item_id)}`}
        className='md:basis-2/5 lg:basis-1/3 basis-1/3 rounded-md overflow-hidden'
      >
        <img className='bg-cover rounded-md' src={item.image} alt='picture' />
      </LinkToTop>
      <div className='md:basis-3/5 lg:basis-2/3 basis-2/3 flex lg:space-y-2 flex-col space-y-1'>
        <LinkToTop
          to={`/${createSlug(item.item_name, item.item_id)}`}
          className='font-medium md:text-lg xl:text-xl line-clamp-2 md:line-clamp-1'
        >
          {item.item_name}
        </LinkToTop>
        <div>
          <div className='text-gray-600 lg:block md:hidden'>Loại: {item.category}</div>
          <div className='flex items-center space-x-3 md:font-medium relative'>
            <Popconfirm
              title='Hủy bỏ yêu thích?'
              description='Bạn sẽ không nhận được email khuyến mãi'
              okText='Xóa'
              cancelText='Hủy'
              onConfirm={deleteFavorate(item.item_id)}
              zIndex={1000}
            >
              <button>
                <span className='text-red-600'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='lg:w-5 lg:h-5 w-4 h-4 md:stroke-2 fill-red-600'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                    />
                  </svg>
                </span>
              </button>
            </Popconfirm>
            <div className='flex space-x-1 text-[#2579F2] items-center'>
              <button
                onClick={() =>
                  dispatch(
                    addItemsIntoCart({
                      ...item,
                      buy_amount: 1
                    })
                  )
                }
                className='flex items-center space-x-2'
              >
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='lg:w-5 lg:h-5 w-4 h-4 md:stroke-2'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                </span>
                <span>Thêm vào giỏ hàng</span>
              </button>
              <div className='absolute md:hidden block bottom-0 right-2'>
                <button onClick={deleteFavorate(item.item_id)}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5 md:stroke-1 text-red-500'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='md:basis-1/6 lg:basis-1/4 md:flex md:justify-end hidden gap-x-5 text-right'>
        <div className='font-medium'>
          <div>{format_currency(item.price)}đ</div>
          <div>
            <span className='p-1 text-red-500'>-{calculate_discount(item.price, item.priceBeforeDiscount)}%</span>
            <span className='line-through text-gray-500'>{format_currency(item.priceBeforeDiscount)}đ</span>
          </div>
        </div>
        <div>
          <button onClick={deleteFavorate(item.item_id)} className='text-red-600'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='lg:w-6 lg:h-6 w-5 h-5 stroke-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Favorate
