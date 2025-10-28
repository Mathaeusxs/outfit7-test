import { Component } from "@angular/core";

@Component({
  standalone: false,
  selector: "app-layout",
  templateUrl: "./layout.component.html",
})
export class LayoutComponent {
  sidebarOpen = false;

  onToggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
