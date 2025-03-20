import { ApiProperty } from '@nestjs/swagger';

export class DeliveryFeeResponseDto {
  @ApiProperty({
    description: 'Original delivery fee value',
    example: 8.13,
    type: Number,
  })
  originalFee: number;

  @ApiProperty({
    description: 'Calculated new fee value',
    example: 9.19,
    type: Number,
  })
  newFee: number;

  @ApiProperty({
    description: 'Estimated delivery time in minutes',
    example: 0,
    type: Number,
  })
  deliveryTime: number;

  @ApiProperty({
    description: 'Total delivery distance in meters',
    example: 6651.61,
    type: Number,
  })
  distanceMeters: number;

  @ApiProperty({
    description: 'Optional notification message',
    example: null,
    nullable: true,
    required: false,
    type: String,
  })
  message?: string | null;
}
