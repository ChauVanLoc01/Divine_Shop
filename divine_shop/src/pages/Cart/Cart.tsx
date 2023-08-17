import ProductInCart from './ProductInCart'

function Cart() {
  return (
    <div className='bg-[#F3F4F6] md:p-5 p-2 xl:py-5'>
      <div className='xl:max-w-5xl xl:mx-auto md:text-base text-sm md:px-5 px-2 pb-2 md:pb-5 bg-white rounded-md space-y-5'>
        <div className='py-3 lg:py-5 static lg:sticky top-0 bg-white flex items-center border-gray-200 border-b space-x-3'>
          <span className='text-2xl font-semibold xl:text-3xl'>Giỏ hàng</span>
          <span>(6 sản phẩm)</span>
        </div>
        <div className='bg-white flex lg:flex-row flex-col rounded-md lg:space-y-0 space-y-4 lg:space-x-5'>
          <div className='basis-4/6 xl:basis-3/5 space-y-4 md:space-y-7'>
            <ProductInCart />
            <ProductInCart />
            <ProductInCart />
            <ProductInCart />
            <ProductInCart />
          </div>
          <div className='basis-2/6 xl:basis-2/5 bottom-0 bg-white lg:bg-none lg:py-0 py-5 lg:border-none border-t border-gray-200 ring-gray-300'>
            <div className='lg:border-l sticky lg:top-10 lg:border-l-gray-300 px-2 md:px-5 space-y-2 lg:space-y-3'>
              <div className='text-lg md:text-xl font-medium'>Thanh toán</div>
              <div className='flex justify-between'>
                <span>Tổng giá trị đơn hàng</span>
                <span>28.000đ</span>
              </div>
              <div className='flex justify-between'>
                <span>Số tiền giảm giá</span>
                <span>28.000đ</span>
              </div>
              <div className='flex justify-between'>
                <span className=''>Tổng tiền phải trả</span>
                <span className='font-medium text-xl md:text-lg text-red-600'>28.000đ</span>
              </div>
              <div className='flex justify-end'>
                <button className='px-5 w-full hover:bg-[#2579F2]/90 py-2 bg-[#2579F2] text-white rounded-md'>
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
