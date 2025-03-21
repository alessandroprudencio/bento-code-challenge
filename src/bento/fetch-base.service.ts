import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from './http-client.service';

@Injectable()
export default abstract class FetchBaseService {
  protected readonly logger: Logger;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
    protected readonly httpClient: HttpClientService,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  protected abstract fetch(...args: any[]): Promise<any>;
}
