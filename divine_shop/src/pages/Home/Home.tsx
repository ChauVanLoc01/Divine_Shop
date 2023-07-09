import Category from './Category'

function Home() {
  return (
    <div className='bg-[#F3F4F6] lg:py-4'>
      <div className='xl:max-w-7xl xl:mx-auto xl:px-0 px-2 md:px-4 md:text-base text-sm md:space-y-4 space-y-2'>
        <div className='flex lg:flex-row flex-col justify-between lg:space-y-0 md:space-y-4 space-y-2'>
          <div className='lg:w-[19%] lg:block hidden h-full rounded-md overflow-hidden'>
            <Category />
          </div>
          <div className='lg:w-[54%] rounded-md overflow-hidden flex-shrink-0'>
            <img
              src='https://cdn.divineshop.vn/image/catalog/Anh/24.12.21/data%20si%C3%AAu%20t%E1%BB%91c-76618.png?hash=1640349471'
              alt='picture'
            />
          </div>
          <div className='lg:w-[24%] flex flex-row lg:flex-col place-content-between flex-shrink-0'>
            <img
              className='rounded-md lg:w-full w-[49%]'
              src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/VPN-26080.png?hash=1681964388'
              alt='bannerpicture'
            />
            <img
              className='rounded-md lg:w-full w-[49%]'
              src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/Spotify-94894.png?hash=1681964396'
              alt='bannerpicture2'
            />
          </div>
        </div>
        <div className='grid md:grid-rows-1 md:grid-cols-4 grid-rows-2 grid-cols-2 gap-2 md:gap-3'>
          <div className='rounded-md overflow-hidden flex-shrink-0'>
            <img
              src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/Steam-46397.png?hash=1681964405'
              alt='picture'
            />
          </div>
          <div className='rounded-md overflow-hidden flex-shrink-0'>
            <img src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/GPT-14698.png?hash=1681964414' alt='picture' />
          </div>
          <div className='rounded-md overflow-hidden flex-shrink-0'>
            <img
              src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/gmail-72495.png?hash=1681964422'
              alt='picture'
            />
          </div>
          <div className='rounded-md overflow-hidden flex-shrink-0'>
            <img
              src='https://cdn.divineshop.vn/image/catalog/Anh/Banner/Microsoft%20Office-53247.png?hash=1681964430'
              alt='picture'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
