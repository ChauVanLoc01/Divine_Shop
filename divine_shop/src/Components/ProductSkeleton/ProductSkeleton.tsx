function ProductSkeleton() {
  return (
    <div className='relative flex flex-col justify-between rounded-md animate-pulse xl:h-[220px] md:h-[180px] h-[140px] space-y-2'>
      <div className='bg-gray-300 h-2/3 rounded-md overflow-hidden' />
      <span className='bg-gray-300  border border-gray-200 w-9 h-5 xl:w-12 xl:h-7 absolute -top-3 right-0 rotate-12 rounded-md xl:hidden' />
      <div className='h-1/3 space-y-1'>
        <div className='pt-2 pb-1 md:pb-0 md:pt-1 rounded-md h-4 bg-gray-300' />
        <div className='flex md:space-x-2 space-x-1'>
          <span className='h-4 w-10 bg-gray-300 rounded-md' />
          <span className='h-4 w-10 bg-gray-300 rounded-md' />
          <span className='h-4 w-10 bg-gray-300 rounded-md xl:block hidden'></span>
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton
