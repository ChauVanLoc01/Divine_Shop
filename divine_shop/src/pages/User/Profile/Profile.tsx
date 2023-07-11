function Profile() {
  return (
    <div className='rounded-md bg-white border border-gray-100 p-1'>
      <form className='flex md:space-y-0 space-y-5 md:flex-row flex-col lg:px-10 md:px-5 lg:py-5 md:py-3 p-3'>
        <div className='basis-1/2 grid grid-cols-2 content-around xl:gap-y-0 gap-y-3'>
          <div className='text-center col-span-2 col-start-1 font-semibold text-2xl pb-3'>Thông tin cá nhân</div>
          <label className='' htmlFor='username'>
            Tên đăng nhập
          </label>
          <input
            className='outline-none border border-gray-300 rounded-md lg:px-4 md:px-3 px-2 py-1 lg:py-3'
            type='text'
            name=''
            id='username'
          />
          <label className='' htmlFor='email'>
            Email
          </label>
          <input
            className='outline-none border border-gray-300 rounded-md lg:px-4 md:px-3 px-2 py-1 lg:py-3'
            type='text'
            name=''
            id='email'
          />
          <label className='' htmlFor='address'>
            Địa chỉ
          </label>
          <textarea
            className='outline-none border border-gray-300 rounded-md lg:px-4 md:px-3 px-2 py-1 lg:py-3'
            name=''
            id='address'
            rows={3}
          />
        </div>
        <div className='basis-1/2 space-y-4 flex flex-col items-center'>
          <img
            className='bg-cover rounded-full w-1/3'
            src='https://cdn.divineshop.vn/image/catalog/icon/avatar-khach-hang-2-52544.png?hash=1649933269'
            alt='avatar'
          />
          <div>
            <button className='px-4 py-2 rounded-md bg-[#2579F2] text-white hover:bg-[#2579F2]/90 ring-2 ring-[#2579F2]/90 hover:ring-[#2579F2]'>
              Thay đổi ảnh đại điện
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
