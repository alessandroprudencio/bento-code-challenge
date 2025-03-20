import { Controller, Get, Req } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { Request } from 'express';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('fee')
  async getDeliveryFee(@Req() request: Request) {
    return await this.deliveryService.getDeliveryFee(request);
  }
}
