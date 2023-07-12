import { NavLink } from 'react-router-dom'
import ListBox from 'src/pages/ProductList/Sort/ListBox'

function OrderHistory() {
  return (
    <div className='rounded-lg bg-white border border-gray-100 p-2 md:p-5 space-y-2 md:space-y-5'>
      <div className='flex flex-wrap gap-x-5 gap-y-3'>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-1/4 basis-full rounded-md ring-1 ring-gray-300 overflow-hidden'>
          <div className='relative mx-auto w-[88%] md:w-9/12 lg:w-10/12'>
            <label className='absolute top-0 left-0 text-sm text-gray-400' htmlFor='id'>
              Mã đơn hàng
            </label>
            <input className='w-full outline-none pt-4' placeholder='ví dụ: 1111' type='text' name='' id='id' />
          </div>
        </div>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-1/4 basis-[44%] rounded-md ring-1 ring-gray-300 overflow-hidden'>
          <div className='relative mx-auto w-9/12 lg:w-10/12'>
            <label className='absolute top-0 left-0 text-sm text-gray-400' htmlFor='start'>
              Ngày bắt đầu
            </label>
            <input className='w-full outline-none pt-4' type='date' name='' id='start' />
          </div>
        </div>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-1/4 basis-[44%] rounded-md  ring-1 ring-gray-300 overflow-hidden'>
          <div className='relative mx-auto w-9/12 lg:w-10/12'>
            <label className='absolute top-0 left-0 text-sm text-gray-400' htmlFor='start'>
              Ngày kết thúc
            </label>
            <input className='w-full outline-none pt-4' type='date' name='' id='end' />
          </div>
        </div>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-1/4 basis-[44%]'>
          <ListBox title='Trạng thái' />
        </div>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-1/4 basis-[44%]'>
          <ListBox title='Khoảng giá' />
        </div>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-1/4 basis-[44%]'>
          <ListBox title='Sắp xếp theo' />
        </div>
        <button className='flex space-x-2 items-center px-3 py-1 bg-[#2579F2] text-white rounded-md'>
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
        <button className='flex space-x-2 items-center py-1 text-red-500 rounded-md font-medium'>
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
      </div>
      <div className='rounded-lg overflow-hidden ring-1 ring-gray-300 md:block hidden'>
        <table className='w-full text-sm text-left text-gray-800'>
          <thead className='text-xs text-gray-800 uppercase bg-gray-300'>
            <tr>
              <th className='px-6 py-3'>Thời gian</th>
              <th className='px-6 py-3 lg:block hidden'>Mã đơn hàng</th>
              <th className='px-6 py-3'>Sản phẩm</th>
              <th className='px-6 py-3'>Tổng tiền</th>
              <th className='px-6 py-3'>Trạng thái</th>
              <th className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-white hover:bg-gray-100/80'>
              <td scope='row' className='px-6 py-4'>
                07-07-2023
              </td>
              <td className='px-6 py-4 lg:block hidden'>Silver</td>
              <td className='px-6 py-4'>Apple MacBook Pro 17"</td>
              <td className='px-6 py-4'>22.000.000đ</td>
              <td className='px-6 py-4 text-green-600'>Thành công</td>
              <td className='px-6 py-4'>
                <NavLink to={'/'} className='text-[#2579F2] hover:underline'>
                  Chi tiết
                </NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='flex gap-x-5 border-b py-3 border-gray-200 md:hidden'>
        <div className='w-3/5 space-y-2'>
          <div className='flex space-x-2'>
            <span>#619645</span>
            <NavLink className='text-[#2579F9]' to={''}>
              Chi tiết
            </NavLink>
          </div>
          <div className='text-gray-500'>2023-04-26 13:06:04</div>
          <div className='w-2/3'>
            <img
              className='w-full rounded-md'
              src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/Grammarly%20Premium%207%20ngay.png?hash=1623645470'
              alt=''
            />
          </div>
        </div>
        <div className='w-2/5 text-right space-y-2'>
          <span className='text-green-600'>Thành công</span>
          <div className='space-x-1'>
            <span className=''>Tổng tiền: </span>
            <span className='font-medium'>15.000đ</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
