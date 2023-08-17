import NumberInput from 'src/Components/NumberInput'

function ProductInCart() {
  return (
    <div className='flex md:flex-row flex-col md:static relative md:gap-x-5 md:gap-y-0 gap-y-3'>
      <div className='basis-1/3 overflow-hidden'>
        <img
          className='w-full bg-cover rounded-md'
          src='https://cdn.divineshop.vn/image/catalog/Anh-SP/Netflix/Divine-Shop-NETFLIX-1-thang-23298.jpg?hash=1658829694'
          alt='picture'
        />
      </div>
      <div className='basis-2/3 space-y-3 divide-y divide-gray-200'>
        <div className='space-y-3'>
          <div>
            <div className='font-medium line-clamp-2 text-base md:text-lg'>
              Tài Khoản Netflix Premium 1 tháng - Xem phim chất lượng 4k và Full HD
            </div>
            <div className='text-gray-600'>App, Giải trí, Xem phim</div>
          </div>
          <div className='flex justify-evenly md:justify-start space-x-5'>
            <div>
              <NumberInput />
            </div>
            <div className='space-x-4'>
              <span className='py-1 px-2 text-white bg-red-600 rounded-md absolute top-0 right-0 rotate-12 md:static'>
                -66%
              </span>
              <span className='line-through text-gray-500'>260.000đ</span>
              <span className='font-semibold md:text-lg text-base'>89.000đ</span>
            </div>
          </div>
        </div>
        <div className='flex justify-between border-t border-t-gray-300 py-3'>
          <div className='flex space-x-3'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z'
                />
              </svg>
            </span>
            <div className='space-x-2'>
              <span className='ml-2'>Tình trạng:</span>
              <span className='text-green-600'>Còn hàng</span>
            </div>
          </div>
          <button className='text-red-600'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
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

export default ProductInCart
