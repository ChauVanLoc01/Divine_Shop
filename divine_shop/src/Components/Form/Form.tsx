function Form() {
  return (
    <div className='w-[95%] h-[450px] p-10 flex justify-center flex-row mx-auto border-2'>
      <form className='w-4/5 space-y-6'>
        <div>
          <a href=''>Đăng nhập</a>
          <a href=''>Đăng kí</a>
        </div>
        <div>Đăng nhập để theo dõi đơn hàng, lưu danh sách sản phẩm yêu thích và nhận nhiều ưu đãi hấp dẫn</div>
        <div className='relative'>
          <label className='absolute top-0 left-2 px-1 bg-white -translate-y-1/2' htmlFor='email'>
            Email
          </label>
          <input
            className='w-full outline-none border-[1px] rounded-md py-2 px-3'
            type='text'
            name='email'
            id='email'
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input className='outline-none' type='text' name='password' id='password' />
        </div>
        <div>
          <a href=''>Bạn quên mật khẩu?</a>
        </div>
        <div>
          <button className='w-full p-2'>Đăng nhập</button>
        </div>
      </form>
      <div className='w-4/5'>
        <img
          className='w-full'
          src='https://cdn.divineshop.vn/static/368e705d45bfc8742aa9d20dbcf4c78c.svg'
          alt='login-picture'
        />
      </div>
    </div>
  )
}

export default Form
