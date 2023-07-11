function CreateCmt() {
  return (
    <div className='space-y-3'>
      <div className='font-semibold text-xl'>Bình luận</div>
      <div className='space-y-2'>
        <div>Thời gian phản hồi trung bình: 5 phút!</div>
        <textarea
          id='message'
          rows={7}
          className='block px-4 py-3 w-full text-gray-900 bg-gray-50 rounded-lg ring-2 ring-gray-300 focus:ring-[#2579F2] focus:ring-2 outline-none'
          placeholder='Viết bình luận vào đây...'
        />
        <div className='flex justify-end py-2'>
          <button className='rounded-md px-3 py-2 bg-[#2579F2] text-white space-x-2 flex items-center ring-2 ring-[#2579F2]/80 hover:ring-[#2579F2] hover:bg-[#2579F2]/90'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4 stroke-2'
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
