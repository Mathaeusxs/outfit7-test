import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EventsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  priority: number;
}
