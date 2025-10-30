import { Component, OnInit } from "@angular/core";
import { MainService } from "./services";

@Component({
  standalone: false,
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  progress = 0;

  constructor(public mainService: MainService) {}

  ngOnInit() {
    const progressInterval = setInterval(() => {
      this.progress += 100 / 10;
      if (this.progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 1000);
  }
}
