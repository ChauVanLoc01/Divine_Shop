import classNames from 'classnames'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Path } from 'src/App'

function User() {
  const location = useLocation()
  return (
    <div className='bg-[#F3F4F6]'>
      <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-4 md:text-base text-sm py-2 md:py-4 md:space-y-4 space-y-2'>
        <div className='overflow-x-scroll p-1 lg:w-fit hide-scroll-bar rounded-md bg-white'>
          <div className='flex'>
            <Link
              to={`/${Path.user}/${Path.profile}`}
              className={classNames(
                'px-4 lg:px-3 xl:px-4 py-2 flex-shrink-0 rounded-md hover:bg-gray-100 duration-100 transition-all ease-linear flex items-center space-x-2',
                {
                  'bg-gray-100': location.pathname.endsWith(Path.profile)
                }
              )}
            >
              <span>
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
                    d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                  />
                </svg>
              </span>
              <span>Tài khoản</span>
            </Link>
            <Link
              to={`/${Path.user}/${Path.password}`}
              className={classNames(
                'px-4 lg:px-3 xl:px-4 py-2 flex-shrink-0 rounded-lg hover:bg-gray-100 duration-100 transition-all ease-linear flex items-center space-x-2',
                {
                  'bg-gray-100': location.pathname.endsWith(Path.password)
                }
              )}
            >
              <span>
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
                    d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
                  />
                </svg>
              </span>
              <span>Mật khẩu</span>
            </Link>
            <Link
              to={`/${Path.user}/${Path.history}`}
              className={classNames(
                'px-4 lg:px-3 xl:px-4 py-2 flex-shrink-0 rounded-lg hover:bg-gray-100 duration-100 transition-all ease-linear flex items-center space-x-2',
                {
                  'bg-gray-100': location.pathname.endsWith(Path.history) || location.pathname.indexOf('history') >= 0
                }
              )}
            >
              <span>
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
                    d='M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184'
                  />
                </svg>
              </span>
              <span>Lịch sử đơn hàng</span>
            </Link>
            <Link
              to={`/${Path.user}/${Path.favorate}`}
              className={classNames(
                'px-4 lg:px-3 xl:px-4 py-2 flex-shrink-0 rounded-lg hover:bg-gray-100 duration-100 transition-all ease-linear flex items-center space-x-2',
                {
                  'bg-gray-100': location.pathname.endsWith(Path.favorate)
                }
              )}
            >
              <span>
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
                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                  />
                </svg>
              </span>
              <span>Sản phẩm yêu thích</span>
            </Link>
            <Link
              to={`/${Path.user}/${Path.my_cmt}`}
              className={classNames(
                'px-4 lg:px-3 xl:px-4 py-2 flex-shrink-0 rounded-lg hover:bg-gray-100 duration-100 transition-all ease-linear flex items-center space-x-2',
                {
                  'bg-gray-100': location.pathname.endsWith(Path.my_cmt)
                }
              )}
            >
              <span>
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
                    d='M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                  />
                </svg>
              </span>
              <span>Bình luận của tôi</span>
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default User
