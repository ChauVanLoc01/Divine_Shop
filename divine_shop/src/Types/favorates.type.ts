import { Item } from './items.type'

export type FavorateItem = {
  user_id: string
  item_id: string
  receive_email: boolean
  created: string
  item: Item
}

export type FavorateQuery = Partial<{
  item_name: string
  price_min: number
  price_max: number
  start: string
  end: string
  order_by_created: 'asc' | 'desc'
  order_by_price: 'asc' | 'desc'
  limit: number
  page: number
}>

export type FavorateItemList = {
  favorates: FavorateItem[]
  query: FavorateQuery & {
    page_size: number
  }
}

export type CreateFavorateItem = Pick<FavorateItem, 'item_id' | 'receive_email'>
