function Password() {
  return (
    <div className='rounded-lg bg-white border border-gray-100 p-1 md:py-10 flex justify-center py-6'>
      <form className='md:w-1/2 w-5/6 grid grid-cols-2 gap-y-3'>
        <div className='text-center col-span-2 col-start-1 font-semibold text-2xl pb-3'>Thay đổi mật khẩu</div>
        <label className='self-center' htmlFor='currentpassword'>
          Mật khẩu hiện tại
        </label>
        <input
          className='hover:ring-1 ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md lg:px-4 md:px-3 px-2 py-1 lg:py-2'
          type='password'
          name=''
          id='currentpassword'
        />
        <label className='self-center' htmlFor='newpassword'>
          Mật khẩu mới
        </label>
        <input
          className='hover:ring-1 ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md lg:px-4 md:px-3 px-2 py-1 lg:py-2'
          type='password'
          name=''
          id='newpassword'
        />
        <label className='self-center' htmlFor='confirmpassword'>
          Nhập lại mật khẩu
        </label>
        <input
          className='hover:ring-1 ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md lg:px-4 md:px-3 px-2 py-1 lg:py-2'
          type='password'
          name=''
          id='confirmpassword'
        />
        <div className='col-start-2 text-right py-2'>
          <button className='ring-2 ring-gray-400 hover:ring-[#2579F2] rounded-md px-8 py-1 text-[#2579F2] font-semibold'>
            Thay đổi
          </button>
        </div>
      </form>
    </div>
  )
}

export default Password
