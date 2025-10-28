import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto, UpdateEventDto } from "./events.dto";
import { ApiTags, ApiBody, ApiParam } from "@nestjs/swagger";

@ApiTags("Events")
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async findAll() {
    return await this.eventsService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", type: Number, description: "Event ID" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.eventsService.findOne(id);
  }

  @Post()
  @ApiBody({ type: CreateEventDto })
  async createOne(@Body() event: CreateEventDto) {
    return await this.eventsService.createOne(event);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: Number, description: "Event ID" })
  @ApiBody({ type: UpdateEventDto })
  async updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() event: UpdateEventDto,
  ) {
    return await this.eventsService.updateOne(id, event);
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: Number, description: "Event ID" })
  async removeOne(@Param("id", ParseIntPipe) id: number) {
    return await this.eventsService.removeOne(id);
  }
}
