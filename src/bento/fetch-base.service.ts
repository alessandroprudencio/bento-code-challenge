import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

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

  protected async makeHttpRequest<TRequest, TResponse>(
    method: 'get' | 'post',
    path: string,
    data?: TRequest,
  ): Promise<TResponse> {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.configService.get<string>('bento.apiToken')}`,
      'Content-Type': 'application/json',
    };

    const requestConfig: AxiosRequestConfig = { headers };

    if (method === 'post' && data) requestConfig.data = data;

    const { data: responseData } = await firstValueFrom(
      this.httpService
        .request<TResponse>({
          method,
          url: `${this.bentoAPI}${path}`,
          ...requestConfig,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(`Bento API Error: ${error.message}`, error.stack);
            throw this.handleApiError(error);
          }),
        ),
    );

    return responseData;
  }

  private handleApiError(error: AxiosError): HttpException {
    if (error.response) {
      const statusCode = error.response.status || HttpStatus.BAD_GATEWAY;
      const errorData = error.response?.data;
      const errorMessage =
        errorData && typeof errorData === 'object' && 'message' in errorData
          ? String(errorData.message)
          : 'Error while fetching data from Bento API';

      return new HttpException(
        { message: `Bento API Error: ${errorMessage}`, statusCode },
        statusCode,
      );
    } else if (error.request) {
      return new HttpException(
        {
          message:
            'No response received from Bento API. Please try again later.',
          statusCode: HttpStatus.GATEWAY_TIMEOUT,
        },
        HttpStatus.GATEWAY_TIMEOUT,
      );
    } else {
      return new HttpException(
        {
          message: 'Unexpected error while contacting Bento API.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
