import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { DeliveryFeeRepository } from './repositories/delivery-fee.repository';
import { FetchDeliveryFeeService } from 'src/bento/fetch-delivery-fee.service';
import { FetchUserProfileService } from 'src/bento/fetch-user-profile.service';
import { IDeliveryRequest } from './interfaces/delivery-request.interface';
import {
  convertFeeInDollars,
  roundToTwoDecimals,
} from 'src/common/utils/financial-utils';
import { DeliveryFeeCalculatorService } from './calculator/delivery-fee-calculator.service';
import { DeliveryFeeQueryDto } from './dto/delivery-fee-query.dto';

@Injectable()
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(
    private fetchUserProfileService: FetchUserProfileService,
    private fetchDeliveryFeeService: FetchDeliveryFeeService,
    private deliveryFeeRepository: DeliveryFeeRepository,
    private deliveryFeeCalculator: DeliveryFeeCalculatorService,
  ) {}

  async getDeliveryFee(@Req() request: Request, query: DeliveryFeeQueryDto) {
    try {
      const uuid =
        query.userId ?? (await this.fetchUserProfileService.fetch()).uuid;

      const responseFee = await this.fetchDeliveryFeeService.fetch({
        uuid,
        ...query,
      });

      const userAgent = request.headers['user-agent'] || 'Unknown User-Agent';

      const dataToResponse = {
        originalFee: convertFeeInDollars(responseFee.fee),
        newFee: this.deliveryFeeCalculator.calculate(responseFee.fee),
        deliveryTime: responseFee.deliveryTime,
        distanceMeters: roundToTwoDecimals(responseFee.distanceMeters),
      };

      await this.saveData({
        ...dataToResponse,
        userUUID: uuid,
        coordinates: responseFee.coordinates,
        merchantID: responseFee.merchantID,
        userAgent,
      });

      return {
        ...dataToResponse,
        message: null,
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error fetching delivery fee: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(`Unexpected error: ${JSON.stringify(error)}`);
      }

      throw new HttpException(
        'An error occurred while processing your request. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async saveData({
    originalFee,
    newFee,
    deliveryTime,
    distanceMeters,
    userUUID,
    coordinates,
    merchantID,
    userAgent,
  }: IDeliveryRequest): Promise<void> {
    try {
      const docData = {
        originalFee,
        newFee,
        deliveryTime,
        distanceMeters,
        coordinates,
        userUUID,
        merchantID,
        timestamp: new Date().toISOString(),
        userAgent,
      };

      await this.deliveryFeeRepository.create(docData);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error saving delivery fee data: ${error.message}`,
          error.stack,
        );
      } else {
        this.logger.error(`Unexpected error: ${JSON.stringify(error)}`);
      }

      throw new HttpException(
        'Unable to save delivery fee data. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
