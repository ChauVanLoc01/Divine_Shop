import Paging from 'src/Components/Paging'
import Category from './Category'
import Banner from './Banner'
import { useGetItemListQuery } from 'src/utils/apis/items.api'
import { ItemCategoryEnum } from 'src/Types/items.type'
import LinkToTop from 'src/Components/LinkToTop'

function Home() {
  const {
    data: data_game_stream,
    isError: isErrGameSteam,
    isFetching: isFetchingGameStema
  } = useGetItemListQuery({
    category: ItemCategoryEnum.game_steam
  })
  const {
    data: data_new,
    isError: isErrNew,
    isFetching: isFetchingNew
  } = useGetItemListQuery({
    order_by_created: 'desc'
  })
  const {
    data: data_best_sold,
    isError: isErrBestSold,
    isFetching: isFetchingBestSold
  } = useGetItemListQuery({
    order_by_sold: 'desc'
  })
  return (
    <div className='bg-[#F3F4F6] lg:py-4 space-y-8'>
      <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-4 md:text-base text-sm'>
        <div className='md:space-y-4 space-y-2'>
          <div className='flex lg:flex-row flex-col justify-between lg:space-y-0 md:space-y-4 space-y-2'>
            <div className='lg:w-[19%] lg:block hidden h-full rounded-md overflow-hidden'>
              <Category />
            </div>
            <div className='lg:w-[54%] rounded-md overflow-hidden flex-shrink-0'>
              <img
                src='https://cdn.divineshop.vn/image/catalog/Anh/24.12.21/data%20si%C3%AAu%20t%E1%BB%91c-76618.png?hash=1640349471'
                alt='picture'
              />
            </div>
            <div className='lg:w-[24%] flex flex-row lg:flex-col place-content-between flex-shrink-0'>
              <img
                className='rounded-md lg:w-full w-[49%]'
                src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/VPN-26080.png?hash=1681964388'
                alt='bannerpicture'
              />
              <img
                className='rounded-md lg:w-full w-[49%]'
                src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/Spotify-94894.png?hash=1681964396'
                alt='bannerpicture2'
              />
            </div>
          </div>
          <div className='grid md:grid-rows-1 md:grid-cols-4 grid-rows-2 grid-cols-2 gap-2 md:gap-4'>
            <div className='rounded-md overflow-hidden flex-shrink-0'>
              <img
                src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/Steam-46397.png?hash=1681964405'
                alt='picture'
              />
            </div>
            <div className='rounded-md overflow-hidden flex-shrink-0'>
              <img
                src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/GPT-14698.png?hash=1681964414'
                alt='picture'
              />
            </div>
            <div className='rounded-md overflow-hidden flex-shrink-0'>
              <img
                src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/gmail-72495.png?hash=1681964422'
                alt='picture'
              />
            </div>
            <div className='rounded-md overflow-hidden flex-shrink-0'>
              <img
                src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/Microsoft%20Office-53247.png?hash=1681964430'
                alt='picture'
              />
            </div>
          </div>
        </div>
      </div>
      <Banner
        title='Sản phẩm mới'
        desc='Danh sách những sản phẩm theo xu hướng mà có thể bạn sẽ thích'
        hasButton={true}
        content={
          <Paging
            products={data_new?.data.items}
            page_size={data_best_sold?.data.query.page_size}
            isFetching={isFetchingNew}
            isError={isErrNew}
          />
        }
        to={'/search?order_by_created=desc'}
      />
      <Banner
        title='Từ khóa nổi bật'
        hasButton={false}
        content={
          <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-4 md:text-base text-sm grid md:grid-cols-6 grid-cols-3 lg:gap-4 md:gap-3 gap-2'>
            <LinkToTop
              to={'/search?category=work'}
              className='bg-[#3D5A80] lg:py-5 py-3 rounded-lg text-white font-semibold text-center'
            >
              Làm việc
            </LinkToTop>
            <LinkToTop
              to={'/search?category=entertainment'}
              className='bg-[#98C1D9] lg:py-5 py-3 rounded-lg text-white font-semibold text-center'
            >
              Giải trí
            </LinkToTop>
            <LinkToTop
              to={'/search?category=learn'}
              className='bg-[#EE6C4D] lg:py-5 py-3 rounded-lg text-white font-semibold text-center'
            >
              Học tập
            </LinkToTop>
            <LinkToTop
              to={'/search?item_name=Spotify'}
              className='bg-[#293241] lg:py-5 py-3 rounded-lg text-white font-semibold text-center'
            >
              Spotify
            </LinkToTop>
            <LinkToTop
              to={'/search?item_name=Wallet'}
              className='bg-[#545B67] lg:py-5 py-3 rounded-lg text-white font-semibold text-center'
            >
              Wallet
            </LinkToTop>
            <LinkToTop
              to={'/search?item_name=Youtube'}
              className='bg-[#767C85] lg:py-5 py-3 rounded-lg text-white font-semibold text-center'
            >
              Youtube
            </LinkToTop>
          </div>
        }
      />
      <Banner
        title={
          <div className='md:px-4 md:py-2 py-1 px-2 rounded-full border-2 border-white bg-transparent flex md:space-x-3 space-x-1 text-white text-lg md:text-xl font-semibold bg-[url("https://divineshop.vn/static/0de2668c294edf9d5fd8a8647b2c65b6.png")]'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 stroke-2 stroke-red-500'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941'
                />
              </svg>
            </span>
            <span>#Sản phẩm bán chạy nhất</span>
          </div>
        }
        img='https://divineshop.vn/static/0de2668c294edf9d5fd8a8647b2c65b6.png'
        content={
          <Paging
            products={data_best_sold?.data.items}
            page_size={data_best_sold?.data.query.page_size}
            bgColor='bg-[#000D21]'
            isError={isErrBestSold}
            isFetching={isFetchingBestSold}
          />
        }
        hasButton={true}
        to={'/search?order_by_sold=desc'}
      />
      <Banner
        title='Giá phù hợp'
        hasButton={false}
        content={
          <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-4 md:text-base text-sm grid md:grid-cols-6 grid-cols-3 lg:gap-4 md:gap-3 gap-2 font-semibold text-gray-600'>
            <LinkToTop
              to={'/search?price_max=20000'}
              className='bg-white border-[1px] border-gray-200 lg:py-5 py-3 rounded-lg text-center'
            >
              20.000đ
            </LinkToTop>
            <LinkToTop
              to={'/search?price_max=50000'}
              className='bg-white border-[1px] border-gray-200 lg:py-5 py-3 rounded-lg text-center'
            >
              50.000đ
            </LinkToTop>
            <LinkToTop
              to={'/search?price_max=100000'}
              className='bg-white border-[1px] border-gray-200 lg:py-5 py-3 rounded-lg text-center'
            >
              100.000đ
            </LinkToTop>
            <LinkToTop
              to={'/search?price_max=200000'}
              className='bg-white border-[1px] border-gray-200 lg:py-5 py-3 rounded-lg text-center'
            >
              200.000đ
            </LinkToTop>
            <LinkToTop
              to={'/search?price_max=500000'}
              className='bg-white border-[1px] border-gray-200 lg:py-5 py-3 rounded-lg text-center'
            >
              500.000đ
            </LinkToTop>
            <LinkToTop
              to={'/search?price_max=1000000'}
              className='bg-white border-[1px] border-gray-200 lg:py-5 py-3 rounded-lg text-center'
            >
              1.000.000đ
            </LinkToTop>
          </div>
        }
      />
      <Banner
        title='Game trên Steam'
        hasButton={true}
        to={'/search?category=game_steam'}
        desc='Những trò chơi được đánh giá tốt, nội dung hấp dẫn thu hút đang chờ bạn'
        content={
          <Paging
            products={data_game_stream?.data.items}
            page_size={data_game_stream?.data.query.page_size}
            isError={isErrGameSteam}
            isFetching={isFetchingGameStema}
          />
        }
      />
    </div>
  )
}

export default Home
