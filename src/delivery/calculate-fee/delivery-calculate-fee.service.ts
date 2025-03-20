import { Injectable } from '@nestjs/common';
import {
  convertFeeInDollars,
  roundToTwoDecimals,
} from 'src/common/utils/financial-utils';
import { IDeliveryCalculateFee } from '../interfaces/delivery-calculate-fee.interface';

@Injectable()
export class DeliveryCalculateFeeService implements IDeliveryCalculateFee {
  calculateNewFee(feeInCents: number): number {
    const MARGIN_RATE = 1.13;
    const feeInDollars = convertFeeInDollars(feeInCents);
    return roundToTwoDecimals(feeInDollars * MARGIN_RATE);
  }
}
