import { Controller, Get, Query, Req } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { Request } from 'express';
import { DeliveryFeeResponseDto } from './dto/delivery-fee-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { DeliveryFeeQueryDto } from './dto/delivery-fee-query.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('fee')
  @ApiResponse({
    status: 200,
    type: [DeliveryFeeResponseDto],
  })
  async getDeliveryFee(
    @Query() query: DeliveryFeeQueryDto,
    @Req() request: Request,
  ) {
    return await this.deliveryService.getDeliveryFee(request, query);
  }
}
