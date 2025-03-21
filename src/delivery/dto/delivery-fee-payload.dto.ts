import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressToDto {
  @ApiProperty({
    description: 'Latitude of the address',
    example: 19.280354483797733,
  })
  @IsNumber()
  @Type(() => Number)
  lat: number;

  @ApiProperty({
    description: 'Longitude of the address',
    example: -81.37386862188578,
  })
  @IsNumber()
  @Type(() => Number)
  lng: number;
}

class AddressFromDto {
  @ApiProperty({ description: 'Latitude of the address', example: 19.3331008 })
  @IsNumber()
  @Type(() => Number)
  lat: number;

  @ApiProperty({
    description: 'Longitude of the address',
    example: -81.3801101,
  })
  @IsNumber()
  @Type(() => Number)
  lng: number;
}

class AddressFromCoordinateDto {
  @ApiProperty({ description: 'Coordinates of the origin address' })
  @ValidateNested()
  @Type(() => AddressFromDto)
  coordinates: AddressFromDto;
}

class AddressToCoordinateDto {
  @ApiProperty({
    description: 'Adjusted coordinates of the destination address',
  })
  @ValidateNested()
  @Type(() => AddressToDto)
  coordinatesAdjustment: AddressToDto;
}

class MerchantDto {
  @ApiProperty({
    description: 'Merchant ID related to the transaction',
    example: '8JbEqL0RTgHfRREvtSuO',
  })
  @IsString()
  id: string;
}

class UserDto {
  @ApiProperty({
    description: 'UUID of the user who made the request',
    example: 'qyLNDxGpyGaNXWSnYJqK6vibKff1',
  })
  @IsString()
  uuid: string;
}

export class DeliveryFeePayloadDto {
  @ApiProperty({
    description: 'Origin address details',
  })
  @ValidateNested()
  @Type(() => AddressFromCoordinateDto)
  addressFrom: AddressFromCoordinateDto;

  @ApiProperty({
    description: 'Destination address details',
  })
  @ValidateNested()
  @Type(() => AddressToCoordinateDto)
  addressTo: AddressToCoordinateDto;

  @ApiProperty({
    description: 'Merchant details',
  })
  @ValidateNested()
  @Type(() => MerchantDto)
  merchant: MerchantDto;

  @ApiProperty({
    description: 'User details',
  })
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
