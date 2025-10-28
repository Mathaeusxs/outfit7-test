import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EventsModule } from "./endpoints/events/events.module";
import { DbDetails } from "../environments/db-info";
import { GeneralModule } from "./endpoints/general/general.module";
@Module({
  imports: [TypeOrmModule.forRoot(DbDetails), EventsModule, GeneralModule],
})
export class AppModule {}
