import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsDataModule } from '@lib/data-repo';

@Module({
  imports: [EventsDataModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
