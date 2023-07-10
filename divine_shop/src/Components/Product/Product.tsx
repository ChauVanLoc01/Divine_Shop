import classNames from 'classnames'

type ProductProps = {
  product: Object
  bgColor?: string
}

function Product({ product, bgColor }: ProductProps) {
  return (
    <div
      className={`md:static relative ${classNames({
        'text-white': bgColor
      })}`}
    >
      <img
        className='rounded-md'
        src='https://cdn.divineshop.vn/image/catalog/Discord%20Nitro%203%20thang-71170.jpg?hash=1672370038'
        alt=''
      />
      <div className='lg:py-3 py-2 space-y-2'>
        <p className={`line-clamp-2)}`}>Discord Nitro 3 tháng (Đăng kí lần đầu)</p>
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
