import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { EventEditComponent } from "./event-edit.component";

describe("EventEditComponent", () => {
  let component: EventEditComponent;
  let fixture: ComponentFixture<EventEditComponent>;
  let mockDialogRef: jest.Mocked<DynamicDialogRef>;

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [EventEditComponent],
      providers: [{ provide: DynamicDialogRef, useValue: mockDialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(EventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
