import { ItemQuery } from 'src/Types/items.type'
import ListBox from './ListBox'
import { useNavigate } from 'react-router-dom'
import { joinPathQuery } from 'src/utils/utils'

type SortProps = {
  query: ItemQuery
  setQuery: React.Dispatch<React.SetStateAction<ItemQuery>>
}

const category = [
  'entertainment',
  'work',
  'learn',
  'game_steam',
  'ea_games',
  'window_office',
  'google_drive',
  'steam_wallet',
  'google_play_itune'
]

function Sort({ query, setQuery }: SortProps) {
  const navigate = useNavigate()
  const handleFiler = () => {
    navigate({
      pathname: '/search',
      search: joinPathQuery(query)
    })
  }
  const handleRecovery = () => {
    setQuery({})
    navigate({
      pathname: '/search'
    })
  }
  return (
    <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-5 md:text-base text-sm space-y-4'>
      <div className='font-semibold text-2xl'>Tìm kiếm sản phẩm</div>
      <form className='flex md:gap-x-4 gap-3 flex-wrap'>
        <div className='xl:basis-1/5 lg:basis-3/12 md:basis-4/12 w-[54%]'>
          <ListBox title='Danh mục' key_data='category' data={category} query={query} setQuery={setQuery} />
        </div>
        <div className='xl:basis-1/5 lg:basis-2/12 md:basis-3/12 w-[39%]'>
          <ListBox
            title='Khoảng giá'
            key_data='price'
            data={['dưới 100k', '100k - 500k', '500k - 1tr', 'trên 1tr']}
            query={query}
            setQuery={setQuery}
          />
        </div>
        <div className='xl:basis-1/5 lg:basis-2/12 md:basis-3/12 w-[42%]'>
          <ListBox
            title='Sắp xếp'
            key_data='order'
            data={['Mới nhất', 'Cũ nhất', 'Bán chạy', 'Giá tăng dần', 'Giá giảm dần']}
            query={query}
            setQuery={setQuery}
          />
        </div>
        <div>
          <button
            onClick={handleFiler}
            type='button'
            className='text-white flex items-center py-2 px-3 md:px-5 md:py-2 rounded-md space-x-2 bg-[#2579F2] hover:bg-[#2579F2]/90 ease-linear duration-100 transition-all'
          >
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
                />
              </svg>
            </span>
            <span>Lọc</span>
          </button>
        </div>
        <div>
          <button onClick={handleRecovery} type='button' className='text-red-600 space-x-2 flex items-center py-2'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
                />
              </svg>
            </span>
            <span>Khôi phục bộ lọc</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default Sort
