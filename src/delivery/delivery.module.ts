import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { DeliveryFeeRepository } from './repositories/delivery-fee.repository';
import { DeliveryCalculateFeeService } from './calculate-fee/delivery-calculate-fee.service';

@Module({
  imports: [],
  controllers: [DeliveryController],
  providers: [
    DeliveryFeeRepository,
    DeliveryService,
    DeliveryCalculateFeeService,
  ],
})
export class DeliveryModule {}
