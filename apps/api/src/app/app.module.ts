import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsModule } from './endpoints/events/events.module';
import { DbDetails } from '../environments/db-info';

console.warn(DbDetails);
@Module({
  imports: [
    TypeOrmModule.forRoot(DbDetails),
    EventsModule],
})
export class AppModule {}
