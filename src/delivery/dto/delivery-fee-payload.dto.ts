import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
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

class AddressFromDto {
  @ApiProperty({ description: 'Coordinates of the origin address' })
  @ValidateNested()
  @Type(() => AddressDto)
  coordinates: AddressDto;
}

class AddressToDto {
  @ApiProperty({
    description: 'Adjusted coordinates of the destination address',
  })
  @ValidateNested()
  @Type(() => AddressDto)
  coordinatesAdjustment: AddressDto;
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
  @Type(() => AddressFromDto)
  addressFrom: AddressFromDto;

  @ApiProperty({
    description: 'Destination address details',
  })
  @ValidateNested()
  @Type(() => AddressToDto)
  addressTo: AddressToDto;

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
