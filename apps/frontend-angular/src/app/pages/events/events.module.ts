import { NgModule } from "@angular/core";
import { EventsComponent } from "./events.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { PrimeNgGeneralModule } from "@app/modules";
import { EventsApiService } from "../../services/api/data/events-api.service";
import { DialogService } from "primeng/dynamicdialog";

const routes: Routes = [
  {
    path: "",
    component: EventsComponent,
  },
];

@NgModule({
  declarations: [EventsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), PrimeNgGeneralModule],
  providers: [EventsApiService, DialogService],
})
export class EventsModule {}
