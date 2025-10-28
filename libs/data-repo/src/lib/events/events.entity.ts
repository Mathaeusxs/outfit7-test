import { Event, EventType } from "@libs/types";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("events")
export class EventsEntity implements Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: EventType,
  })
  type: EventType;

  @Column()
  priority: number;
}
