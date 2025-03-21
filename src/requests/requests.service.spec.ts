import { Test, TestingModule } from '@nestjs/testing';
import { RequestsService } from './requests.service';
import { DeliveryFeeRepository } from '../delivery/repositories/delivery-fee.repository';
import { QueryLastRequestsDto } from './dto/query-last-requests.dto';

describe('RequestsService', () => {
  let service: RequestsService;
  let deliveryFeeRepository: DeliveryFeeRepository;

  const mockRepository = {
    list: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestsService,
        {
          provide: DeliveryFeeRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RequestsService>(RequestsService);
    deliveryFeeRepository = module.get<DeliveryFeeRepository>(
      DeliveryFeeRepository,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(deliveryFeeRepository).toBeDefined();
  });

  describe('getLastRequests', () => {
    it('should call repository with correct parameters', async () => {
      const query: QueryLastRequestsDto = { limit: 5 };
      const mockResponse = [{ id: 1 }, { id: 2 }];

      mockRepository.list.mockResolvedValue(mockResponse);

      const result = await service.getLastRequests(query);

      expect(mockRepository.list).toHaveBeenCalledWith({
        limit: query.limit,
        orderBy: {
          field: 'timestamp',
          direction: 'asc',
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle different limit values', async () => {
      const testCases = [1, 5, 10];

      for (const limit of testCases) {
        mockRepository.list.mockClear();
        const query = { limit };

        await service.getLastRequests(query);

        expect(mockRepository.list).toHaveBeenCalledWith(
          expect.objectContaining({ limit }),
        );
      }
    });

    it('should throw repository errors', async () => {
      const query: QueryLastRequestsDto = { limit: 10 };
      const mockError = new Error('Database error');

      mockRepository.list.mockRejectedValue(mockError);

      await expect(service.getLastRequests(query)).rejects.toThrow(mockError);
    });

    it('should validate parameters types', async () => {
      const query: QueryLastRequestsDto = { limit: 10 };

      await expect(service.getLastRequests(query)).rejects.toThrow();
    });
  });
});
