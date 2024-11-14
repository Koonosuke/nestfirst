import { Injectable, NotFoundException } from '@nestjs/common';
import { Item, ItemStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

import { CreateItemDto } from './dto/create-item.dto';
@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}
  // private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.prismaService.item.findUnique({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(CreateItemDto: CreateItemDto): Promise<Item> {
    const { name, price, description } = CreateItemDto;
    return await this.prismaService.item.create({
      data: {
        name,
        price,
        description,
        status: ItemStatus.ON_SALE,
        userId: '',
      },
    });
  }
  async updateStatus(id: string): Promise<Item> {
    return await this.prismaService.item.update({
      data: {
        status: `SOLD_OUT`,
      },
      where: {
        id,
      },
    });
  }
  // asyncupdateStatus(id: string): Item {
  //   const item = this.findById(id);
  //   item.status = 'SOLD_OUT';
  //   return item;
  // }
  async delete(id: string) {
    await this.prismaService.item.delete({
      where: { id },
    });
  }
}
