import { Injectable } from '@nestjs/common';
import { IDeliveryFeeResponse } from './interfaces/delivery-fee.interface';
import FetchBaseService from './fetch-base.service';
import { IDeliveryFeeRequest } from './interfaces/delivery-fee-request.interface';
import { DeliveryFeePayloadDto } from 'src/delivery/dto/delivery-fee-payload.dto';

@Injectable()
export class FetchDeliveryFeeService extends FetchBaseService {
  async fetch(payload: DeliveryFeePayloadDto): Promise<IDeliveryFeeResponse> {
    console.log(JSON.stringify(payload));
    const response = await this.makeHttpRequest<
      IDeliveryFeeRequest,
      IDeliveryFeeResponse
    >('post', '/delivery/fee', payload);

    return {
      ...response,
      coordinates: {
        addressFrom: payload.addressFrom.coordinates,
        addressTo: payload.addressTo.coordinatesAdjustment,
      },
      merchantID: payload.merchant.id,
    };
  }
}
