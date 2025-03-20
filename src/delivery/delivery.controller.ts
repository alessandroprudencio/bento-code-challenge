import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { Request } from 'express';
import { DeliveryFeeResponseDto } from './dto/delivery-fee-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { DeliveryFeePayloadDto } from './dto/delivery-fee-payload.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post('fee')
  @ApiResponse({
    status: 201,
    type: DeliveryFeeResponseDto,
  })
  @HttpCode(201)
  async calculateDeliveryFee(
    @Body() body: DeliveryFeePayloadDto,
    @Req() request: Request,
  ) {
    return await this.deliveryService.calculateDeliveryFee(request, body);
  }
}
