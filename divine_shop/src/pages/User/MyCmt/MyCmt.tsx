import { NavLink } from 'react-router-dom'

function MyCmt() {
  return (
    <div className='py-3 space-y-3 md:space-y-5 rounded-md bg-white md:px-5 px-2'>
      <div className='pb-3 md:pb-4 border-b border-gray-300'>
        <div className='font-medium md:text-xl text-base'>Bình luận của tôi</div>
        <span className='text-gray-500'>Bình luận và trả lời mà bạn đã viết trên Store</span>
      </div>
      <div className='md:space-y-5 space-y-2'>
        <form className='flex flex-wrap gap-3 md:gap-y-3 md:gap-x-5'>
          <div className='basis-full md:basis-1/4 lg:basis-1/5 rounded-md ring-1 ring-gray-300 overflow-hidden'>
            <div className='relative w-11/12 md:w-10/12 mx-auto'>
              <label className='absolute top-0 left-0 text-sm text-gray-400' htmlFor='start'>
                Nội dung cmt
              </label>
              <input className='w-full outline-none pt-4' type='text' name='' id='start' placeholder='ví dụ 111111' />
            </div>
          </div>
          <div className='basis-[48.2%] md:basis-1/4 lg:basis-1/5 rounded-md ring-1 ring-gray-300 overflow-hidden'>
            <div className='relative w-10/12 md:w-10/12 mx-auto'>
              <label className='absolute top-0 left-0 text-sm text-gray-400' htmlFor='start'>
                Ngày bắt đầu
              </label>
              <input className='w-full outline-none pt-4' type='date' name='' id='start' />
            </div>
          </div>
          <div className='basis-[48.2%] md:basis-1/4 lg:basis-1/5 rounded-md ring-1 ring-gray-300 overflow-hidden'>
            <div className='relative w-10/12 md:w-10/12 mx-auto'>
              <label className='absolute top-0 left-0 text-sm text-gray-400' htmlFor='start'>
                Ngày kết thúc
              </label>
              <input className='w-full outline-none pt-4' type='date' name='' id='end' />
            </div>
          </div>
          <button type='submit' className='flex space-x-2 items-center px-3 py-1 bg-[#2579F2] text-white rounded-md'>
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
          <button type='button' className='flex space-x-2 items-center py-1 text-red-500 rounded-md font-medium'>
            <span>
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
                  d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3'
                />
              </svg>
            </span>
            <span>Xóa bộ lọc</span>
          </button>
        </form>
        <div className='rounded-lg overflow-hidden ring-1 ring-gray-300 md:block hidden'>
          <table className='w-full text-sm text-left text-gray-800'>
            <thead className='text-xs text-gray-800 uppercase bg-gray-300'>
              <tr>
                <th className='px-6 py-3'>Thời gian</th>
                <th className='px-6 py-3'>Mã đơn hàng</th>
                <th className='px-6 py-3'></th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-white hover:bg-gray-100/80'>
                <td scope='row' className='px-6 py-4'>
                  07-07-2023
                </td>
                <td className='px-6 py-4'>Apple MacBook Pro 17"</td>
                <td className='px-6 py-4'>
                  <NavLink to={'/'} className='text-[#2579F2] hover:underline'>
                    Chi tiết
                  </NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='space-y-2 border-b border-gray-300 py-3 md:hidden block'>
          <div className='line-clamp-3'>
            @CSKH - Hoài Nam có được truy cập vào tài nguyên hay bt không shop? Và được truy cập bao nhiêu tài khoản ạ
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-400'>2023-03-05 10:06:33</span>
            <NavLink to={''} className='text-[#2579F2]'>
              Chi tiết
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCmt
