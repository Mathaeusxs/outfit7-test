import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  standalone: false,
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      label: "Home",
      items: [
        {
          label: "Dashboard",
          icon: "pi pi-fw pi-home",
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
