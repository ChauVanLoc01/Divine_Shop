import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SuccessResponse } from '../types/Response.type';
import { Prisma, item } from '@prisma/client';
import { isUndefined, omitBy } from 'lodash';
import { MyException } from '../commons/filters/my.filter';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async getDetail(item_id: string): Promise<SuccessResponse<item>> {
    const item = await this.prisma.item.findUnique({
      where: {
        item_id,
      },
    });
    if (!item) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Sản phẩm không tồn tại',
      });
    }
    return {
      message: 'Lấy thông tin sản phẩm thành công',
      data: item,
    };
  }

  async getListItem(
    many?: string,
    item_name?: string,
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
    order_by_sold?: 'asc' | 'desc',
    limit?: number,
    page?: number,
  ): Promise<
    SuccessResponse<{
      items: item[];
      [key: string]: any;
    }>
  > {
    const lengthOrder = {
      ...omitBy(
        {
          order_by_created,
          order_by_item_name,
          order_by_price,
          order_by_sold,
        },
        isUndefined,
      ),
    };
    if (Object.keys(lengthOrder).length > 1) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Maximum 1 order property',
      });
    }
    const items_id = many && many.includes(',') ? many.split(',') : many;
    const take = limit ? limit : Number(process.env.LIMIT_STORE);
    const [tmp, items] = await Promise.all([
      this.prisma.item.findMany({
        where: {
          item_id: many
            ? typeof items_id === 'string'
              ? {
                  equals: items_id,
                }
              : {
                  in: items_id,
                }
            : undefined,
          item_name: item_name
            ? {
                contains: item_name,
              }
            : undefined,
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
          item_id: many
            ? typeof items_id === 'string'
              ? {
                  equals: items_id,
                }
              : {
                  in: items_id,
                }
            : undefined,
          item_name: item_name
            ? {
                contains: item_name,
              }
            : undefined,
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
          created: order_by_created ? order_by_created : undefined,
          item_name: order_by_item_name ? order_by_item_name : undefined,
          price: order_by_price ? order_by_price : undefined,
          sold: order_by_sold ? order_by_sold : undefined,
        },
        take,
        skip: !page || page === 1 ? 0 : (page - 1) * take,
      }),
    ]);
    return {
      message: 'Lấy thông tin danh sách sản phẩm thành công',
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
            limit: take,
            page: page ? page : 1,
            page_size: Math.ceil(tmp.length / take),
          },
          isUndefined,
        ),
      },
    };
  }

  async delete(item_id: string) {
    const item = await this.prisma.item.findUnique({
      where: {
        item_id,
      },
    });
    if (!item) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Item is not exist',
      });
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

  async createItem(
    data: Prisma.itemCreateInput,
  ): Promise<SuccessResponse<item>> {
    const item = await this.prisma.item.create({
      data,
    });
    return {
      message: 'Create item successfully',
      data: item,
    };
  }
}
