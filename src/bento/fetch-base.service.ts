import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default abstract class FetchBaseService {
  protected readonly logger: Logger;

  protected readonly bentoAPI?: string;

  constructor(
    protected readonly httpService: HttpService,
    protected readonly configService: ConfigService,
  ) {
    this.logger = new Logger(this.constructor.name);

    this.bentoAPI = this.configService.get<string | undefined>('bento.apiUrl');

    if (!this.bentoAPI) throw new Error('Bento API token is not configured');
  }

  protected abstract fetch(...args: any[]): Promise<any>;
}
