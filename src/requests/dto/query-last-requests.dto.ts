import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
const DEFAULT_LIMIT = 10;

export class QueryLastRequestsDto {
  @ApiProperty({
    required: false,
    default: DEFAULT_LIMIT,
    description: 'Number of records to return.',
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit: number = DEFAULT_LIMIT;
}
