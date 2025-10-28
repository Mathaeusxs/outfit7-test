import { Component, Input, model } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  standalone: false,
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  open = model(false);

  menuItems: MenuItem[] = [
    {
      label: "Home",
      items: [
        {
          label: "Events",
          icon: "pi pi-fw pi-calendar",
          routerLink: ["/events"],
        },
      ],
    },
    {
      label: "General",
      items: [
        {
          label: "About",
          icon: "pi pi-fw pi-info-circle",
          routerLink: ["/about"],
        },
      ],
    },
  ];
}
