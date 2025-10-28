import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { EventsEntity } from "./events.entity";

@Injectable()
export class EventsRepository extends Repository<EventsEntity> {
  constructor(private dataSource: DataSource) {
    super(EventsEntity, dataSource.createEntityManager());
  }
}
