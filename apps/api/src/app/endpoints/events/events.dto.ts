import { Event, EventType } from "@libs/types";
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsIn, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateEventDto implements Partial<Event> {
  @ApiProperty({ description: "Event name", example: "Action button" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Description" })
  @IsString()
  description: string;

  @ApiProperty({
    description: "Event type",
    enum: EventType,
    example: EventType.Crosspromo,
  })
  @IsIn(Object.values(EventType))
  type: EventType;

  @ApiProperty({
    description: "Priority between 1 and 10",
    minimum: 1,
    maximum: 10,
    example: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  priority: number;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiPropertyOptional({ description: "Event ID", example: "1" })
  @IsNumber()
  id?: number;
}
