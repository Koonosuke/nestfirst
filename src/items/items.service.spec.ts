import { Test } from '@nestjs/testing';
import { Item, ItemStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ItemsService } from './items.service';

const mockPrismaService = {
  item: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};
describe('ItemsService', () => {
  let itemsService;
  let prismaService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();
    itemsService = module.get<ItemsService>(ItemsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  describe('findAll', () => {
    it('正常系', async () => {
      prismaService.item.findMany.mockResolvedValue([]);
      const expected = [];
      const result = await itemsService.findAll();
      expect(result).toEqual(expected);
    });
  });
  describe('findById', () => {
    it('正常系', async () => {
      const item: Item = {
        id: 'test-id1',
        name: 'test-item1',
        price: 100,
        description: '',
        status: ItemStatus.ON_SALE,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        userId: 'test-user1',
      };
      prismaService.item.findUnique.mockResolvedValue(item);
      const result = await itemsService.findById('test-id1');
      expect(result).toEqual(item);
      expect(prismaService.item.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'test-id1',
        },
      });
    });
  });
});
