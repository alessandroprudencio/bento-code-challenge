import { Injectable } from '@nestjs/common';
import { IDeliveryFeeResponse } from './interfaces/delivery-fee.interface';
import FetchBaseService from './fetch-base.service';
import { IDeliveryFeeRequest } from './interfaces/delivery-fee-request.interface';
import { IDeliveryFeeParams } from './interfaces/delivery-fee-params.interface';

@Injectable()
export class FetchDeliveryFeeService extends FetchBaseService {
  private readonly defaultPayload: Omit<IDeliveryFeeRequest, 'user'> = {
    addressFrom: {
      coordinates: {
        lat: 19.3331008,
        lng: -81.3801101,
      },
    },
    addressTo: {
      coordinatesAdjustment: {
        lat: 19.280354483797733,
        lng: -81.37386862188578,
      },
    },
    merchant: {
      id: '8JbEqL0RTgHfRREvtSuO',
    },
  };

  async fetch(params: IDeliveryFeeParams): Promise<IDeliveryFeeResponse> {
    const payload: IDeliveryFeeRequest = {
      ...this.defaultPayload,
      user: { uuid: params.uuid },
      addressFrom: {
        coordinates: {
          lat:
            params.originLat || this.defaultPayload.addressFrom.coordinates.lat,
          lng:
            params.originLng || this.defaultPayload.addressFrom.coordinates.lng,
        },
      },
      addressTo: {
        coordinatesAdjustment: {
          lat:
            params.destinationLat ||
            this.defaultPayload.addressTo.coordinatesAdjustment.lat,
          lng:
            params.destinationLng ||
            this.defaultPayload.addressTo.coordinatesAdjustment.lng,
        },
      },
      merchant: {
        id: params.merchantId || this.defaultPayload.merchant.id,
      },
    };

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
