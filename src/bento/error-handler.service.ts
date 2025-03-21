import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';

@Injectable()
export class ErrorHandlerService {
  handle(error: AxiosError): HttpException {
    if (error.response) {
      const statusCode = error.response.status || HttpStatus.BAD_GATEWAY;
      const errorData = error.response?.data;
      const errorMessage =
        errorData && typeof errorData === 'object' && 'message' in errorData
          ? String(errorData.message)
          : 'Error while fetching data from Bento API';

      return new HttpException(
        {
          message: `Bento API Error: ${errorMessage}`,
          statusCode,
        },
        statusCode,
      );
    } else if (error.request) {
      return new HttpException(
        {
          message: `No response received from Bento API. Error: ${error.message}`,
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
