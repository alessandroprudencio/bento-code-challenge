import { Controller, Get, Query } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { QueryLastRequestsDto } from './dto/query-last-requests.dto';
import { ApiResponse } from '@nestjs/swagger';
import { LastRequestsResponseDto } from './dto/last-requests-response.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get('last')
  @ApiResponse({
    status: 200,
    type: [LastRequestsResponseDto],
  })
  getLastRequests(@Query() queryLastRequestsDto: QueryLastRequestsDto) {
    return this.requestsService.getLastRequests(queryLastRequestsDto);
  }
}
