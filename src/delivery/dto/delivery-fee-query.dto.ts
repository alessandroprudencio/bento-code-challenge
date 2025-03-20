import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeliveryFeeQueryDto {
  @ApiProperty({
    required: false,
    description: 'Latitude of the origin address.',
  })
  @IsNumber()
  @IsOptional()
  originLat: number;

  @ApiProperty({
    required: false,
    description: 'Longitude of the origin address.',
  })
  @IsNumber()
  @IsOptional()
  originLng: number;

  @ApiProperty({
    required: false,
    description: 'Latitude of the destination address.',
  })
  @IsNumber()
  @IsOptional()
  destinationLat: number;

  @ApiProperty({
    required: false,
    description: 'Longitude of the destination address.',
  })
  @IsNumber()
  @IsOptional()
  destinationLng: number;

  @ApiProperty({
    required: false,
    description: 'Merchant ID.',
  })
  @IsString()
  @IsOptional()
  merchantId: string;

  @ApiProperty({
    required: false,
    description: 'User ID.',
  })
  @IsString()
  @IsOptional()
  userId: string;
}
