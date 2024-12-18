import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createEventDto: CreateEventDto) {

  }

  async findAll() {
    return;
  }

  async findByCourse(courseId: number) {
    return this.prisma.event.findMany({ where: { courseId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
