import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const eventsController = app.get<EventsController>(EventsController);
      expect(eventsController.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
