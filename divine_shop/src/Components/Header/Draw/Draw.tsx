import { Drawer, DrawerProps } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PortalForm from 'src/Components/Form/PortalForm'
import LinkToTop from 'src/Components/LinkToTop'
import { ItemCategoryEnum } from 'src/Types/items.type'
import { AppDispatch, RootState } from 'src/store'
import { usePrefetch } from 'src/utils/apis/items.api'
import { setIsOpen } from 'src/utils/slices/user.slice'

function Draw() {
  const [openDraw, setOpenDraw] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const profile = useSelector((state: RootState) => state.UserSliceName.user)
  const openForm = useSelector((state: RootState) => state.UserSliceName.isOpen)
  const [placement, _] = useState<DrawerProps['placement']>('left')
  const items_prefetch = usePrefetch('getItemList')

  const onClose = () => {
    setOpenDraw(false)
  }

  const handleOpenPortal = (type: 'login' | 'register') => () => {
    dispatch(
      setIsOpen({
        open: true,
        type
      })
    )
  }
  useEffect(() => {
    setOpenDraw(false)
  }, [openForm])

  return (
    <>
      <button className='flex items-center text-left -ml-1 lg:hidden' onClick={() => setOpenDraw(true)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='md:w-12 w-10 h-10 stroke-1 md:h-12'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
      </button>
      <Drawer
        title={
          <div className='relative'>
            {profile ? (
              <div className='text-center flex items-center space-x-3 truncate'>
                {profile.avatar ? (
                  <span className='w-10 h-10 flex-shrink-0 rounded-full overflow-hidden'>
                    <img className='object-cover' src={profile.avatar} alt='avatar' />
                  </span>
                ) : (
                  <span className='rounded-full group-hover:bg-[#2985FF] border-[1px] border-white p-2'>
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
                        d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                      />
                    </svg>
                  </span>
                )}
                <span className='truncate pr-4 text-white md:text-lg text-base'>{profile.name}</span>
              </div>
            ) : (
              <div className='flex items-center space-x-3'>
                <button
                  className='group transition-all duration-200 flex items-center space-x-3'
                  onClick={handleOpenPortal('login')}
                >
                  <span className='rounded-full group-hover:bg-[#2985FF] border-[1px] border-gray-600 p-2'>
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
                        d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                      />
                    </svg>
                  </span>
                  <span>Đăng nhập</span>
                </button>
                <span>/</span>
                <button onClick={handleOpenPortal('register')}>Đăng kí</button>
                {openForm.open && openForm.type === 'login' && <PortalForm />}
                {openForm.open && openForm.type === 'register' && <PortalForm />}
              </div>
            )}
            <button className='absolute -top-2 -right-3 text-white' onClick={() => setOpenDraw(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 stroke-2'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
        }
        headerStyle={{
          backgroundColor: '#2579F2'
        }}
        footer={
          <button className='space-x-3 flex md:text-base mx-auto'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='md:w-6 md:h-6 w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                />
              </svg>
            </span>
            <span>Đăng xuất</span>
          </button>
        }
        placement={placement}
        closable={false}
        onClose={onClose}
        open={openDraw}
        key={placement}
        size='default'
      >
        <div className='divide-y divide-gray-300 space-y-2'>
          <div className='flex flex-col space-y-2 text-sm'>
            <LinkToTop to={''} className='space-x-3 flex items-center'>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='md:w-6 md:h-6 w-5 h-5'
                >
                  <path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z' />
                  <path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z' />
                </svg>
              </span>
              <span>Trang chủ</span>
            </LinkToTop>
            <LinkToTop to={''} className='space-x-3 flex items-center'>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='md:w-6 md:h-6 w-5 h-5'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              <span>Quản lý tài khoản</span>
            </LinkToTop>
            <LinkToTop to={''} className='space-x-3 flex items-center'>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='md:w-6 md:h-6 w-5 h-5'
                >
                  <path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
                </svg>
              </span>
              <span>Lịch sử đơn hàng</span>
            </LinkToTop>
            <LinkToTop to={''} className='space-x-3 flex items-center'>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='md:w-6 md:h-6 w-5 h-5'
                >
                  <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
                </svg>
              </span>
              <span>Sản phẩm yêu thích</span>
            </LinkToTop>
          </div>
          <div className='space-y-2 py-2 text-sm'>
            <LinkToTop
              to={{
                pathname: '/search',
                search: `category=${ItemCategoryEnum.entertainment}`
              }}
              className='flex space-x-3 items-center hover:bg-gray-100 p-1 rounded-md pr-10'
              onMouseEnter={() =>
                items_prefetch({
                  category: ItemCategoryEnum.entertainment
                })
              }
            >
              <img
                className='object-cover'
                src='https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/giaitri-25627.svg?hash=1640449820'
                alt='giaitripicture'
              />
              <span className='line-clamp-1'>Giải trí</span>
            </LinkToTop>
            <LinkToTop
              onMouseEnter={() =>
                items_prefetch({
                  category: ItemCategoryEnum.work
                })
              }
              to={{
                pathname: '/search',
                search: `category=${ItemCategoryEnum.work}`
              }}
              className='flex space-x-3 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
            >
              <img
                className='object-cover'
                src='https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/lamviec-71000.svg?hash=1640449820'
                alt='lamviecpicture'
              />
              <span className='line-clamp-1'>Làm việc</span>
            </LinkToTop>
            <LinkToTop
              onMouseEnter={() =>
                items_prefetch({
                  category: ItemCategoryEnum.learn
                })
              }
              to={{
                pathname: '/search',
                search: `category=${ItemCategoryEnum.learn}`
              }}
              className='flex space-x-3 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
            >
              <img
                className='object-cover'
                src='https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/hoctap-68990.svg?hash=1640449820'
                alt='hoctappicture'
              />
              <span className='line-clamp-1'>Học tập</span>
            </LinkToTop>
            <LinkToTop
              onMouseEnter={() =>
                items_prefetch({
                  category: ItemCategoryEnum.game_steam
                })
              }
              to={{
                pathname: '/search',
                search: `category=${ItemCategoryEnum.game_steam}`
              }}
              className='flex space-x-3 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
            >
              <img
                className='object-cover'
                src='https://cdn.divineshop.vn/image/catalog/Banner/Icon/Steam-66507.svg?hash=1640449899'
                alt='gamestreampicture'
              />
              <span className='line-clamp-1'>Game stream</span>
            </LinkToTop>
            <LinkToTop
              onMouseEnter={() =>
                items_prefetch({
                  category: ItemCategoryEnum.window_office
                })
              }
              to={{
                pathname: '/search',
                search: `category=${ItemCategoryEnum.window_office}`
              }}
              className='flex space-x-3 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
            >
              <img
                className='object-cover'
                src='https://cdn.divineshop.vn/image/catalog/Banner/Icon/roblox2-83248.svg?hash=1649948527'
                alt='giaitripicture'
              />
              <span className='line-clamp-1'>Window Office</span>
            </LinkToTop>
            <LinkToTop
              onMouseEnter={() =>
                items_prefetch({
                  category: ItemCategoryEnum.google_drive
                })
              }
              to={{
                pathname: '/search',
                search: `category=${ItemCategoryEnum.google_drive}`
              }}
              className='flex space-x-3 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
            >
              <img
                className='object-cover'
                src='https://cdn.divineshop.vn/image/catalog/Banner/Icon/Xbox%20Logo-88261.svg?hash=1640449899'
                alt='googledrivepicture'
              />
              <span className='line-clamp-1'>Google Drive</span>
            </LinkToTop>
            <LinkToTop
              onMouseEnter={() =>
                items_prefetch({
                  category: ItemCategoryEnum.steam_wallet
                })
              }
              to={{
                pathname: '/search',
                search: `category=${ItemCategoryEnum.steam_wallet}`
              }}
              className='flex space-x-3 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
            >
              <img
                className='object-cover'
                src='https://cdn.divineshop.vn/image/catalog/Banner/Icon/Steam%20Wallet-41454.svg?hash=1640449899'
                alt='streamwalletpicture'
              />
              <span className='line-clamp-1'>Stream Wallet</span>
            </LinkToTop>
            <LinkToTop
              onMouseEnter={() =>
                items_prefetch({
                  category: ItemCategoryEnum.google_play_itune
                })
              }
              to={{
                pathname: '/search',
                search: `category=${ItemCategoryEnum.google_play_itune}`
              }}
              className='flex space-x-3 items-center hover:bg-gray-100 px-1 xl:py-1 rounded-md xl:pr-10'
            >
              <img
                className='object-cover'
                src='https://cdn.divineshop.vn/image/catalog/Banner/Icon/Google%20Play-42608.svg?hash=1640449899'
                alt='googleplayitunespicture'
              />
              <span className='line-clamp-1'>Google Play, iTunes</span>
            </LinkToTop>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default Draw
