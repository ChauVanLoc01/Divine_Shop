import classNames from 'classnames'

type ProductProps = {
  product: Object
  bgColor?: string
}

function Product({ bgColor }: ProductProps) {
  return (
    <div
      className={`md:static relative ${classNames({
        'text-white': bgColor
      })}`}
    >
      <a className='relative' href=''>
        <img
          className='rounded-md cursor-pointer'
          src='https://cdn.divineshop.vn/image/catalog/Discord%20Nitro%203%20thang-71170.jpg?hash=1672370038'
          alt=''
        />
        <span className='text-white px-3 py-1 bg-zinc-800 rounded-md absolute top-2 left-2'>Hết hàng</span>
      </a>
      <div className='lg:py-3 py-2 space-y-2'>
        <a className='line-clamp-2 cursor-pointer'>Discord Nitro 3 tháng (Đăng kí lần đầu)</a>
        <div className='flex md:space-x-3 space-x-2'>
          <span className='font-semibold'>165.000đ</span>
          <span className='line-through text-gray-400'>165.000đ</span>
          <span className='px-1 bg-red-500 text-white rounded-md md:static absolute top-0 right-0 md:rotate-0 rotate-12'>
            -80%
          </span>
        </div>
      </div>
    </div>
  )
}

export default Product
