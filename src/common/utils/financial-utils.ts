export function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

export function convertFeeInDollars(feeInCents: number): number {
  return feeInCents / 100;
}
