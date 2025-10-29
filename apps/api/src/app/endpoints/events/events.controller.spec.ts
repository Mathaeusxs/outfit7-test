import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";
import { CreateEventDto, UpdateEventDto } from "./events.dto";
import { EventTypes } from "@libs/types";

describe("EventsController (integration)", () => {
  let app: INestApplication;
  let eventsService: Partial<EventsService>;

  beforeAll(async () => {
    eventsService = {
      findAll: jest.fn().mockResolvedValue([{ id: 1, name: "Event 1" }]),
      findOne: jest.fn().mockResolvedValue({ id: 1, name: "Event 1" }),
      createOne: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
      updateOne: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
      removeOne: jest.fn().mockResolvedValue(undefined),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [{ provide: EventsService, useValue: eventsService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("/GET events", async () => {
    const response = await request(app.getHttpServer())
      .get("/events")
      .expect(200);

    expect(response.body).toEqual([{ id: 1, name: "Event 1" }]);
    expect(eventsService.findAll).toHaveBeenCalledTimes(1);
  });

  it("/GET events/:id", async () => {
    const response = await request(app.getHttpServer())
      .get("/events/1")
      .expect(200);

    expect(response.body).toEqual({ id: 1, name: "Event 1" });
    expect(eventsService.findOne).toHaveBeenCalledWith(1);
  });

  it("/POST events", async () => {
    const dto: CreateEventDto = {
      name: "New Event",
      description: "Event Description",
      type: EventTypes.App,
      priority: 1,
    };

    const response = await request(app.getHttpServer())
      .post("/events")
      .send(dto)
      .expect(201);

    expect(response.body).toEqual({ id: 1, ...dto });
    expect(eventsService.createOne).toHaveBeenCalledWith(dto);
  });

  it("/PATCH events/:id", async () => {
    const dto: Partial<UpdateEventDto> = { name: "Updated Event" };

    const response = await request(app.getHttpServer())
      .patch("/events/1")
      .send(dto)
      .expect(200);

    expect(response.body).toEqual({ id: 1, ...dto });
    expect(eventsService.updateOne).toHaveBeenCalledWith(1, dto);
  });

  it("/DELETE events/:id", async () => {
    await request(app.getHttpServer()).delete("/events/1").expect(200);
    expect(eventsService.removeOne).toHaveBeenCalledWith(1);
  });
});
