import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { DeliveryFeePayloadDto } from './dto/delivery-fee-payload.dto';
import { DeliveryFeeResponseDto } from './dto/delivery-fee-response.dto';
import { Request } from 'express';

describe('DeliveryController', () => {
  let controller: DeliveryController;

  const mockService = {
    calculateDeliveryFee: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [
        {
          provide: DeliveryService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<DeliveryController>(DeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /delivery/fee', () => {
    it('should return calculated fee with 201 status', async () => {
      const mockRequest = {
        headers: { 'user-agent': 'test-agent' },
      } as Request;
      const mockBody: DeliveryFeePayloadDto = {
        user: { uuid: '123' },
        merchant: { id: '1231' },
        addressTo: {
          coordinatesAdjustment: {
            lat: 19.3331008,
            lng: -81.3801101,
          },
        },
        addressFrom: {
          coordinates: {
            lat: 19.3331008,
            lng: -81.3801101,
          },
        },
      };
      const expectedResponse: DeliveryFeeResponseDto = {
        originalFee: 10.5,
        newFee: 12.3,
        deliveryTime: 30,
        distanceMeters: 1500,
        message: null,
      };

      mockService.calculateDeliveryFee.mockResolvedValue(expectedResponse);

      const result = await controller.calculateDeliveryFee(
        mockBody,
        mockRequest,
      );

      expect(result).toEqual(expectedResponse);
      expect(mockService.calculateDeliveryFee).toHaveBeenCalledWith(
        mockRequest,
        mockBody,
      );
    });
  });
});
