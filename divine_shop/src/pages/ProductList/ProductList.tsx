import Paging from 'src/Components/Paging'
import Sort from './Sort'

function ProductList() {
  return (
    <div className='space-y-4 bg-[#F3F4F6] lg:py-4'>
      <Sort />
      <Paging products={Array(12).fill(0)} />
    </div>
  )
}

export default ProductList
