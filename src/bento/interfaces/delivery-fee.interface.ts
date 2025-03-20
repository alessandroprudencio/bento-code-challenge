export interface IDeliveryFeeResponse {
  fee: number;
  deliveryTime: number;
  distanceMeters: number;
  message?: string;
  coordinates: {
    addressFrom: {
      lat: number;
      lng: number;
    };
    addressTo: {
      lat: number;
      lng: number;
    };
  };
  merchantID: string;
}
