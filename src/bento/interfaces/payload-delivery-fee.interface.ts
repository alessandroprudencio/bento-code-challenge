export interface IPayloadDeliveryFee {
  addressFrom: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  addressTo: {
    coordinatesAdjustment: {
      lat: number;
      lng: number;
    };
  };
  merchant: { id: string };
  user: { uuid: string };
}
