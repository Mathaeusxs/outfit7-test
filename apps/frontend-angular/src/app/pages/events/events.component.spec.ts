import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { of } from "rxjs";

import { EventsComponent } from "./events.component";
import { EventsStoreService } from "@app/store/services";
import { PrimeNgGeneralModule } from "@app/modules";
import { MainService } from "@app/services";

describe("EventsComponent", () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;
  let mockEventsStoreService: jest.Mocked<Partial<EventsStoreService>>;

  beforeEach(async () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    mockEventsStoreService = {
      allEvents$: of([]),
      loadEvents: jest.fn(),
      createEvent: jest.fn(),
      updateEvent: jest.fn(),
      deleteEvent: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PrimeNgGeneralModule],
      declarations: [EventsComponent],
      providers: [
        MessageService,
        ConfirmationService,
        DialogService,
        MainService,
        { provide: EventsStoreService, useValue: mockEventsStoreService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
