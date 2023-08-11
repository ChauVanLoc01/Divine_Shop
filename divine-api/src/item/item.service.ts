import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SuccessResponse } from '../types/Response.type';
import { Prisma, item } from '@prisma/client';
import { isUndefined, omitBy } from 'lodash';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async getDetail(item_id: number): Promise<SuccessResponse<item>> {
    const item = await this.prisma.item.findUnique({
      where: {
        item_id,
      },
    });
    if (!item) {
      throw new NotFoundException('Item is not exist!');
    }
    return {
      message: 'Get item detail successfully',
      data: item,
    };
  }

  async getListItem(
    category?:
      | 'entertainment'
      | 'work'
      | 'learn'
      | 'game_steam'
      | 'ea_games'
      | 'window_office'
      | 'google_drive'
      | 'steam_wallet'
      | 'google_play_itune',
    price_max?: number,
    price_min?: number,
    order_by_created?: 'asc' | 'desc',
    order_by_item_name?: 'asc' | 'desc',
    order_by_price?: 'asc' | 'desc',
    limit?: number,
    page?: number,
  ): Promise<
    SuccessResponse<{
      items: Pick<
        item,
        'item_id' | 'item_name' | 'price' | 'priceBeforeDiscount'
      >[];
      [key: string]: any;
    }>
  > {
    const take = limit ? limit : Number(process.env.LIMIT_STORE);
    const [tmp, items] = await Promise.all([
      this.prisma.item.findMany({
        where: {
          category: category ? category : undefined,
          price:
            !price_max && !price_min
              ? undefined
              : price_min && !price_max
              ? {
                  gte: price_min,
                }
              : price_min && price_max
              ? {
                  lte: price_max,
                  gte: price_min,
                }
              : {
                  lte: price_max,
                },
        },
      }),
      this.prisma.item.findMany({
        where: {
          category: category ? category : undefined,
          price:
            !price_max && !price_min
              ? undefined
              : price_min && !price_max
              ? {
                  gte: price_min,
                }
              : price_min && price_max
              ? {
                  lte: price_max,
                  gte: price_min,
                }
              : {
                  lte: price_max,
                },
        },
        orderBy: {
          created: order_by_created
            ? order_by_created
            : !order_by_item_name && !order_by_price
            ? 'desc'
            : undefined,
          item_name: order_by_item_name ? order_by_item_name : undefined,
          price: order_by_price ? order_by_price : undefined,
        },
        take,
        skip: page || page > 1 ? (page - 1) * limit : 0,
        select: {
          item_id: true,
          item_name: true,
          image: true,
          price: true,
          priceBeforeDiscount: true,
          category: true,
        },
      }),
    ]);
    return {
      message: 'Get item list successfully',
      data: {
        items,
        query: omitBy(
          {
            category,
            price_max,
            price_min,
            order_by_created,
            order_by_item_name,
            order_by_price,
            limit,
            page,
            page_size: Math.ceil(tmp.length / take),
          },
          isUndefined,
        ),
      },
    };
  }

  async delete(item_id: number) {
    const item = await this.prisma.item.findUnique({
      where: {
        item_id,
      },
    });
    if (!item) {
      throw new NotFoundException('Item is not exist!');
    }
    await this.prisma.item.delete({
      where: {
        item_id,
      },
    });
    return {
      message: 'Delete item successfully',
      data: item,
    };
  }

  // async createItem(
  //   data: Omit<Prisma.itemCreateInput, 'item_name'>,
  // ): Promise<SuccessResponse<item>> {
  //   const item = await this.prisma.item.create({
  //     data: {
  //     }
  //   });
  //   return {
  //     message: 'Create item successfully',
  //     data: item,
  //   };
  // }
}