import { SuccessResponse } from './responses.type'

export enum ItemCategoryEnum {
  entertainment = 'entertainment',
  work = 'work',
  learn = 'learn',
  game_steam = 'game_steam',
  ea_games = 'ea_games',
  window_office = 'window_office',
  google_drive = 'google_drive',
  steam_wallet = 'steam_wallet',
  google_play_itune = 'google_play_itune'
}

export type OrderKey = 'asc' | 'desc'

export type Item = {
  item_id: string
  item_name: string
  image: string
  price: number
  priceBeforeDiscount: number
  quantity: number
  sold: number
  description: string
  category: ItemCategoryEnum
  created: string
  updated: string
}

export type ItemQuery = {
  many?: string
  item_name?: string
  category?: ItemCategoryEnum
  price_min?: number
  price_max?: number
  order_by_created?: OrderKey
  order_by_item_name?: OrderKey
  order_by_price?: OrderKey
  order_by_sold?: OrderKey
  limit?: number
  page?: number
}

export type ItemResult = SuccessResponse<Item>

export type ItemListResult = SuccessResponse<{
  items: Item[]
  query: Omit<ItemQuery, 'limit' | 'page'> & {
    limit: number
    page: number
    page_size: number
  }
}>
