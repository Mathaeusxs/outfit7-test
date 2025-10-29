import { Component } from "@angular/core";
import { MainService } from "./services";

@Component({
  standalone: false,
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  constructor(public mainService: MainService) {}
}
