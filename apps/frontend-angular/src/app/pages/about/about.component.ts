import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MarkdownComponent,
  provideMarkdown,
  MARKED_OPTIONS,
} from "ngx-markdown";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.scss",
  imports: [CommonModule, MarkdownComponent],
  providers: [
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
        },
      },
    }),
  ],
})
export class AboutComponent {}
