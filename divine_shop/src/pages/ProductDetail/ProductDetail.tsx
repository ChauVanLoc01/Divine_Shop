import { useGetItemQuery } from 'src/utils/apis/items.api'
import CmtPaging from './CmtPaging'
import CreateCmt from './CreateCmt'
import Information from './Information/Information'
import { useNavigate, useParams } from 'react-router-dom'
import { calculate_discount, format_currency } from 'src/utils/utils'
import SkeletonDetail from './SkeletonDetail'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { addItemsIntoCart } from 'src/utils/slices/items.slice'
import { Item } from 'src/Types/items.type'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import {
  useCreateFavorateMutation,
  useDeleteFavorateMutation,
  useGetFavorateDetailQuery
} from 'src/utils/apis/favorate.api'
import { Popconfirm } from 'antd'
import { isCommonError } from 'src/utils/check-error'
import { FailResponse } from 'src/Types/responses.type'
import { setIsOpen } from 'src/utils/slices/user.slice'

function ProductDetail() {
  const user = useSelector((state: RootState) => state.UserSliceName.user)
  const { productId } = useParams()
  const navigate = useNavigate()
  const { data, isFetching, isError } = useGetItemQuery(productId?.split(',')[1] as string)
  const [create_favorate] = useCreateFavorateMutation()
  const [delete_favorate] = useDeleteFavorateMutation()
  const dispatch = useDispatch<AppDispatch>()
  const { isSuccess, refetch } = useGetFavorateDetailQuery(productId?.split(',')[1] as string, {
    skip: !user
  })
  const handleAddItemIntoCart = () => {
    dispatch(
      addItemsIntoCart({
        ...(data?.data as Item),
        buy_amount: 1
      })
    )
    data?.data.quantity === 0 &&
      toast.warn('Thêm thành công nhưng sản phẩm đã hết hàng!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
  }
  const handleOrderNow = () => {
    if (data?.data.quantity === 0) {
      toast.warn('Sản phẩm đã hết hàng', {
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
      dispatch(
        addItemsIntoCart({
          ...(data?.data as Item),
          buy_amount: 1
        })
      )
      navigate('/cart')
    }
  }
  const handleReceiveEmail = async () => {
    try {
      await create_favorate({
        item_id: productId?.split(',')[1] as string,
        receive_email: true
      }).unwrap()
      refetch()
      toast.success('Đã thêm vào yêu thích', {
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
  const handleNoEmail = async () => {
    try {
      await create_favorate({
        item_id: productId?.split(',')[1] as string,
        receive_email: false
      }).unwrap()
      refetch()
      toast.success('Đã thêm vào yêu thích', {
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
  const handleDeleteFavorate = async () => {
    try {
      await delete_favorate(productId?.split(',')[1] as string)
      refetch()
      toast.success('Đã bỏ yêu thích', {
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
    <div className='xl:max-w-5xl xl:mx-auto xl:px-0 px-2 md:px-5 md:text-base text-sm md:py-5 py-2 border-t-[1px] border-gray-200 space-y-3 md:space-y-5'>
      {data && (
        <div className='flex md:flex-row flex-col md:gap-x-6 gap-y-3 bg-white'>
          <div className='md:basis-2/5'>
            <img className='bg-cover w-full rounded-md' src={data.data.image} alt='Product Image' />
          </div>
          <div className='md:basis-3/5 md:space-y-6 space-y-5'>
            <div className='space-y-2'>
              <div>Sản phẩm</div>
              <div className='text-2xl md:text-3xl font-semibold'>{data.data.item_name}</div>
              <div className='flex space-x-2'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z'
                    />
                  </svg>
                </span>
                <span>
                  Tình trạng:{' '}
                  <span
                    className={classNames('text-green-600', {
                      'text-red-500': data.data.quantity === 0
                    })}
                  >
                    {data.data.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </span>
              </div>
              <div className='flex space-x-2'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z'
                    />
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 6h.008v.008H6V6z' />
                  </svg>
                </span>
                <span>
                  Thể loại: <span>{data.data.category}</span>
                </span>
              </div>
              <div className='flex space-x-3'>
                <span className='lg:text-2xl text-lg'>{format_currency(data.data.price)}đ</span>
                <span className='line-through text-gray-400 lg:text-2xl text-lg'>
                  {format_currency(data.data.priceBeforeDiscount)}đ
                </span>
                {user ? (
                  isSuccess ? (
                    <Popconfirm
                      title='Hủy bỏ yêu thích?'
                      description='Bạn sẽ không nhận được email khuyến mãi'
                      okText='Xóa'
                      cancelText='Hủy'
                      onConfirm={handleDeleteFavorate}
                      zIndex={1000}
                    >
                      <button className='border-none w-fit'>
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className={classNames('w-6 h-6 hover:fill-red-600', {
                              'fill-red-600 stroke-none': isSuccess
                            })}
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                            />
                          </svg>
                        </span>
                      </button>
                    </Popconfirm>
                  ) : (
                    <Popconfirm
                      title='Nhận thông báo khuyến mãi?'
                      description='Chúng tôi sẽ gửi email cho bạn khi sản phẩm khuyến mãi'
                      okText='Có'
                      cancelText='Không'
                      onConfirm={handleReceiveEmail}
                      onCancel={handleNoEmail}
                      zIndex={1000}
                    >
                      <button className='border-none w-fit'>
                        <span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className={classNames('w-6 h-6 hover:fill-red-600 hover:stroke-none', {
                              'fill-red-600 stroke-none': isSuccess
                            })}
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                            />
                          </svg>
                        </span>
                      </button>
                    </Popconfirm>
                  )
                ) : (
                  <button
                    onClick={() => {
                      dispatch(
                        setIsOpen({
                          open: true,
                          type: 'login'
                        })
                      )
                      toast.warn('Bạn cần phải đăng nhập mới có thể thêm vào sản phẩm yêu thích', {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored'
                      })
                    }}
                    className='border-none w-fit'
                  >
                    <span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
                        />
                      </svg>
                    </span>
                  </button>
                )}
                <div>
                  <span className='py-1 px-2 text-white bg-red-500 rounded-md'>
                    -{calculate_discount(data.data.price, data.data.priceBeforeDiscount)}%
                  </span>
                </div>
              </div>
            </div>
            <div className='space-x-4 flex'>
              <button
                onClick={handleOrderNow}
                className='text-white space-x-1 lg:space-x-2 hover:bg-[#2579F2]/90 transition-all duration-100 ease-linear bg-[#2579F2] px-2 md:px-3 py-2 lg:px-5 lg:py-2 rounded-md flex ring-2 ring-[#2579F2]/90 hover:ring-[#2579F2] items-center'
              >
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='lg:w-6 w-5 lg:h-6 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z'
                    />
                  </svg>
                </span>
                <span>Mua ngay</span>
              </button>
              <button
                className='text-[#2579F2] space-x-2 rounded-md px-2 md:px-3 py-2 lg:px-5 lg:py-2 flex ring-2 ring-gray-300 border-gray-300 hover:ring-2 hover:ring-[#2579F2] items-center'
                onClick={handleAddItemIntoCart}
              >
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='lg:w-6 w-5 lg:h-6 h-5'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                    />
                  </svg>
                </span>
                <span>Thêm vào giỏ hàng</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {isFetching && <SkeletonDetail />}
      {isError && (
        <div className='space-y-4 text-center py-8'>
          <div className='mx-auto w-fit'>
            <img src='https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg' alt='image' />
          </div>
          <div>Không tìm thấy sản phẩm phù hợp</div>
        </div>
      )}
      {data && (
        <>
          <Information />
          <CreateCmt />
          <CmtPaging />
        </>
      )}
    </div>
  )
}

export default ProductDetail
