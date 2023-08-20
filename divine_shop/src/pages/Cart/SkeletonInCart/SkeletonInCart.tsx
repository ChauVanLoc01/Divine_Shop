function SkeletonInCart() {
  return (
    <div className='flex xl:flex-row flex-col md:static relative md:gap-x-5 md:gap-y-0 animate-pulse xl:space-y-0 space-y-2'>
      <div className='xl:basis-1/3 rounded-md bg-gray-300 h-[150px] md:h-[250px] lg:h-[180px] xl:h-[100px]' />
      <div className='xl:basis-2/3 space-y-2 divide-y divide-gray-200'>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-300 rounded-md' />
          <div className='bg-gray-300 w-32 rounded-md h-4' />
          <div className='flex justify-between md:justify-between items-center'>
            <div className='bg-gray-300 w-24 h-4 rounded-md' />
            <div className='bg-red-500 w-8 h-4 rounded-md' />
            <span className='bg-gray-300 w-16 h-4 rounded-md' />
            <span className='bg-gray-300 w-16 h-4 rounded-md' />
          </div>
        </div>
        <div className='flex justify-between border-t border-t-gray-300 py-3'>
          <div className='flex space-x-3'>
            <span className='bg-gray-300 w-7 h-4 rounded-md' />
            <span className='ml-2 bg-gray-300 w-12 h-4 rounded-md' />
            <span className='bg-gray-300 w-16 h-4 rounded-md' />
          </div>
          <div className='bg-red-500 w-7 h-4 rounded-md' />
        </div>
      </div>
    </div>
  )
}

export default SkeletonInCart
