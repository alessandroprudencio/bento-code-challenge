import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { DeliveryFeeRepository } from './repositories/delivery-fee.repository';
import { FetchDeliveryFeeService } from '../bento/fetch-delivery-fee.service';
import { FetchUserProfileService } from '../bento/fetch-user-profile.service';
import { IDeliveryRequest } from './interfaces/delivery-request.interface';
import {
  convertFeeInDollars,
  roundToTwoDecimals,
} from '../common/utils/financial-utils';
import { DeliveryFeeCalculatorService } from './calculator/delivery-fee-calculator.service';
import { DeliveryFeePayloadDto } from './dto/delivery-fee-payload.dto';
import { instanceToPlain } from 'class-transformer';
import { DeliveryFeeEntity } from './entities/delivery-fee.entity';

@Injectable()
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(
    private fetchUserProfileService: FetchUserProfileService,
    private fetchDeliveryFeeService: FetchDeliveryFeeService,
    private deliveryFeeRepository: DeliveryFeeRepository,
    private deliveryFeeCalculator: DeliveryFeeCalculatorService,
  ) {}

  async calculateDeliveryFee(request: Request, body: DeliveryFeePayloadDto) {
    try {
      const uuid =
        body.user.uuid ?? (await this.fetchUserProfileService.fetch()).uuid;

      if (!body.user.uuid && !uuid) {
        throw new HttpException(
          'User ID or UUID is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const responseFee = await this.fetchDeliveryFeeService.fetch({
        ...body,
        user: { uuid },
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
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof Error) {
        this.logger.error(
          `Error calculate delivery fee: ${error.message}`,
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

      const plainData = instanceToPlain(docData) as DeliveryFeeEntity;

      await this.deliveryFeeRepository.create(plainData);
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
