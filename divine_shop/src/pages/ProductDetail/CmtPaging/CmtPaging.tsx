import Cmt from '../Cmt'

// type CmtPagingProps = {
//   cmts: []
// }

function CmtPaging() {
  return (
    <div className='space-y-5'>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <Cmt key={i} />
        ))}
      <div className='text-[#2579F2] font-semibold py-5 border-t border-gray-200'>
        <button className='flex space-x-2 items-center'>
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4 stroke-2'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            </svg>
          </span>
          <span>Xem thêm bình luận khác</span>
        </button>
      </div>
    </div>
  )
}

export default CmtPaging
