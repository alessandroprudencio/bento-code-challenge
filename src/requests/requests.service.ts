import { Injectable } from '@nestjs/common';
import { QueryLastRequestsDto } from './dto/query-last-requests.dto';
import { DeliveryFeeRepository } from '../delivery/repositories/delivery-fee.repository';

@Injectable()
export class RequestsService {
  constructor(private deliveryFeeRepository: DeliveryFeeRepository) {}

  async getLastRequests({ limit }: QueryLastRequestsDto) {
    return await this.deliveryFeeRepository.list({
      limit,
      orderBy: { field: 'timestamp', direction: 'asc' },
    });
  }
}
