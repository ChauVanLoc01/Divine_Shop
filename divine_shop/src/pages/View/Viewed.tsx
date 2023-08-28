import { useSelector } from 'react-redux'
import Product from 'src/Components/Product'
import { RootState } from 'src/store'

function Viewed() {
  const items = useSelector((state: RootState) => state.ItemsSliceName.viewed)
  return (
    <div className='py-2 md:py-4 space-y-6'>
      <div className='text-gray-800 xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-4 space-y-3 md:space-y-5'>
        <div className='font-medium text-2xl lg:text-3xl'>Sản phẩm bạn đã xem</div>
        {items.length > 0 ? (
          <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-4 mx-auto'>
            {items.map((p) => (
              <Product key={p.item_id} product={p} />
            ))}
          </div>
        ) : (
          <div className='space-y-4 text-center py-8'>
            <div className='w-fit mx-auto'>
              <img src='https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg' alt='image' />
            </div>
            <div>Bạn chưa xem qua sản phẩm nào cả</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Viewed
