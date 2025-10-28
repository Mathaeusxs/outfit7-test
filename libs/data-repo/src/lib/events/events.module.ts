import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsEntity } from "./events.entity";
import { EventsRepository } from "./events.repository";

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity])],
  providers: [EventsRepository],
  exports: [EventsRepository],
})
export class EventsDataModule {}
