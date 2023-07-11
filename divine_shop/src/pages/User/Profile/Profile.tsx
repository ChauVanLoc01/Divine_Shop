function Profile() {
  return (
    <div className='rounded-lg bg-white border border-gray-100 p-1'>
      <form className='flex md:space-y-0 space-y-5 md:flex-row flex-col lg:px-10 md:px-5 lg:py-5 md:py-3 p-3'>
        <div className='basis-1/2 grid grid-cols-2 content-around gap-y-3'>
          <div className='text-center col-span-2 col-start-1 font-semibold text-2xl pb-3'>Thông tin cá nhân</div>
          <label className='self-center' htmlFor='username'>
            Tên đăng nhập
          </label>
          <input
            className='hover:ring-1 ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md lg:px-4 md:px-3 px-2 py-1 lg:py-2'
            type='text'
            name=''
            id='username'
          />
          <label className='self-center' htmlFor='email'>
            Email
          </label>
          <input
            className='hover:ring-1 ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md lg:px-4 md:px-3 px-2 py-1 lg:py-2'
            type='text'
            name=''
            id='email'
          />
          <label className='self-center' htmlFor='address'>
            Địa chỉ
          </label>
          <textarea
            className='hover:ring-1 ring-[#2579F2] focus:ring-1 outline-none border border-gray-300 rounded-md lg:px-4 md:px-3 px-2 py-1 lg:py-2'
            name=''
            id='address'
            rows={3}
          />
          <div className='col-start-2 text-right py-2'>
            <button className='ring-2 ring-gray-400 hover:ring-[#2579F2] rounded-md px-6 py-2 text-[#2579F2] font-semibold'>
              Lưu thay đổi
            </button>
          </div>
        </div>
        <div className='basis-1/2 space-y-4 flex flex-col items-center'>
          <img
            className='bg-cover rounded-full w-1/3'
            src='https://cdn.divineshop.vn/image/catalog/icon/avatar-khach-hang-2-52544.png?hash=1649933269'
            alt='avatar'
          />
          <div>
            <button className='px-5 py-1.5 rounded-md bg-[#2579F2] text-white hover:bg-[#2579F2]/90 ring-2 ring-[#2579F2]/90 hover:ring-[#2579F2]'>
              Thay đổi ảnh đại điện
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
