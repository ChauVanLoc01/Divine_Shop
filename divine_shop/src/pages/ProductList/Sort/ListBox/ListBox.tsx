import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ItemCategoryEnum, ItemQuery } from 'src/Types/items.type'
import { isUndefined, omitBy } from 'lodash'
import { OrderQuery } from 'src/Types/order.type'

type ListBoxProps = {
  title: string
  key_data: string
  data: string[]
  query?: ItemQuery
  setQuery?: React.Dispatch<React.SetStateAction<ItemQuery>>
  orderQuery?: OrderQuery
  setOrderQuery?: React.Dispatch<React.SetStateAction<OrderQuery>>
}

function ListBox({ title, data, key_data, setQuery, query, setOrderQuery, orderQuery }: ListBoxProps) {
  const [selected, setSelected] = useState<string | ''>('')

  const init = () => {
    if (key_data === 'category') {
      if (query?.category) {
        const index = data.findIndex((e) => e === query.category)
        index !== -1 && setSelected(data[index])
      } else {
        setSelected('')
      }
    } else if (key_data === 'price') {
      if (query?.price_max && query.price_min) {
        if (query.price_min === 100000 && query.price_max === 500000) {
          setSelected(data[1])
        }
        if (query.price_min === 500000 && query.price_max === 1000000) {
          setSelected(data[2])
        }
      } else {
        if (query?.price_max) {
          switch (query.price_max) {
            case 100000:
              setSelected(data[0])
              break
            default:
              break
          }
        } else if (query?.price_min) {
          switch (query?.price_min) {
            case 1000000:
              setSelected(data[3])
              break
            default:
              break
          }
        } else {
          setSelected('')
        }
      }
    } else if (key_data === 'order') {
      if (query?.order_by_created) {
        if (query?.order_by_created === 'asc') {
          setSelected(data[1])
        } else {
          setSelected(data[0])
        }
      } else if (query?.order_by_sold) {
        setSelected(data[2])
      } else if (query?.order_by_price) {
        if (query?.order_by_price) {
          if (query?.order_by_price === 'asc') {
            setSelected(data[3])
          } else {
            setSelected(data[4])
          }
        }
      } else {
        setSelected('')
      }
    } else if (key_data === 'order_price') {
      if (!orderQuery?.total_price_max && !orderQuery?.total_price_min) {
        setSelected('')
      } else {
        if (orderQuery.total_price_max && orderQuery.total_price_max === 100000) {
          setSelected(data[0])
        } else if (orderQuery.total_price_min && orderQuery.total_price_min === 1000000) {
          setSelected(data[3])
        } else if (orderQuery.total_price_max && orderQuery.total_price_min) {
          if (orderQuery.total_price_max === 500000 && orderQuery.total_price_min === 100000) {
            setSelected(data[1])
          } else if (orderQuery.total_price_max === 1000000 && orderQuery.total_price_min === 500000) {
            setSelected(data[2])
          }
        }
      }
    } else if (key_data === 'order_history') {
      if (!orderQuery?.order_by_created && !orderQuery?.order_by_total_price) {
        setSelected('')
      } else {
        if (orderQuery?.order_by_created) {
          orderQuery.order_by_created === 'asc' && setSelected(data[1])
          orderQuery.order_by_created === 'desc' && setSelected(data[0])
        } else if (orderQuery?.order_by_total_price) {
          orderQuery.order_by_total_price === 'asc' && setSelected(data[2])
          orderQuery.order_by_total_price === 'desc' && setSelected(data[3])
        }
      }
    }
  }

  useEffect(() => {
    if (selected) {
      if (key_data === 'category') {
        setQuery &&
          setQuery({
            ...query,
            [key_data]: selected as ItemCategoryEnum
          })
      }
      if (key_data === 'order') {
        switch (selected) {
          case 'Mới nhất':
            setQuery &&
              setQuery(
                omitBy(
                  {
                    ...query,
                    order_by_created: 'desc',
                    order_by_sold: undefined,
                    order_by_price: undefined
                  },
                  isUndefined
                )
              )
            break
          case 'Cũ nhất':
            setQuery &&
              setQuery(
                omitBy(
                  {
                    ...query,
                    order_by_created: 'asc',
                    order_by_sold: undefined,
                    order_by_price: undefined
                  },
                  isUndefined
                )
              )
            break
          case 'Bán chạy':
            setQuery &&
              setQuery(
                omitBy(
                  {
                    ...query,
                    order_by_sold: 'desc',
                    order_by_created: undefined,
                    order_by_price: undefined
                  },
                  isUndefined
                )
              )
            break
          case 'Giá tăng dần':
            setQuery &&
              setQuery(
                omitBy(
                  {
                    ...query,
                    order_by_price: 'asc',
                    order_by_created: undefined,
                    order_by_sold: undefined
                  },
                  isUndefined
                )
              )
            break
          case 'Giá giảm dần':
            setQuery &&
              setQuery(
                omitBy(
                  {
                    ...query,
                    order_by_price: 'desc',
                    order_by_created: undefined,
                    order_by_sold: undefined
                  },
                  isUndefined
                )
              )
            break
          default:
            break
        }
      }
      if (key_data === 'price') {
        switch (selected) {
          case data[0]:
            setQuery &&
              setQuery(
                omitBy(
                  {
                    ...query,
                    price_min: undefined,
                    price_max: 100000
                  },
                  isUndefined
                )
              )
            break
          case data[1]:
            setQuery &&
              setQuery({
                ...query,
                price_min: 100000,
                price_max: 500000
              })
            break
          case data[2]:
            setQuery &&
              setQuery({
                ...query,
                price_min: 500000,
                price_max: 1000000
              })
            break
          case data[3]:
            setQuery &&
              setQuery(
                omitBy(
                  {
                    ...query,
                    price_min: 1000000,
                    price_max: undefined
                  },
                  isUndefined
                )
              )
            break
          default:
            break
        }
      }
      if (key_data === 'order_price') {
        switch (selected) {
          case 'dưới 100k':
            setOrderQuery &&
              setOrderQuery(
                omitBy(
                  {
                    ...orderQuery,
                    total_price_min: undefined,
                    total_price_max: 100000
                  } as OrderQuery,
                  isUndefined
                )
              )
            break
          case '100k - 500k':
            setOrderQuery &&
              setOrderQuery({
                ...orderQuery,
                total_price_min: 100000,
                total_price_max: 500000
              } as OrderQuery)
            break
          case '500k - 1tr':
            setOrderQuery &&
              setOrderQuery({
                ...orderQuery,
                total_price_min: 500000,
                total_price_max: 1000000
              } as OrderQuery)
            break
          case 'trên 1tr':
            setOrderQuery &&
              setOrderQuery(
                omitBy(
                  {
                    ...orderQuery,
                    total_price_min: 1000000,
                    total_price_max: undefined
                  } as OrderQuery,
                  isUndefined
                )
              )
            break
          default:
            break
        }
      }
      if (key_data === 'order_history') {
        switch (selected) {
          case data[0]:
            setOrderQuery &&
              setOrderQuery(
                omitBy(
                  {
                    ...orderQuery,
                    order_by_created: 'desc',
                    order_by_total_price: undefined
                  } as OrderQuery,
                  isUndefined
                )
              )
            break
          case data[1]:
            setOrderQuery &&
              setOrderQuery(
                omitBy(
                  {
                    ...orderQuery,
                    order_by_created: 'asc',
                    order_by_total_price: undefined
                  } as OrderQuery,
                  isUndefined
                )
              )
            break
          case data[2]:
            setOrderQuery &&
              setOrderQuery(
                omitBy(
                  {
                    ...orderQuery,
                    order_by_total_price: 'asc',
                    order_by_created: undefined
                  } as OrderQuery,
                  isUndefined
                )
              )
            break
          case data[3]:
            setOrderQuery &&
              setOrderQuery(
                omitBy(
                  {
                    ...orderQuery,
                    order_by_total_price: 'desc',
                    order_by_created: undefined
                  } as OrderQuery,
                  isUndefined
                )
              )
            break
          default:
            break
        }
      }
    }
  }, [selected])

  useEffect(() => {
    init()
  }, [query, orderQuery])
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className='relative border-[1px] bg-white border-gray-300 rounded-md'>
        <Listbox.Button className='relative w-full cursor-pointer text-left pt-4 pl-2 md:pl-3 xl:pl-5 rounded-md bg-white focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 z-10 py-1'>
          <span className='absolute top-0 md:left-3 xl:left-5 text-gray-400 md:text-sm text-xs'>{title}</span>
          <span className='truncate'>{selected ? selected : 'Chọn ...'}</span>
          <span className='pointer-events-none absolute top-1/2 -translate-y-1/2 right-1 md:right-2 xl:right-4 flex'>
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
                d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
              />
            </svg>
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave='transition ease-in duration-300' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <Listbox.Options className='w-full absolute rounded-md mt-1 bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden'>
            {data.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-2 md:pl-3 xl:pl-5 ${
                    active ? 'bg-[#2579F2]/90 text-white' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{person}</span>
                    {selected ? (
                      <span className='absolute top-1/2 right-2 md:right-3 xl:right-5 -translate-y-1/2 text-white'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-3 h-3 stroke-2'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                        </svg>
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default ListBox
