import LinkToTop from 'src/Components/LinkToTop'
import { ItemCategoryEnum } from 'src/Types/items.type'

type CategoryProps = {
  func?: () => void
}

function Category({ func }: CategoryProps) {
  return (
    <div className='bg-white p-2 h-full'>
      <LinkToTop
        to={{
          pathname: '/search',
          search: `category=${ItemCategoryEnum.entertainment}`
        }}
        className='flex space-x-2 items-center hover:bg-gray-100 p-1 rounded-md pr-10'
        onClick={func}
      >
        <img
          className='opacity-60 scale-[0.8]'
          src='https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/giaitri-25627.svg?hash=1640449820'
          alt='giaitripicture'
        />
        <span className='line-clamp-1'>Giải trí</span>
      </LinkToTop>
      <LinkToTop
        onClick={func}
        to={{
          pathname: '/search',
          search: `category=${ItemCategoryEnum.work}`
        }}
        className='flex space-x-2 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
      >
        <img
          className='opacity-60 scale-[0.8]'
          src='https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/lamviec-71000.svg?hash=1640449820'
          alt='lamviecpicture'
        />
        <span className='line-clamp-1'>Làm việc</span>
      </LinkToTop>
      <LinkToTop
        onClick={func}
        to={{
          pathname: '/search',
          search: `category=${ItemCategoryEnum.learn}`
        }}
        className='flex space-x-2 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
      >
        <img
          className='opacity-60 scale-[0.8]'
          src='https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/hoctap-68990.svg?hash=1640449820'
          alt='hoctappicture'
        />
        <span className='line-clamp-1'>Học tập</span>
      </LinkToTop>
      <LinkToTop
        onClick={func}
        to={{
          pathname: '/search',
          search: `category=${ItemCategoryEnum.game_steam}`
        }}
        className='flex space-x-2 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
      >
        <img
          className='opacity-60 scale-[0.8]'
          src='https://cdn.divineshop.vn/image/catalog/Banner/Icon/Steam-66507.svg?hash=1640449899'
          alt='gamestreampicture'
        />
        <span className='line-clamp-1'>Game stream</span>
      </LinkToTop>
      <LinkToTop
        onClick={func}
        to={{
          pathname: '/search',
          search: `category=${ItemCategoryEnum.window_office}`
        }}
        className='flex space-x-2 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
      >
        <img
          className='opacity-60 scale-[0.8]'
          src='https://cdn.divineshop.vn/image/catalog/Banner/Icon/roblox2-83248.svg?hash=1649948527'
          alt='giaitripicture'
        />
        <span className='line-clamp-1'>Window Office</span>
      </LinkToTop>
      <LinkToTop
        onClick={func}
        to={{
          pathname: '/search',
          search: `category=${ItemCategoryEnum.google_drive}`
        }}
        className='flex space-x-2 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
      >
        <img
          className='opacity-60 scale-[0.8]'
          src='https://cdn.divineshop.vn/image/catalog/Banner/Icon/Xbox%20Logo-88261.svg?hash=1640449899'
          alt='googledrivepicture'
        />
        <span className='line-clamp-1'>Google Drive</span>
      </LinkToTop>
      <LinkToTop
        onClick={func}
        to={{
          pathname: '/search',
          search: `category=${ItemCategoryEnum.steam_wallet}`
        }}
        className='flex space-x-2 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
      >
        <img
          className='opacity-60 scale-[0.8]'
          src='https://cdn.divineshop.vn/image/catalog/Banner/Icon/Steam%20Wallet-41454.svg?hash=1640449899'
          alt='streamwalletpicture'
        />
        <span className='line-clamp-1'>Stream Wallet</span>
      </LinkToTop>
      <LinkToTop
        onClick={func}
        to={{
          pathname: '/search',
          search: `category=${ItemCategoryEnum.google_play_itune}`
        }}
        className='flex space-x-2 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
      >
        <img
          className='opacity-60 scale-[0.8]'
          src='https://cdn.divineshop.vn/image/catalog/Banner/Icon/Google%20Play-42608.svg?hash=1640449899'
          alt='googleplayitunespicture'
        />
        <span className='line-clamp-1'>Google Play, iTunes</span>
      </LinkToTop>
    </div>
  )
}

export default Category
