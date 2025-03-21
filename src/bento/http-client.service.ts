import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);

  private readonly bentoApiUrl?: string;
  private readonly bentoApiToken?: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly errorHandler: ErrorHandlerService,
  ) {
    this.bentoApiUrl = this.configService.get<string | undefined>(
      'bento.apiUrl',
    );
    if (!this.bentoApiUrl) throw new Error('Bento API url is not configured');

    this.bentoApiToken = this.configService.get<string | undefined>(
      'bento.apiToken',
    );
    if (!this.bentoApiToken)
      throw new Error('Bento API token is not configured');
  }

  async request<TRequest, TResponse>(
    method: 'get' | 'post',
    path: string,
    data?: TRequest,
  ): Promise<TResponse> {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.bentoApiToken}`,
      'Content-Type': 'application/json',
    };

    const requestConfig: AxiosRequestConfig = { headers };

    if (method === 'post' && data) requestConfig.data = data;

    const { data: responseData, status } = await firstValueFrom(
      this.httpService
        .request<TResponse>({
          method,
          url: `${this.bentoApiUrl}${path}`,
          ...requestConfig,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(`Bento API Error: ${error.message}`, error.stack);
            throw this.errorHandler.handle(error);
          }),
        ),
    );

    this.logger.debug(`Success ${method.toUpperCase()} ${path}`, {
      context: {
        statusCode: status,
        truncatedResponse: responseData,
      },
    });

    return responseData;
  }
}
