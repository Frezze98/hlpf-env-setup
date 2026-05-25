import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Створити замовлення' })
  create(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
    const userId = req.user?.sub || req.user?.id;
    return this.ordersService.create(createOrderDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Мої замовлення (user) / Всі (admin)' })
  findAll(@Query() query: any, @Request() req: any) {
    const userId = req.user?.sub || req.user?.id;
    const role = req.user?.role;
    return this.ordersService.findAll(query, userId, role);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Одне замовлення (з перевіркою власника)' })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const userId = req.user?.sub || req.user?.id;
    const role = req.user?.role;
    return this.ordersService.findOne(id, userId, role);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Змінити статус (тільки admin)' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateOrderStatusDto,
    @Request() req: any,
  ) {
    if (req.user?.role !== 'admin') {
      throw new ForbiddenException('Only admins can change status');
    }
    return this.ordersService.updateStatus(id, updateDto.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Видалити замовлення (тільки admin)' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    if (req.user?.role !== 'admin') {
      throw new ForbiddenException('Only admins can delete orders');
    }
    return this.ordersService.remove(id);
  }
}
