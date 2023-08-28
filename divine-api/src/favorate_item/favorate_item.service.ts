import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavorate } from './dto/create-favorate.dto';
import { MyException } from '../commons/filters/my.filter';
import { SuccessResponse } from '../types/Response.type';
import { favorate_item } from '@prisma/client';
import { QueryFavorate } from './dto/query-favorate.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { isUndefined, omitBy } from 'lodash';

@Injectable()
export class FavorateItemService {
  constructor(private readonly prisma: PrismaService) {}

  async all(
    user_id: string,
    {
      end,
      item_name,
      order_by_created,
      order_by_price,
      price_max,
      price_min,
      start,
      limit,
      page,
    }: QueryFavorate,
  ): Promise<
    SuccessResponse<{
      favorates: favorate_item[];
      query: QueryFavorate & {
        page_size: number;
      };
    }>
  > {
    const take = limit ? limit : 10;
    const [all, founds] = await Promise.all([
      this.prisma.favorate_item.findMany({
        where: {
          user_id,
          item: {
            item_name: {
              contains: item_name,
            },
            price: {
              gte: price_min,
              lte: price_max,
            },
          },
          created: {
            gte: start,
            lte: end,
          },
        },
      }),
      this.prisma.favorate_item.findMany({
        where: {
          user_id,
          item: {
            item_name: {
              contains: item_name,
            },
            price: {
              gte: price_min,
              lte: price_max,
            },
          },
          created: {
            gte: start,
            lte: end,
          },
        },
        orderBy: {
          created: order_by_created,
          item: order_by_price
            ? {
                price: order_by_price,
              }
            : undefined,
        },
        include: {
          item: true,
        },
        take,
        skip: page && page > 1 ? (page - 1) * take : 0,
      }),
    ]);
    return {
      message: 'Lấy danh sách sản phẩm yêu thích thành công',
      data: {
        favorates: founds,
        query: {
          ...omitBy(
            {
              end,
              item_name,
              limit,
              order_by_created,
              order_by_price,
              page,
              price_max,
              price_min,
              start,
            } as QueryFavorate,
            isUndefined,
          ),
          page_size: Math.ceil(all.length / take),
        },
      },
    };
  }

  async detail(
    user_id: string,
    item_id: string,
  ): Promise<SuccessResponse<favorate_item>> {
    const found = await this.prisma.favorate_item.findUnique({
      where: {
        item_id_user_id: {
          item_id,
          user_id,
        },
      },
      include: {
        item: true,
      },
    });
    if (!found) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Sản phẩm yêu thích không tồn tại',
      });
    }
    return {
      message: 'Lấy thông tin sản phẩm yêu thích thành công',
      data: found,
    };
  }

  async createFavorate(
    user_id: string,
    { item_id, receive_email }: CreateFavorate,
  ): Promise<SuccessResponse<favorate_item>> {
    const [item_found, found] = await Promise.all([
      this.prisma.item.findUnique({
        where: {
          item_id,
        },
      }),
      this.prisma.favorate_item.findUnique({
        where: {
          item_id_user_id: {
            item_id,
            user_id,
          },
        },
      }),
    ]);
    if (!item_found) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Sản phẩm không tồn tại',
      });
    }
    if (found) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Sản phẩm yêu thích đã tồn tại',
      });
    }
    const new_favorate = await this.prisma.favorate_item.create({
      data: {
        user_id,
        item_id,
        receive_email,
      },
    });
    return {
      message: 'Thêm sản phẩm yêu thích thành công',
      data: new_favorate,
    };
  }

  async delete(user_id: string, item_id: string): Promise<SuccessResponse<{}>> {
    try {
      await this.prisma.favorate_item.delete({
        where: {
          item_id_user_id: {
            item_id,
            user_id,
          },
        },
      });
      return {
        message: 'Bỏ yêu thích sản phẩm thành công',
        data: {},
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new MyException({
          status_code: HttpStatus.NOT_FOUND,
          message: 'Sản phẩm yêu thích không tồn tại',
        });
      } else {
        throw new MyException({
          status_code: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        });
      }
    }
  }
}
