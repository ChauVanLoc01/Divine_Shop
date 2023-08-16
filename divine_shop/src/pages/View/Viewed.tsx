import { useSelector } from 'react-redux'
import Paging from 'src/Components/Paging'
import { RootState } from 'src/store'

function Viewed() {
  const items = useSelector((state: RootState) => state.ItemsSliceName)
  return (
    <div className='py-2 md:py-4 space-y-6'>
      <div className='lg:text-3xl font-medium text-gray-800 text-2xl xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-4'>
        Sản phẩm bạn đã xem
      </div>
      {<Paging products={items} />}
    </div>
  )
}

export default Viewed
