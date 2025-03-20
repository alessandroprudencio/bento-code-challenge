export class DeliveryFeeEntity {
  id?: string;
  originalFee: number;
  newFee: number;
  deliveryTime: number;
  distanceMeters: number;
  userUUID?: string;
  merchantID?: string;
  timestamp: string;
  userAgent?: string;
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
}
