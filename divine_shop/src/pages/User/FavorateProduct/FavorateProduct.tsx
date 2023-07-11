import Favorate from './Favorate'

function FavorateProduct() {
  return (
    <div className='space-y-2 rounded-lg bg-white p-2 md:p-5'>
      <div className='space-y-2 pb-3 border-b border-gray-300'>
        <div className='text-2xl font-medium'>Sản phẩm yêu thích</div>
        <div className='text-gray-500'>Danh sách các sản phẩm mà bạn đã đánh dấu "yêu thích"</div>
      </div>
      <Favorate />
      <Favorate />
      <Favorate />
    </div>
  )
}

export default FavorateProduct
