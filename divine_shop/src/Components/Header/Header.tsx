import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='text-white'>
      <div className='bg-[#0A59CC] py-2 lg:block hidden'>
        <div className='flex xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-5 md:text-base text-sm'>
          <div className='flex items-center space-x-2 basis-1/3'>
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
                  d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3'
                />
              </svg>
            </span>
            <span>Tài khoản google drive giá rẻ</span>
          </div>
          <div className='flex justify-end basis-2/3 lg:space-x-3 xl:space-x-6'>
            <div className='flex items-center space-x-2'>
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
                    d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
                  />
                </svg>
              </span>
              <span>Hướng dẫn mua hàng</span>
            </div>
            <div className='flex items-center space-x-2'>
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
                    d='M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z'
                  />
                </svg>
              </span>
              <span>Ưu đãi khách hàng</span>
            </div>
            <div className='flex items-center space-x-2'>
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
                    d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
                  />
                </svg>
              </span>
              <span>Thông tin liên hệ</span>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#2579F2]'>
        <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-5 md:text-base text-sm lg:py-3 py-1 lg:space-y-3 space-y-1'>
          <div className='flex justify-between'>
            <Link to={'/'} className='text-3xl font-mono lg:flex hidden items-center space-x-3 hover:cursor-pointer'>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z'
                  />
                </svg>
              </span>{' '}
              <span>Store</span>
            </Link>
            <div className='flex justify-center items-center lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='lg:w-10 lg:h-10 w-8 h-8 stroke-2'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
            </div>
            <form className='flex md:w-[35%] w-[55%] py-2'>
              <div className='relative w-full'>
                <button type='button' className='absolute right-1 top-1/2 -translate-y-1/2 text-gray-500'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='lg:w-4 w-3 lg:h-4 h-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
                <input
                  className='w-full h-full rounded-l-md text-gray-600 outline-none md:pl-4 md:pr-6 pl-3 pr-5'
                  type='text'
                  name='search'
                  id='search'
                  placeholder=''
                />
              </div>
              <button type='submit' className='bg-[#0B62E0] px-3 rounded-r-md'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 lg:w-5 h-4 lg:h-5 stroke-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </form>
            <div className='md:flex items-center space-x-2 hidden'>
              <button className='group transition-all duration-200 flex items-center space-x-2'>
                <span className='rounded-full group-hover:bg-[#2985FF] border-[1px] border-white p-2 xl:inline-block hidden'>
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
                      d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                    />
                  </svg>
                </span>
                <span>Đăng nhập</span>
              </button>
              <span>/</span>
              <button>Đăng ký</button>
            </div>
            <div className='p-2'>
              <button className='flex items-center space-x-2 py-1 px-2  lg:p-2 border-[1px] hover:bg-[#2985FF] transition-all duration-200 border-white rounded-md'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='lg:w-6 h-4 lg:h-6 w-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
                <span className='md:block hidden'>Giỏ hàng</span>
                <span className='text-gray-600 bg-white rounded-md px-1'>0</span>
              </button>
            </div>
          </div>
          <div className='overflow-x-scroll pb-2 lg:pb-0 hide-scroll-bar'>
            <div className='flex lg:justify-between justify-stretch space-x-5'>
              <div className='space-x-2 flex items-center hover:underline hover:cursor-pointer flex-shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                  />
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                <span>Sản phẩm bạn vừa xem</span>
              </div>
              <div className='space-x-2 flex items-center hover:underline hover:cursor-pointer flex-shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z'
                  />
                </svg>
                <span>Sản phẩm mua nhiều</span>
              </div>
              <div className='space-x-2 flex items-center hover:underline hover:cursor-pointer flex-shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                  />
                </svg>
                <span>Sản phẩm khuyến mãi</span>
              </div>
              <div className='space-x-2 hidden xl:flex items-center hover:underline hover:cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z'
                  />
                </svg>
                <span>Đại lý giao dịch</span>
              </div>
              <div className='space-x-2 flex items-center hover:underline hover:cursor-pointer flex-shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
                  />
                </svg>
                <span>Hình thức thanh toán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white text-gray-700 font-semibold lg:block hidden'>
        <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-5 md:text-base text-sm py-2 flex items-center justify-between'>
          <button className='flex space-x-1 xl:space-x-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>
            <span>Danh mục sản phẩm</span>
          </button>
          <div className='flex lg:space-x-6'>
            <button className='flex items-center xl:space-x-2 space-x-1'>
              <img
                className='scale-90'
                src='https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Nap-thesvg-30724.svg?hash=1640449820'
                alt='thuthuat&tintucpicture'
              />
              <span>Thủ Thuật & Tin Tức</span>
            </button>
            <button className='flex items-center xl:space-x-2 space-x-1'>
              <img
                className='scale-90'
                src='https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Gioi-thieu-ban-be-87652.svg?hash=1640449820'
                alt='gioithieubanbepicture'
              />
              <span>Giới thiệu bạn bè</span>
            </button>
            <button className='flex items-center xl:space-x-2 space-x-1'>
              <img
                className='scale-90'
                src='https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Lien-he-hop-tac-33199.svg?hash=1640449820'
                alt='lienhehoptacpicture'
              />
              <span>Liên hệ hợp tác</span>
            </button>
            <button className='xl:flex hidden items-center xl:space-x-2 space-x-1'>
              <img
                className='scale-90'
                src='https://cdn.divineshop.vn/image/catalog/Anh/Icon%20svg/Uu-dai-khach-vip-79547.svg?hash=1640449820'
                alt='uudaikhachhangvippicture'
              />
              <span>Ưu đãi khách hàng vip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
