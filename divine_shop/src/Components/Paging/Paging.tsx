import { Item, ItemQuery } from 'src/Types/items.type'
import Product from '../Product'
import ProductSkeleton from '../ProductSkeleton'
import Pagination from 'antd/es/pagination'
import { useNavigate } from 'react-router-dom'

type PagingProps = {
  query?: ItemQuery
  setQuery?: React.Dispatch<React.SetStateAction<ItemQuery>>
  products?: Item[]
  bgColor?: string
  page_size?: number
  isPaging?: boolean
  isFetching?: boolean
  isError?: boolean
}

function Paging({ products, bgColor, page_size, isPaging, isFetching, query, setQuery, isError }: PagingProps) {
  const navigate = useNavigate()
  const handleJumpPage = (page: number) => {
    setQuery &&
      setQuery({
        ...query,
        page
      })
    const search = Object.entries({ ...query, page } as ItemQuery)
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
    navigate({
      pathname: '/search',
      search
    })
  }
  return (
    <div className={`${bgColor}`}>
      <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-5 md:text-base text-sm'>
        {products && products.length > 0 && (
          <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-4'>
            {products.map((p) => (
              <Product key={p.item_id} product={p} bgColor={bgColor} />
            ))}
          </div>
        )}
        {products && products.length === 0 && (
          <div className='space-y-4 text-center py-8'>
            <div className='w-fit mx-auto'>
              <img src='https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg' alt='image' />
            </div>
            <div>Không tìm thấy sản phẩm phù hợp</div>
          </div>
        )}
        {isFetching && (
          <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 md:gap-4'>
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
          </div>
        )}
        {!isFetching && isError && (
          <div className='space-y-4 text-center py-8'>
            <div className='w-fit mx-auto'>
              <img src='https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg' alt='image' />
            </div>
            <div>Có lỗi khi load dữ liệu</div>
          </div>
        )}
        <div className='text-center pt-10 pb-8 border-b-[1px] border-gray-200'>
          {isPaging && (page_size as number) > 1 && (
            <Pagination
              onChange={handleJumpPage}
              defaultPageSize={1}
              defaultCurrent={1}
              current={query?.page ? query.page : 1}
              total={page_size}
              showSizeChanger={false}
              rootClassName='text-base md:text-lg'
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Paging
