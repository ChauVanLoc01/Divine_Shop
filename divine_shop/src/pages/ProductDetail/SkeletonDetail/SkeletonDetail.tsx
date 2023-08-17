function SkeletonDetail() {
  return (
    <div className='flex md:flex-row flex-col md:gap-x-6 gap-y-3 bg-white animate-pulse'>
      <div className='md:basis-2/5 xl:h-[230px] lg:h-[176px] md:h-[130px] h-[170px] bg-gray-300 rounded-md' />
      <div className='md:basis-3/5 md:space-y-6 space-y-5'>
        <div className='space-y-2'>
          <div className='w-16 h-5 rounded-md bg-gray-300' />
          <div className='w-full h-5 rounded-md bg-gray-300' />
          <div className='w-72 h-5 rounded-md bg-gray-300' />
          <div className='flex space-x-2'>
            <span className='w-24 h-5 rounded-md bg-gray-300' />
            <span className='w-24 h-5 rounded-md bg-gray-300' />
          </div>
          <div className='flex space-x-2'>
            <span className='w-20 h-5 rounded-md bg-gray-300' />
            <span className='w-20 h-5 rounded-md bg-gray-300' />
          </div>
          <div className='flex space-x-3'>
            <span className='w-20 h-5 rounded-md bg-gray-300' />
            <span className='w-20 h-5 rounded-md bg-gray-300' />
            <span className='w-10 h-5 rounded-md bg-gray-300' />
            <span className='w-14 h-5 rounded-md bg-red-400' />
          </div>
        </div>
        <div className='space-x-4 flex'>
          <button className='w-28 lg:w-36 h-10 rounded-md bg-blue-300' />
          <button className='w-44 lg:w-56 h-10 rounded-md border border-gray-300' />
        </div>
      </div>
    </div>
  )
}

export default SkeletonDetail
