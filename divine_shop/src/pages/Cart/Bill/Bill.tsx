import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { BuyItem, resetItemInCart } from 'src/utils/slices/items.slice'
import { setIsOpen } from 'src/utils/slices/user.slice'
import { format_currency } from 'src/utils/utils'
import { toast } from 'react-toastify'
import { isCommonError, isValidationError } from 'src/utils/check-error'
import { FailResponse, ValidationFailResponse } from 'src/Types/responses.type'
import { OrderAgrument } from 'src/Types/order.type'
import { useOrderMutation } from 'src/utils/apis/order.api'

type BillProps = {
  items_in_cart: BuyItem[]
}

function Bill({ items_in_cart }: BillProps) {
  const user = useSelector((state: RootState) => state.UserSliceName.user)
  const dispath = useDispatch<AppDispatch>()
  const [order] = useOrderMutation()
  const handleOrder = async () => {
    if (!user) {
      toast.warn('Bạn phải đăng nhập mới có thể thanh toán', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      dispath(
        setIsOpen({
          open: true,
          type: 'login'
        })
      )
    } else {
      try {
        const body = items_in_cart.filter((e) => {
          if (e.quantity > 0) {
            return { item_id: e.item_id, buy_amount: e.buy_amount }
          }
        })
        if (body.length === 0) {
          throw new Error('Lỗi đặt hàng do có đơn hàng đã bán hết')
        } else {
          await order({
            items: body
          } as OrderAgrument).unwrap()
          dispath(resetItemInCart(body as { item_id: string; buy_amount: number }[]))
          toast.success('Đặt hàng thành công', {
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
      } catch (error) {
        if (isValidationError(error)) {
          const err_data = (error.data as ValidationFailResponse<{ item_id: string }>).errors.item_id
          const err_item = items_in_cart.find((e) => e.item_id === err_data)
          toast.error(`${err_item?.item_name} không đủ số lượng`, {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
          })
        } else if (isCommonError(error)) {
          toast.error((error.data as FailResponse).message, {
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
          toast.error((error as Error).message, {
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
  }
  return (
    <div className='lg:basis-1/2 xl:basis-2/5 bottom-0 bg-white lg:bg-none lg:py-0 py-5 lg:border-none border-t border-gray-200 ring-gray-300'>
      <div className='lg:border-l sticky lg:top-10 lg:border-l-gray-300 lg:px-5 space-y-2 lg:space-y-3'>
        <div className='text-lg md:text-xl font-medium'>Thanh toán</div>
        <div className='flex justify-between'>
          <span>Tổng giá trị đơn hàng</span>
          <span>
            {format_currency(
              items_in_cart.reduce((acc, cur) => {
                return acc + cur.buy_amount * cur.priceBeforeDiscount
              }, 0)
            )}
          </span>
        </div>
        <div className='flex justify-between'>
          <span>Số tiền giảm giá</span>
          <span>
            {format_currency(
              items_in_cart.reduce((acc, cur) => {
                return acc + cur.buy_amount * (cur.priceBeforeDiscount - cur.price)
              }, 0)
            )}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className=''>Tổng tiền phải trả</span>
          <span className='font-medium text-xl md:text-lg text-red-600'>
            {format_currency(
              items_in_cart.reduce((acc, cur) => {
                return acc + cur.buy_amount * cur.price
              }, 0)
            )}
          </span>
        </div>
        <div className='flex justify-end'>
          <button
            onClick={handleOrder}
            className='px-5 w-full hover:bg-[#2579F2]/90 py-2 bg-[#2579F2] text-white rounded-md'
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  )
}

export default Bill
