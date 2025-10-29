import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MessageService, ConfirmationService } from "primeng/api";

import { LayoutComponent } from "./layout.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PrimeNgGeneralModule } from "@app/modules";
import { RouterModule } from "@angular/router";

describe("LayoutComponent", () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    // Mock window.matchMedia for PrimeNG components
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

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), PrimeNgGeneralModule],
      declarations: [
        LayoutComponent,
        TopbarComponent,
        SidebarComponent,
        FooterComponent,
      ],
      providers: [MessageService, ConfirmationService],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
