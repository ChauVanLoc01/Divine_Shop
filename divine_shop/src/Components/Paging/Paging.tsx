import Product from '../Product'

type PagingProps = {
  products: any[]
}

function Paging({ products }: PagingProps) {
  return (
    <div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-4'>
        {products.map((p) => (
          <Product product={p} />
        ))}
      </div>
      <div className='text-center py-4 border-b-[1px] border-gray-200'>
        <button className='text-[#2579F2] font-semibold'>Xem thêm</button>
      </div>
    </div>
  )
}

export default Paging
