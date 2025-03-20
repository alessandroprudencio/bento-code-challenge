import { Injectable } from '@nestjs/common';
import { IDeliveryFeeResponse } from './interfaces/delivery-fee.interface';
import { IUserProfile } from './interfaces/user-profile.interface';
import FetchBaseService from './fetch-base.service';
import { IDeliveryFeeRequest } from './interfaces/delivery-fee-request.interface';

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

  async fetch(profile: IUserProfile): Promise<IDeliveryFeeResponse> {
    const payload: IDeliveryFeeRequest = {
      ...this.defaultPayload,
      user: { uuid: profile.uuid },
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
