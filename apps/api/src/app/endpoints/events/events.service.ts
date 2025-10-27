import { EventsRepository } from '@libs/data-repo';
import { Injectable } from '@nestjs/common';
import { CreateEventDto, UpdateEventDto } from './events.dto';

@Injectable()
export class EventsService {

  constructor(private readonly eventsRepository: EventsRepository) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async findAll() {
    return this.eventsRepository.find();
  }

  async findOne(id: number) {
    return this.eventsRepository.findOneBy({ id });
  }

  async createOne(data: CreateEventDto) {
    const user = this.eventsRepository.create(data);
    return this.eventsRepository.save(user);
  }

  async updateOne(id: number, updateData: UpdateEventDto) {
    await this.eventsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async removeOne(id: number): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
