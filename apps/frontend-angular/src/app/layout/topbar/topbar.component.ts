import { Component, EventEmitter, Output } from "@angular/core";
import { MainService } from "@app/services";
import { MenuItem } from "primeng/api";
@Component({
  standalone: false,
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrl: "./topbar.component.scss",
})
export class TopbarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  items: MenuItem[] = [
    {
      label: "Fake SI",
      command: () =>
        this.mainService.country.set({
          countryCode: "Fake SI",
          enableAds: false,
        }),
    },
    {
      label: "Fake US",
      command: () =>
        this.mainService.country.set({
          countryCode: "Fake US",
          enableAds: true,
        }),
    },
  ];

  constructor(public mainService: MainService) {}

  onMenuClick() {
    this.menuToggle.emit();
  }
}
