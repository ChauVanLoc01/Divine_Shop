import { HttpStatus, Injectable } from '@nestjs/common';
import { MyException } from '../commons/filters/my.filter';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { SuccessResponse } from '../types/Response.type';
import { order } from '@prisma/client';
import { isUndefined, omit, omitBy } from 'lodash';
import { QueryOrder } from './dto/query-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(
    user_id: string,
    {
      order_id,
      item_name,
      start,
      end,
      order_by_created,
      order_by_discount,
      order_by_total_price,
      limit,
      page,
      total_price_max,
      total_price_min,
    }: QueryOrder,
  ): Promise<
    SuccessResponse<{
      orders: order[];
      query: QueryOrder & { page_size: number };
    }>
  > {
    const take = limit ? limit : 10;
    const [all, founds] = await Promise.all([
      this.prisma.order.findMany({
        where: {
          order_id,
          total: {
            gte: total_price_min,
            lte: total_price_max,
          },
          itemInOrder: {
            every: {
              item: {
                item_name: {
                  contains: item_name,
                },
              },
            },
          },
          created: {
            gte: start,
            lte: end,
          },
          user: {
            user_id,
          },
        },
      }),
      this.prisma.order.findMany({
        where: {
          order_id,
          total: {
            gte: total_price_min,
            lte: total_price_max,
          },
          itemInOrder: {
            every: {
              item: {
                item_name: {
                  contains: item_name,
                },
              },
            },
          },
          created: {
            gte: start,
            lte: end,
          },
          user: {
            user_id,
          },
        },
        orderBy: {
          created: order_by_created,
          discount: order_by_discount,
          total: order_by_total_price,
        },
        include: {
          itemInOrder: {
            include: {
              item: true,
            },
          },
        },
        take,
        skip: page && page > 1 ? (page - 1) * take : 0,
      }),
    ]);
    return {
      message: 'Lấy danh sách order thành công',
      data: {
        orders: founds,
        query: {
          ...omitBy(
            {
              end,
              item_name,
              limit,
              order_by_created,
              order_by_discount,
              order_by_total_price,
              order_id,
              page,
              start,
              total_price_max,
              total_price_min,
            } as QueryOrder,
            isUndefined,
          ),
          page_size: Math.ceil(all.length / take),
        },
      },
    };
  }

  async detail(
    user_id: string,
    order_id: string,
  ): Promise<SuccessResponse<order>> {
    const found = await this.prisma.order.findUnique({
      where: {
        order_id,
        user: {
          user_id,
        },
      },
      include: {
        itemInOrder: {
          include: {
            item: true,
          },
        },
      },
    });
    if (!found) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Đơn hàng không tồn tại',
      });
    }
    return {
      message: 'Lấy thông tin chi tiết đơn hàng thành công',
      data: found,
    };
  }

  async createOrder(
    user_id: string,
    data: { items: { item_id: string; buy_amount: number }[]; note?: string },
  ): Promise<SuccessResponse<order> | {}> {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    });
    if (!user) {
      throw new MyException({
        status_code: HttpStatus.UNAUTHORIZED,
        message: 'Lỗi xác thực người dùng',
      });
    }
    const item_ids = data.items.map((e) => e.item_id);
    const selected_items = await this.prisma.item.findMany({
      where: {
        item_id: {
          in: item_ids,
        },
      },
    });
    if (selected_items.length === 0) {
      throw new MyException({
        status_code: HttpStatus.NOT_FOUND,
        message: 'Sản phẩm không tồn tại',
      });
    }
    const filter_items = selected_items.map((e) => {
      const found = data.items.find((o) => o.item_id === e.item_id);
      if (found) {
        if (e.quantity >= found.buy_amount) {
          return { ...e, buy_amount: found.buy_amount };
        } else {
          throw new MyException({
            status_code: HttpStatus.BAD_REQUEST,
            message: 'Không đủ số lượng sản phẩm',
            errors: {
              item_id: e.item_id,
            },
          });
        }
      }
    });
    if (filter_items.length === 0) {
      throw new MyException({
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Đặt hàng thất bại',
      });
    }
    const result = await this.prisma.$transaction(async (tx) => {
      const new_order = await this.prisma.order.create({
        data: {
          order_id: uuidv4(),
          user_id,
          total: filter_items.reduce(
            (acu, e) => (acu += e.price * e.buy_amount),
            0,
          ),
          discount: filter_items.reduce(
            (acu, e) =>
              (acu += (e.priceBeforeDiscount - e.price) * e.buy_amount),
            0,
          ),
          note: data.note,
          status: 'success',
        },
      });
      await Promise.all(
        filter_items.map(async (e) => {
          await this.prisma.item.update({
            where: {
              item_id: e.item_id,
            },
            data: {
              quantity: {
                decrement: e.buy_amount,
              },
            },
          });
          await this.prisma.itemInOrder.create({
            data: {
              order_id: new_order.order_id,
              item_id: e.item_id,
              quantity: e.buy_amount,
            },
          });
        }),
      );
      return new_order;
    });
    return {
      message: 'Đặt hàng thành công',
      data: result,
    };
  }
}
