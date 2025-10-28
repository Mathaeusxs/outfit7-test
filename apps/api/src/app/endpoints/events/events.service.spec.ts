import { Test, TestingModule } from "@nestjs/testing";
import { EventsService } from "./events.service";
import { EventsRepository } from "@libs/data-repo";
import { CreateEventDto, UpdateEventDto } from "./events.dto";
import { Event, EventType } from "@libs/types";

describe("EventsService", () => {
  let service: EventsService;
  let repository: Partial<Record<keyof EventsRepository, jest.Mock>>;

  beforeEach(async () => {
    repository = {
      find: jest.fn(),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        { provide: EventsRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it("should find all events", async () => {
    const events: Event[] = [
      {
        id: 1,
        name: "Test",
        description: "",
        type: EventType.App,
        priority: 1,
      },
    ];
    repository.find.mockResolvedValue(events);

    const result = await service.findAll();
    expect(result).toEqual(events);
    expect(repository.find).toHaveBeenCalled();
  });

  it("should find one event by id", async () => {
    const event: Event = {
      id: 1,
      name: "Test",
      description: "",
      type: EventType.App,
      priority: 1,
    };
    repository.findOneBy.mockResolvedValue(event);

    const result = await service.findOne(1);
    expect(result).toEqual(event);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it("should create an event", async () => {
    const dto: CreateEventDto = {
      name: "Test",
      description: "",
      type: EventType.App,
      priority: 1,
    } as any;
    const createdEvent: Event = { id: 1, ...dto };

    repository.create.mockReturnValue(dto);
    repository.save.mockResolvedValue(createdEvent);

    const result = await service.createOne(dto);
    expect(result).toEqual(createdEvent);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(dto);
  });

  it("should update an event", async () => {
    const updateDto: UpdateEventDto = { name: "Updated" } as Partial<Event>;
    const updatedEvent: Event = {
      id: 1,
      name: "Updated",
      description: "",
      type: EventType.App,
      priority: 1,
    };

    repository.update.mockResolvedValue(undefined);
    repository.findOneBy.mockResolvedValue(updatedEvent);

    const result = await service.updateOne(1, updateDto);
    expect(result).toEqual(updatedEvent);
    expect(repository.update).toHaveBeenCalledWith(1, updateDto);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it("should delete an event", async () => {
    repository.delete.mockResolvedValue(undefined);

    await service.removeOne(1);
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
