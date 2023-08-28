import Paging from 'src/Components/Paging'
import Sort from './Sort'
import { useSearchParams } from 'react-router-dom'
import { ItemCategoryEnum, ItemQuery } from 'src/Types/items.type'
import { isUndefined, omitBy } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { useGetItemListQuery } from 'src/utils/apis/items.api'

const checkCategory = (category: string | undefined) => {
  if (category && Object.values(ItemCategoryEnum).find((e) => e === category)) {
    return category
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

function ProductList() {
  const [searchParams] = useSearchParams()
  const {
    category,
    item_name,
    limit,
    order_by_created,
    order_by_item_name,
    order_by_price,
    order_by_sold,
    page,
    price_max,
    price_min
  } = Object.fromEntries(searchParams) as ItemQuery
  const searchs: ItemQuery = useMemo(() => {
    return {
      ...omitBy(
        {
          category: checkCategory(category),
          item_name: item_name ? (item_name as string) : undefined,
          price_min: checkNumber(price_min),
          price_max: checkNumber(price_max),
          order_by_created: checkOrder(order_by_created),
          order_by_item_name: checkOrder(order_by_item_name),
          order_by_price: checkOrder(order_by_price),
          order_by_sold: checkOrder(order_by_sold),
          limit: checkNumber(limit),
          page: checkNumber(page)
        },
        isUndefined
      )
    }
  }, [searchParams])
  const [query, setQuery] = useState<ItemQuery>(searchs)
  const { data, refetch, isFetching } = useGetItemListQuery(searchs)

  useEffect(() => {
    refetch()
  }, [searchs])
  return (
    <div className='lg:space-y-5 space-y-3 bg-[#F3F4F6] py-3 lg:py-4'>
      <Sort query={query} setQuery={setQuery} />
      <Paging
        query={query}
        setQuery={setQuery}
        products={data?.data.items}
        isPaging={true}
        page_size={data?.data.query.page_size}
        isFetching={isFetching}
      />
    </div>
  )
}

export default ProductList
