import { Pagination } from 'antd'
import { isUndefined, omitBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { OrderQuery } from 'src/Types/order.type'
import ListBox from 'src/pages/ProductList/Sort/ListBox'
import { useGetOrderListQuery } from 'src/utils/apis/order.api'
import { format_currency, joinPathQuery } from 'src/utils/utils'
import { toast } from 'react-toastify'
import classNames from 'classnames'

const checkDate = (date?: string) => {
  if (date && !isNaN(Date.parse(date))) {
    return date
  }
  return undefined
}

const checkOrder = (order: string | undefined) => {
  return order && (order === 'asc' || order === 'desc') ? order : undefined
}

const checkNumber = (input: any) => {
  if (!isNaN(input) && !isNaN(parseFloat(input))) {
    return Number(input)
  }
  return undefined
}

function OrderHistory() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const {
    end,
    item_name,
    order_by_created,
    order_by_discount,
    order_by_total_price,
    order_id,
    start,
    limit,
    page,
    total_price_max,
    total_price_min
  } = Object.fromEntries(searchParams) as OrderQuery
  const searchs = useMemo(() => {
    return omitBy(
      {
        order_id,
        item_name,
        order_by_created: checkOrder(order_by_created),
        order_by_total_price: checkOrder(order_by_total_price),
        order_by_discount: checkOrder(order_by_discount),
        end: checkDate(end),
        start: checkDate(start),
        page: checkNumber(page),
        limit: checkNumber(limit),
        total_price_max: checkNumber(total_price_max),
        total_price_min: checkNumber(total_price_min)
      } as OrderQuery,
      isUndefined
    )
  }, [searchParams])
  const [orderQuery, setOrderQuery] = useState<OrderQuery>(searchs)
  const { data, refetch, isLoading, isError } = useGetOrderListQuery(searchs)
  const handleJumpPage = (page: number) => {
    setOrderQuery({
      ...orderQuery,
      page
    })
    navigate({
      pathname: '/user/history',
      search: joinPathQuery({ ...orderQuery, page } as OrderQuery)
    })
  }
  const handleFilter = () => {
    navigate({
      pathname: '/user/history',
      search: joinPathQuery(orderQuery)
    })
  }

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'start') {
      if (orderQuery.end) {
        if (new Date(orderQuery.end).getTime() < new Date(e.target.value).getTime()) {
          toast.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
          orderQuery.start ? (e.target.value = orderQuery.start) : (e.target.value = '')
        } else {
          setOrderQuery({
            ...orderQuery,
            start: e.target.value
          })
        }
      } else {
        setOrderQuery({
          ...orderQuery,
          start: e.target.value
        })
      }
    } else if (e.target.id === 'end') {
      if (orderQuery.start) {
        if (new Date(orderQuery.start).getTime() > new Date(e.target.value).getTime()) {
          toast.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
          orderQuery.end ? (e.target.value = orderQuery.end) : (e.target.value = '')
        } else {
          setOrderQuery({
            ...orderQuery,
            end: e.target.value
          })
        }
      } else {
        setOrderQuery({
          ...orderQuery,
          end: e.target.value
        })
      }
    }
  }

  const handleRecovery = () => {
    setOrderQuery({})
    navigate({
      pathname: '/user/history'
    })
  }

  useEffect(() => {
    refetch()
  }, [searchParams])

  return (
    <div className='rounded-lg bg-white border border-gray-100 p-2 md:p-5 space-y-2 md:space-y-5'>
      <div className='flex flex-wrap gap-x-3 gap-y-3'>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-3/12 basis-full rounded-md ring-1 ring-gray-300 overflow-hidden relative'>
          <label className='absolute top-0 left-2 md:left-3 text-sm text-gray-400' htmlFor='id'>
            Tên sản phẩm
          </label>
          <input
            onChange={(e) =>
              setOrderQuery({
                ...orderQuery,
                item_name: e.target.value
              })
            }
            className='w-full outline-none pt-4 px-2 md:px-3'
            placeholder='ví dụ: youtube'
            type='text'
            id='id'
            value={orderQuery.item_name ? orderQuery.item_name : ''}
          />
        </div>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-4/12 basis-[48%] rounded-md ring-1 ring-gray-300 overflow-hidden relative'>
          <label className='absolute top-0 md:left-3 left-2 text-sm text-gray-400' htmlFor='start'>
            Ngày bắt đầu
          </label>
          <input
            className='w-full outline-none pt-4 px-2 md:px-3'
            type='date'
            id='start'
            onChange={handleDate}
            value={orderQuery.start ? orderQuery.start : ''}
          />
        </div>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-4/12 basis-[47%] rounded-md  ring-1 ring-gray-300 overflow-hidden relative'>
          <label className='absolute top-0 left-2 md:left-3 text-sm text-gray-400' htmlFor='end'>
            Ngày kết thúc
          </label>
          <input
            className='w-full outline-none pt-4 px-2 md:px-3'
            type='date'
            id='end'
            onChange={handleDate}
            value={orderQuery.end ? orderQuery.end : ''}
          />
        </div>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-3/12 basis-[48%]'>
          <ListBox
            title='Khoảng giá'
            setOrderQuery={setOrderQuery}
            orderQuery={orderQuery}
            key_data='order_price'
            data={['dưới 100k', '100k - 500k', '500k - 1tr', 'trên 1tr']}
          />
        </div>
        <div className='lg:basis-1/4 xl:basis-1/6 md:basis-3/12 basis-[47%]'>
          <ListBox
            title='Sắp xếp theo'
            setOrderQuery={setOrderQuery}
            orderQuery={orderQuery}
            data={['Mới nhất', 'Cũ nhất', 'Giá tăng dần', 'Giá giảm dần']}
            key_data='order_history'
          />
        </div>
        <button
          onClick={handleFilter}
          className='flex space-x-2 items-center px-4 py-2 bg-[#2579F2] text-white rounded-md'
        >
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z'
              />
            </svg>
          </span>
          <span>Lọc</span>
        </button>
        <button
          onClick={handleRecovery}
          className='flex space-x-2 items-center py-1 text-red-500 rounded-md font-medium'
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
                d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3'
              />
            </svg>
          </span>
          <span>Xóa bộ lọc</span>
        </button>
      </div>
      <div
        className={classNames('rounded-md overflow-hidden md:block hidden', {
          'ring-1 ring-gray-100': data?.data.orders && data.data.orders.length > 0
        })}
      >
        {data?.data.orders && data.data.orders.length > 0 && (
          <table className='w-full text-sm text-left text-gray-800'>
            <thead className='text-xs text-gray-800 uppercase bg-gray-100'>
              <tr>
                <th className='px-6 py-4'>Thời gian</th>
                <th className='px-6 py-4 lg:block hidden'>Mã đơn hàng</th>
                <th className='px-6 py-4'>Tổng tiền</th>
                <th className='px-6 py-4'>Trạng thái</th>
                <th className='px-6 py-4'></th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {data &&
                data.data.orders.map((e) => (
                  <tr key={e.order_id} className='bg-white hover:bg-gray-50'>
                    <td scope='row' className='px-6 py-4'>
                      {e.created.slice(0, 10).split('-').reverse().join('-')}
                    </td>
                    <td className='px-6 py-4 lg:block hidden truncate max-w-[250px]'>{e.order_id}</td>
                    <td className='px-6 py-4'>{format_currency(e.total)}đ</td>
                    <td className='px-6 py-4 text-green-600'>
                      {e.status === 'success' ? 'Thành công' : e.status === 'cancel' ? 'Đã hủy' : 'Chờ thanh toán'}
                    </td>
                    <td className='px-6 py-4'>
                      <NavLink to={`/user/history/${e.order_id}`} className='text-[#2579F2] hover:underline'>
                        Chi tiết
                      </NavLink>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {data?.data.orders && data.data.orders.length === 0 && (
          <div className='space-y-4 text-center py-8'>
            <div className='mx-auto w-fit'>
              <img src='https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg' alt='image' />
            </div>
            <div>Bạn chưa có đơn hàng nào cả</div>
          </div>
        )}
        {isLoading && (
          <div className='w-fit mx-auto flex items-center space-x-2' role='status'>
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
            <div>Có lỗi đã xảy ra</div>
          </div>
        )}
      </div>
      {data &&
        data.data.orders.map((e) => (
          <div key={e.order_id} className='flex gap-x-5 border-b py-3 border-gray-200 md:hidden'>
            <div className='w-3/5 space-y-2'>
              <div className='flex space-x-2'>
                <span className='max-w-[100px] truncate'>#{e.order_id}</span>
                <NavLink className='text-[#2579F9]' to={`/user/history/${e.order_id}`}>
                  Chi tiết
                </NavLink>
              </div>
              <div className='text-gray-500'>{e.created.slice(0, 10).split('-').reverse().join('-')}</div>
              <div className='w-5/6'>
                <img className='w-full rounded-md' src={e.itemInOrder[0].item.image} alt='image' />
              </div>
            </div>
            <div className='w-2/5 text-right space-y-2'>
              <span className='text-green-600'>
                {e.status === 'success' ? 'Thành công' : e.status === 'cancel' ? 'Đã hủy' : 'Chờ thanh toán'}
              </span>
              <div className='space-x-1'>
                <span className=''>Tổng tiền: </span>
                <span className='font-medium'>{format_currency(e.total)}đ</span>
              </div>
            </div>
          </div>
        ))}
      <div className='text-right pr-4 md:pr-16 lg:pr-32 py-2'>
        {data && data.data.query.page_size > 1 && (
          <Pagination
            onChange={handleJumpPage}
            defaultPageSize={1}
            defaultCurrent={1}
            current={orderQuery?.page ? orderQuery.page : 1}
            total={data.data.query.page_size}
            showSizeChanger={false}
            rootClassName='text-base md:text-lg'
          />
        )}
      </div>
    </div>
  )
}

export default OrderHistory
