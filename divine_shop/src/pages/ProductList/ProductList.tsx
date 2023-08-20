import Paging from 'src/Components/Paging'
import Sort from './Sort'
import { useSearchParams } from 'react-router-dom'
import { ItemCategoryEnum, ItemQuery, OrderEnum } from 'src/Types/items.type'
import { isUndefined, omitBy } from 'lodash'
import { useState } from 'react'
import { useGetItemListQuery } from 'src/utils/apis/items.api'

enum key_search {
  item_name = 'item_name',
  category = 'category',
  price_min = 'price_min',
  price_max = 'price_max',
  order_by_created = 'order_by_created',
  order_by_item_name = 'order_by_item_name',
  order_by_price = 'order_by_price',
  order_by_sold = 'order_by_sold',
  limit = 'limit',
  page = 'page'
}

const checkCategory = (category: string | null) => {
  return category ? Object.values(ItemCategoryEnum).find((e) => e === category) : undefined
}

const checkOrder = (order: string | null) => {
  return order ? Object.values(OrderEnum).find((e) => e === order) : undefined
}

const checkNumber = (input: any) => {
  if (!isNaN(input) && !isNaN(parseFloat(input))) {
    return Number(input)
  }
  return undefined
}

function ProductList() {
  const [searchParams] = useSearchParams()
  const searchs: ItemQuery = {
    ...omitBy(
      {
        category: checkCategory(searchParams.get(key_search.category)),
        item_name: searchParams.get(key_search.item_name)
          ? (searchParams.get(key_search.item_name) as string)
          : undefined,
        price_min: checkNumber(searchParams.get(key_search.price_min)),
        price_max: checkNumber(searchParams.get(key_search.price_max)),
        order_by_created: checkOrder(searchParams.get(key_search.order_by_created)),
        order_by_item_name: checkOrder(searchParams.get(key_search.order_by_item_name)),
        order_by_price: checkOrder(searchParams.get(key_search.order_by_price)),
        order_by_sold: checkOrder(searchParams.get(key_search.order_by_sold)),
        limit: checkNumber(searchParams.get(key_search.limit)),
        page: checkNumber(searchParams.get(key_search.page))
      },
      isUndefined
    )
  }
  const [query, setQuery] = useState<ItemQuery>(searchs)
  const { data } = useGetItemListQuery(query)
  return (
    <div className='space-y-4 bg-[#F3F4F6] lg:py-4'>
      <Sort setQuery={setQuery} />
      {data ? <Paging products={data?.data.items} /> : <Paging />}
    </div>
  )
}

export default ProductList
