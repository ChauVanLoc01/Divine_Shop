function CreateCmt() {
  return (
    <div className='xl:max-w-7xl xl:mx-auto xl:px-0 px-2 md:px-5 md:text-base text-sm space-y-3'>
      <div className='font-semibold text-xl'>Bình luận</div>
      <div className='space-y-2'>
        <div>Thời gian phản hồi trung bình: 5 phút!</div>
        <textarea
          className='bg-white w-full ring-1 rounded-md ring-gray-300 active:ring-1 active:ring-[#2579F2]'
          id=''
          rows={7}
        />
        <div className=''>
          <button className='rounded-md px-3 py-2 bg-[#2579F2] text-white space-x-2 flex items-center'>
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
                  d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
                />
              </svg>
            </span>
            <span>Gửi bình luận</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateCmt
