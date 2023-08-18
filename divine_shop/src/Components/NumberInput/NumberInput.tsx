import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { AppDispatch } from 'src/store'
import { BuyItem, addItemsIntoCart, deleteItemsFromCart } from 'src/utils/slices/items.slice'

type NumberInputProps = {
  item: BuyItem
}

function NumberInput({ item }: NumberInputProps) {
  const [count, setCount] = useState<number | ''>(item.buy_amount > item.quantity ? item.quantity : item.buy_amount)
  const dispatch = useDispatch<AppDispatch>()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setCount('')
    }
    if (/^[0-9]+$/.test(value)) {
      if (Number(value) >= 1 && Number(value) <= item.quantity) {
        setCount(Number(value))
        dispatch(
          addItemsIntoCart({
            ...item,
            buy_amount: Number(value),
            replace: true
          })
        )
      }
    }
  }
  const handleAdd = () => {
    if (item.buy_amount < item.quantity) {
      setCount((count) => ((count as number) += 1))
      dispatch(
        addItemsIntoCart({
          ...item,
          buy_amount: 1
        })
      )
    }
  }
  const handleMinus = () => {
    if (item.buy_amount > 1) {
      setCount((count) => ((count as number) -= 1))
      dispatch(
        deleteItemsFromCart({
          item_id: item.item_id,
          amount: 1
        })
      )
    }
  }
  return (
    <div className='w-fit h-fit overflow-hidden border border-gray-300 rounded-sm divide-x divide-gray-300 flex'>
      <button onClick={count === '' ? undefined : handleMinus} className='py-2 px-2 font-medium hover:bg-gray-100'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-3 h-3'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M18 12H6' />
        </svg>
      </button>
      <input
        className='outline-none w-12 text-center text-[#2579F2]'
        type='text'
        value={count}
        onChange={handleChange}
        onBlur={() => setCount(item.buy_amount)}
      />
      <button onClick={count === '' ? undefined : handleAdd} className='py-2 px-2 font-medium hover:bg-gray-100'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-3 h-3'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}

export default NumberInput
