import { emptyProps, props } from "@ngrx/store";
import { Event } from "@libs/types";
import { createActionGroup } from "@ngrx/store";

export const eventsActions = createActionGroup({
  source: "Events",
  events: {
    "Load Events": emptyProps(),
    "Load Events Success": props<{ events: Event[] }>(),
    "Load Events Failure": props<{ error: string }>(),

    "Load Event": props<{ id: number }>(),
    "Load Event Success": props<{ event: Event }>(),
    "Load Event Failure": props<{ error: string }>(),

    "Create Event": props<{ event: Event }>(),
    "Create Event Success": props<{ event: Event }>(),
    "Create Event Failure": props<{ error: string }>(),

    "Update Event": props<{ id: number; event: Event }>(),
    "Update Event Success": props<{ event: Event }>(),
    "Update Event Failure": props<{ error: string }>(),

    "Delete Event": props<{ id: number }>(),
    "Delete Event Success": props<{ id: number }>(),
    "Delete Event Failure": props<{ error: string }>(),
  },
});
