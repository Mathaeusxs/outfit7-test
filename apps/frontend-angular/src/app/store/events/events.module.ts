import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import * as store from "./events.reducer";
import { EventsEffects } from "./events.effects";
import { EventsStoreService } from "./events.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("events", store.eventsReducer),
    EffectsModule.forFeature([EventsEffects]),
  ],
  providers: [EventsStoreService],
})
export class EventsStoreModule {}
