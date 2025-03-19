import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({
    description: 'Latitude of the address',
    example: 19.3331008,
  })
  lat: number;

  @ApiProperty({
    description: 'Longitude of the address',
    example: -81.3801101,
  })
  lng: number;
}

export class CoordinatesDto {
  @ApiProperty({
    description: 'Coordinates of the origin address',
    type: AddressDto,
  })
  addressFrom: AddressDto;

  @ApiProperty({
    description: 'Coordinates of the destination address',
    type: AddressDto,
  })
  addressTo: AddressDto;
}

export class LastRequestsResponseDto {
  @ApiProperty({
    description: 'Original fee before any adjustments',
    example: 8.13,
  })
  originalFee: number;

  @ApiProperty({
    description: 'New fee after adjustments',
    example: 9.19,
  })
  newFee: number;

  @ApiProperty({
    description: 'Delivery time in minutes',
    example: 0,
  })
  deliveryTime: number;

  @ApiProperty({
    description: 'Distance between origin and destination in meters',
    example: 6651.61,
  })
  distanceMeters: number;

  @ApiProperty({
    description: 'Coordinates of the origin and destination addresses',
    type: CoordinatesDto,
  })
  coordinates: CoordinatesDto;

  @ApiProperty({
    description: 'UUID of the user who made the request',
    example: 'qyLNDxGpyGaNXWSnYJqK6vibKff1',
  })
  userUUID: string;

  @ApiProperty({
    description: 'Merchant ID related to the transaction',
    example: '8JbEqL0RTgHfRREvtSuO',
  })
  merchantID: string;

  @ApiProperty({
    description: 'Timestamp when the request was made',
    example: '2025-03-19T20:15:27.375Z',
  })
  timestamp: string;

  @ApiProperty({
    description: 'User agent of the client making the request',
    example:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
  })
  userAgent: string;
}
