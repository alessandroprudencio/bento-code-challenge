export interface IDeliveryFeeCalculator {
  calculate(feeInCents: number): number;
}
