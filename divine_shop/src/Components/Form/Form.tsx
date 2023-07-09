function Form() {
  return (
    <div className='h-screen flex items-center lg:text-base text-sm'>
      {/* <div className='w-screen h-screen bg-neutral-200 absolute z-0'></div> */}
      <div className='w-[95%] bg-white p-8 flex mx-auto border-2 space-x-5 rounded-lg z-10'>
        <div className='space-y-6'>
          <form className='space-y-4'>
            <div className='text-2xl font-semibold space-x-4'>
              <a className='hover:underline hover:decoration-2' href=''>
                Đăng nhập
              </a>
              <a className='text-gray-500 hover:underline hover:decoration-2' href=''>
                Đăng kí
              </a>
            </div>
            <div>Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích và nhận nhiều ưu đãi hấp dẫn</div>
            <div className='relative'>
              <label className='text-gray-400 absolute top-0 left-3' htmlFor='email'>
                Email hoặc tên đăng nhập
              </label>
              <input
                className='w-full hover:ring-2 focus:ring-2 ring-[#2579F2] bg-[#E8F0FE] border-[1px] rounded-md px-3 pt-5 pb-1 outline-none'
                type='text'
                name='email'
                id='email'
              />
            </div>
            <div className='relative'>
              <label className='text-gray-400 absolute top-0 left-3' htmlFor='email'>
                Mật khẩu
              </label>
              <input
                className='w-full hover:ring-2 focus:ring-2 ring-[#2579F2] bg-[#E8F0FE] border-[1px] rounded-md px-3 pt-5 pb-1 outline-none'
                type='text'
                name='email'
                id='email'
              />
            </div>
            <div className='text-[#2579F2]'>
              <a href=''>Bạn quên mật khẩu?</a>
            </div>
            <div>
              <button
                type='submit'
                className='w-full font-semibold hover:bg-[#2579F2] p-3 bg-[#2579F2] rounded-md text-white hover:bg-[#2579F2]/90 hover:scale-[1.01]'
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <div className='border-t-[1px] relative px-6 pt-6'>
            <span className='absolute -top-[1px] px-3 bg-white left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600'>
              Hoặc đăng nhập bằng
            </span>
            <div className='flex justify-center items-center space-x-4'>
              <button>
                <img src='https://cdn.divineshop.vn/static/0b314f30be0025da88c475e87a222e5a.svg' alt='google-picture' />
              </button>
              <button>
                <img
                  src='https://cdn.divineshop.vn/static/4ba68c7a47305b454732e1a9e9beb8a1.svg'
                  alt='facebook-picture'
                />
              </button>
            </div>
          </div>
        </div>
        <div className='md:w-4/5 hidden md:flex items-center relative'>
          <button className='absolute top-0 right-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 stroke-[3px] text-gray-500'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
          <img
            className='w-full'
            src='https://cdn.divineshop.vn/static/368e705d45bfc8742aa9d20dbcf4c78c.svg'
            alt='login-picture'
          />
        </div>
      </div>
    </div>
  )
}

export default Form
