import { Module } from "@nestjs/common";
import { GeneralController } from "./general.controller";
import { GeneralService } from "./general.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [GeneralController],
  providers: [GeneralService],
})
export class GeneralModule {}
