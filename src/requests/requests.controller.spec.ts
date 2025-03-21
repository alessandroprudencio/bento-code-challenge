import { RequestsController } from './requests.controller';
import { QueryLastRequestsDto } from './dto/query-last-requests.dto';
import { LastRequestsResponseDto } from './dto/last-requests-response.dto';
import { TestingModule, Test } from '@nestjs/testing';
import { RequestsService } from './requests.service';

describe('RequestsController', () => {
  let controller: RequestsController;

  const mockRequestsService = {
    getLastRequests: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestsController],
      providers: [
        {
          provide: RequestsService,
          useValue: mockRequestsService,
        },
      ],
    }).compile();

    controller = module.get<RequestsController>(RequestsController);
    //   service = module.get<RequestsService>(RequestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getLastRequests', () => {
    it('should call RequestsService.getLastRequests with correct parameters', async () => {
      const query: QueryLastRequestsDto = { limit: 10 };
      const response: LastRequestsResponseDto[] = [
        {
          originalFee: 5.8,
          newFee: 6.55,
          deliveryTime: 0,
          distanceMeters: 0.01,
          coordinates: {
            addressFrom: {
              lat: 19.3331008,
              lng: -81.3801101,
            },
            addressTo: {
              lat: 19.3331008,
              lng: -81.3801101,
            },
          },
          userUUID: 'qyLNDxGpyGaNXWSnYJqK6vibKff1',
          merchantID: '8JbEqL0RTgHfRREvtSuO',
          timestamp: '2025-03-21T00:05:54.835Z',
          userAgent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        },
      ];

      mockRequestsService.getLastRequests.mockResolvedValue(response);

      const result = await controller.getLastRequests(query);
      expect(mockRequestsService.getLastRequests).toHaveBeenCalledWith(query);
      expect(result).toEqual(response);
    });
  });
});
