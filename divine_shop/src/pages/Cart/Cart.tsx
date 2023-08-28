import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductInCart from './ProductInCart'
import { AppDispatch, RootState } from 'src/store'
import { useGetItemListQuery } from 'src/utils/apis/items.api'
import { updateItemsFromCart } from 'src/utils/slices/items.slice'
import SkeletonInCart from './SkeletonInCart/SkeletonInCart'
import Bill from './Bill'
import SkeletonBill from './SkeletonBill'
import LinkToTop from 'src/Components/LinkToTop'
import { Path } from 'src/App'

function Cart() {
  const dispatch = useDispatch<AppDispatch>()
  const items_in_cart = useSelector((state: RootState) => state.ItemsSliceName.cart)
  const { data } = useGetItemListQuery(
    {
      many: items_in_cart.map((e) => e.item_id).join(',')
    },
    { skip: items_in_cart.length === 0 }
  )
  useEffect(() => {
    if (data) {
      dispatch(updateItemsFromCart(data.data.items))
    }
  }, [data])

  return (
    <div className='bg-[#F3F4F6] md:p-5 p-2 xl:py-5'>
      <div className='xl:max-w-5xl xl:mx-auto md:text-base text-sm md:px-5 px-2 pb-2 md:pb-5 bg-white rounded-md space-y-5'>
        <div className='py-3 lg:py-5 static lg:sticky top-0 bg-white flex items-center border-gray-200 border-b space-x-3'>
          <span className='text-2xl font-semibold xl:text-3xl'>Giỏ hàng</span>
          <span>({items_in_cart.filter((e) => e.quantity > 0).length} sản phẩm)</span>
        </div>
        {items_in_cart.length > 0 ? (
          <div className='bg-white flex lg:flex-row flex-col rounded-md lg:space-y-0 space-y-4 lg:space-x-5'>
            <div className='lg:basis-1/2 xl:basis-3/5 space-y-4 md:space-y-7'>
              {data
                ? items_in_cart.map((e) => <ProductInCart item={e} key={e.item_id} />)
                : items_in_cart.map((e) => <SkeletonInCart key={e.item_id} />)}
            </div>
            {data ? <Bill items_in_cart={items_in_cart.filter((e) => e.quantity > 0)} /> : <SkeletonBill />}
          </div>
        ) : (
          <div className='bg-white flex flex-col items-center py-3 space-y-3'>
            <img src={'https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg'} alt='empty-image' />
            <LinkToTop
              to={`/${Path.search}`}
              className='px-5 py-2 hover:text-white hover:bg-[#2579F2] hover:duration-200 hover:ease-linear ring-1 ring-[#2579F2] text-[#2579F2] rounded-md'
            >
              Mua hàng ngay
            </LinkToTop>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
