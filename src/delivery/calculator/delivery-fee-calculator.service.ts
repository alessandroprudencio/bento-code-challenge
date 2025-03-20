import { Injectable } from '@nestjs/common';
import {
  convertFeeInDollars,
  roundToTwoDecimals,
} from 'src/common/utils/financial-utils';
import { IDeliveryFeeCalculator } from '../interfaces/delivery-fee-calculator.interface';

@Injectable()
export class DeliveryFeeCalculatorService implements IDeliveryFeeCalculator {
  calculate(feeInCents: number): number {
    const MARGIN_RATE = 1.13;
    const feeInDollars = convertFeeInDollars(feeInCents);
    return roundToTwoDecimals(feeInDollars * MARGIN_RATE);
  }
}
