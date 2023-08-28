import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { ReqWithLocal } from '../types/ReqWithLocal.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryOrderDTO } from './dto/query-order.dto';

@ApiTags('Order')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  all(@Query() query: QueryOrderDTO, @Req() req: ReqWithLocal) {
    return this.orderService.getAll(req.user.user_id, query);
  }

  @Get(':slug')
  detail(@Param('slug') slug: string, @Req() req: ReqWithLocal) {
    return this.orderService.detail(req.user.user_id, slug);
  }

  @Post()
  order(@Req() req: ReqWithLocal, @Body() body: CreateOrderDTO) {
    return this.orderService.createOrder(req.user.user_id, body);
  }
}
