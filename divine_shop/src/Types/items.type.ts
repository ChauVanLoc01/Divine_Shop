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

export enum OrderEnum {
  asc = 'asc',
  desc = 'desc'
}

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
  item_name?: string
  category?: ItemCategoryEnum
  price_min?: number
  price_max?: number
  order_by_created?: OrderEnum
  order_by_item_name?: OrderEnum
  order_by_price?: OrderEnum
  order_by_sold?: OrderEnum
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
