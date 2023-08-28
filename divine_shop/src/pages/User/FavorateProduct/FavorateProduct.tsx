import { useDeleteFavorateMutation, useGetAllFavorateQuery } from 'src/utils/apis/favorate.api'
import Favorate from './Favorate'
import { toast } from 'react-toastify'
import { isCommonError } from 'src/utils/check-error'
import { FailResponse } from 'src/Types/responses.type'

function FavorateProduct() {
  const { data, refetch } = useGetAllFavorateQuery({
    order_by_created: 'desc'
  })
  const [delete_favorate] = useDeleteFavorateMutation()
  const handleDeleteFavorate = (item_id: string) => async () => {
    try {
      await delete_favorate(item_id)
      refetch()
      toast.success('Đã bỏ yêu thích!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    } catch (error) {
      if (isCommonError(error)) {
        const message = (error.data as FailResponse).message
        toast.error(message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      } else {
        toast.error('Lỗi', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      }
    }
  }
  return (
    <div className='space-y-2 rounded-lg bg-white p-2 md:p-5'>
      <div className='space-y-2 pb-3 border-b border-gray-300'>
        <div className='text-2xl font-medium'>Sản phẩm yêu thích</div>
        <div className='text-gray-500'>Danh sách các sản phẩm mà bạn đã đánh dấu "yêu thích"</div>
      </div>
      {data &&
        data.data.favorates.length > 0 &&
        data.data.favorates.map((e) => (
          <Favorate key={e.item_id} item={e.item} deleteFavorate={handleDeleteFavorate} />
        ))}
      {data && data.data.favorates.length === 0 && (
        <div className='space-y-4 text-center py-8'>
          <div className='mx-auto w-fit'>
            <img src='https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg' alt='image' />
          </div>
          <div>Bạn chưa có sản phẩm yêu thích</div>
        </div>
      )}
    </div>
  )
}

export default FavorateProduct
