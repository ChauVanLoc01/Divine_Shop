import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import LinkToTop from 'src/Components/LinkToTop'
import { OrderDetail as OrderDetailType } from 'src/Types/order.type'
import { AppDispatch } from 'src/store'
import { useGetOrderQuery } from 'src/utils/apis/order.api'
import { buyAgain } from 'src/utils/slices/items.slice'
import { createSlug, format_currency, splitDate } from 'src/utils/utils'

function OrderDetail() {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const { data } = useGetOrderQuery(orderId as string)
  const dispatch = useDispatch<AppDispatch>()
  const handleOrderAgain = () => {
    dispatch(
      buyAgain(
        (data?.data as OrderDetailType).itemInOrder.map((e) => {
          return {
            ...e.item,
            buy_amount: e.quantity
          }
        })
      )
    )
    navigate('/cart')
  }
  return (
    <div className='rounded-lg bg-white border border-gray-100 p-2 md:p-5 divide-y divide-gray-300'>
      <div className='space-y-2 flex md:flex-row flex-col justify-between pb-4'>
        <div>
          <div className='lg:text-2xl text-xl font-semibold'>Chi tiết đơn hàng</div>
          <div className=''>Hiển thị thông tin các sản phẩm bạn đã mua</div>
        </div>
        <div>
          <button
            onClick={handleOrderAgain}
            className='rounded-md text-white px-4 lg:px-6 hover:opacity-95 py-2 lg:py-3 bg-[#2985FF]'
          >
            Mua lại đơn hàng
          </button>
        </div>
      </div>
      <div className='py-4 flex md:flex-row flex-col md:justify-between'>
        <div className='basis-3/5 space-y-1'>
          <div className='flex space-x-2'>
            <span className='flex-shrink-0'>Mã đơn hàng:</span>
            <span className='truncate'>{orderId}</span>
          </div>
          <div className='flex space-x-2'>
            <span>Ngày tạo:</span>
            <span>{data && splitDate(data.data.created)}</span>
          </div>
          <div className='flex space-x-2'>
            <span>Trạng thái đơn hàng:</span>
            <span
              className={classNames('text-green-600', {
                hidden: data && data.data.status !== 'success'
              })}
            >
              Thành công
            </span>
            <span
              className={classNames('text-red-600', {
                hidden: data && data.data.status !== 'cancel'
              })}
            >
              Đã hủy
            </span>
            <span
              className={classNames('text-red-600', {
                hidden: data && data.data.status !== 'waiting_confirm'
              })}
            >
              Chờ thanh toán
            </span>
          </div>
        </div>
        <div className='basis-2/5 flex md:flex-col flex-row md:items-end items-baseline md:space-x-0 space-x-2'>
          <div className='lg:text-xl text-lg font-semibold'>Tổng thanh toán</div>
          <div className='text-right lg:text-lg text-base font-semibold'>
            {data && format_currency(data.data.total)}đ
          </div>
        </div>
      </div>
      <div className='py-4 md:py-5 space-y-5'>
        {data &&
          data.data.itemInOrder.map((e) => (
            <div key={e.item_id} className='flex md:flex-row flex-col md:space-x-5'>
              <LinkToTop
                to={`/${createSlug(e.item.item_name, e.item.item_id)}`}
                className='md:basis-1/3 overflow-hidden'
              >
                <img className='object-cover rounded-md' src={e.item.image} alt='image' />
              </LinkToTop>
              <div className='md:basis-2/3 space-y-1 lg:space-y-3'>
                <LinkToTop
                  to={`/${createSlug(e.item.item_name, e.item.item_id)}`}
                  className='lg:text-xl text-lg line-clamp-2'
                >
                  {e.item.item_name}
                </LinkToTop>
                <div className='flex justify-between items-center'>
                  <span>Số lượng: {e.quantity}</span>
                  <span>{format_currency(e.item.price * e.quantity)}đ</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default OrderDetail
