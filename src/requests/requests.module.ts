import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { DeliveryFeeRepository } from 'src/delivery/repositories/delivery-fee.repository';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService, DeliveryFeeRepository],
})
export class RequestsModule {}
