import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Item } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
@Controller('items')
export class ItemsController {
  constructor(private readonly ItemsService: ItemsService) {}
  @Get()
  async findAll(): Promise<Item[]> {
    return await this.ItemsService.findAll();
  }
  @Get(':id') // item/test1→IDはtest1となる
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.ItemsService.findById(id);
  }
  @Post()
  async create(@Body() CreateItemDto: CreateItemDto): Promise<Item> {
    return await this.ItemsService.create(CreateItemDto);
  }
  @Put(':id')
  async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.ItemsService.updateStatus(id);
  }
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.ItemsService.delete(id);
  }
}
