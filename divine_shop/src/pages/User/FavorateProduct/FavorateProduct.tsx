import { useDeleteFavorateMutation, useGetAllFavorateQuery } from 'src/utils/apis/favorate.api'
import Favorate from './Favorate'
import { toast } from 'react-toastify'
import { isCommonError } from 'src/utils/check-error'
import { FailResponse } from 'src/Types/responses.type'

function FavorateProduct() {
  const { data, refetch, isLoading, isError } = useGetAllFavorateQuery({
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
      {isLoading && (
        <div className='w-fit mx-auto flex items-center space-x-2 py-10' role='status'>
          <svg
            aria-hidden='true'
            className='w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className=''>Loading...</span>
        </div>
      )}
      {!isLoading && isError && (
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
