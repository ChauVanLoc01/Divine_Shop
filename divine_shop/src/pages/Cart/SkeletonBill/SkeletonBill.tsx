function SkeletonBill() {
  return (
    <div className='lg:basis-1/2 xl:basis-2/5 bottom-0 bg-white lg:bg-none lg:py-0 py-5 lg:border-none border-t border-gray-200 ring-gray-300'>
      <div className='lg:border-l sticky lg:top-10 lg:border-l-gray-300 px-2 md:px-5 space-y-2 lg:space-y-3'>
        <div className='w-48 h-6 bg-gray-300 rounded-md' />
        <div className='flex justify-between'>
          <span className='w-32 h-4 bg-gray-300 rounded-md' />
          <span className='w-16 h-4 bg-gray-300 rounded-md' />
        </div>
        <div className='flex justify-between'>
          <span className='w-24 h-4 bg-gray-300 rounded-md' />
          <span className='w-24 h-4 bg-gray-300 rounded-md' />
        </div>
        <div className='flex justify-between'>
          <span className='w-28 h-4 bg-gray-300 rounded-md' />
          <span className='w-28 h-4 bg-red-300 rounded-md' />
        </div>
        <div className='flex justify-end'>
          <button className='px-5 w-full py-1 h-8 bg-[#2579F2]/40 rounded-md' />
        </div>
      </div>
    </div>
  )
}

export default SkeletonBill
