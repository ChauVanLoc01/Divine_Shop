function Cmt() {
  return (
    <div className='flex md:gap-x-5 gap-x-3'>
      <div className='md:w-1/12 w-2/12'>
        <img
          className='rounded-full'
          src='https://cdn.divineshop.vn/image/catalog/icon/avatar-khach-hang-2-52544.png?hash=1649933269'
          alt='avatarpicture'
        />
      </div>
      <div className='md:w-11/12 w-10/12 space-y-1'>
        <div className='space-x-3 flex'>
          <span className='font-semibold'>Dũng Trần</span>
          <div className='flex items-center space-x-1 text-green-500'>
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
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
            </span>
            <span>Đã mua sản phẩm</span>
          </div>
        </div>
        <div className='text-gray-400'>Bình luận vào 2023-06-25 11:41:47</div>
        <div>Mình muốn kiểm tra khóa học thì check ở đâu vậy</div>
        <div>
          <button className='text-[#2579F2]'>Trả lời</button>
        </div>
      </div>
    </div>
  )
}

export default Cmt
