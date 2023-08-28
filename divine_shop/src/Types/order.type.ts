import { Item } from './items.type'

export type Order = {
  order_id: string
  user_id: string
  status: 'waiting_confirm' | 'success' | 'cancel'
  total: number
  discount: number
  note: string
  created: Date
  updated: Date
}

export type OrderAgrument = {
  items: {
    item_id: string
    buy_amount: number
  }[]
  note?: string
}

export type ItemInOrder = {
  order_id: string
  item_id: string
  quantity: number
}

export type Orders = {
  orders: OrderDetail[]
  query: OrderQuery & { page_size: number }
}

export type OrderDetail = {
  order_id: string
  user_id: string
  status: 'waiting_confirm' | 'success' | 'cancel'
  total: number
  discount: number
  note: string
  created: string
  updated: string
  itemInOrder: {
    order_id: string
    item_id: string
    quantity: number
    item: Item
  }[]
}

export type OrderQuery = Partial<{
  order_id: string
  item_name: string
  total_price_min: number
  total_price_max: number
  order_by_created: 'asc' | 'desc'
  order_by_total_price: 'asc' | 'desc'
  order_by_discount: 'asc' | 'desc'
  start: string
  end: string
  limit: number
  page: number
}>
