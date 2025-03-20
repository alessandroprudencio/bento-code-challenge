import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { DeliveryFeeRepository } from './repositories/delivery-fee.repository';
import { DeliveryFeeCalculatorService } from './calculator/delivery-fee-calculator.service';

@Module({
  imports: [],
  controllers: [DeliveryController],
  providers: [
    DeliveryFeeRepository,
    DeliveryService,
    DeliveryFeeCalculatorService,
  ],
})
export class DeliveryModule {}
