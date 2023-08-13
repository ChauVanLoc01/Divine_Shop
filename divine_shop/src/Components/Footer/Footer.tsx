function Footer() {
  return (
    <div className='text-center py-10 bg-[#F3F4F6] px-4'>
      <div className='space-y-4'>
        <div className='font-semibold text-xl'>Giới thiệu</div>
        <div>
          Project được xây dựng với <span className='underline font-semibold'>mục đích học tập</span> - Mọi người muốn
          mua sản phẩm thì truy cập vào trang web chính chủ của{' '}
          <a className='text-red-600 font-semibold' href='https://divineshop.vn/'>
            Divine Shop
          </a>{' '}
        </div>
      </div>
    </div>
  )
}

export default Footer
