import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Event } from "@libs/types";
import { Actions, ofType } from "@ngrx/effects";
import { map } from "rxjs";

import { eventsActions } from "./events.actions";
import { eventSelectors } from "./events.selectors";

@Injectable({
  providedIn: "root",
})
export class EventsStoreService {
  allEvents$ = this.store.select(eventSelectors.getAll);

  loading$ = this.store.select(eventSelectors.getLoading);
  error$ = this.store.select(eventSelectors.getError);

  constructor(
    private store: Store,
    private actions$: Actions,
  ) {}

  loadEvents() {
    this.store.dispatch(eventsActions.loadEvents());
    return this.actions$.pipe(
      ofType(eventsActions.loadEventsSuccess, eventsActions.loadEventsFailure),
      map((action) =>
        action.type === eventsActions.loadEventsSuccess.type
          ? action.events
          : null,
      ),
    );
  }

  loadEvent(id: number) {
    this.store.dispatch(eventsActions.loadEvent({ id }));
    return this.actions$.pipe(
      ofType(eventsActions.loadEventSuccess, eventsActions.loadEventFailure),
      map((action) =>
        action.type === eventsActions.loadEventSuccess.type
          ? action.event
          : null,
      ),
    );
  }

  createEvent(event: Event) {
    this.store.dispatch(eventsActions.createEvent({ event }));
    return this.actions$.pipe(
      ofType(
        eventsActions.createEventSuccess,
        eventsActions.createEventFailure,
      ),
      map((action) =>
        action.type === eventsActions.createEventSuccess.type
          ? action.event
          : null,
      ),
    );
  }

  updateEvent(id: number, event: Event) {
    this.store.dispatch(eventsActions.updateEvent({ id, event }));
    return this.actions$.pipe(
      ofType(
        eventsActions.updateEventSuccess,
        eventsActions.updateEventFailure,
      ),
      map((action) =>
        action.type === eventsActions.updateEventSuccess.type
          ? action.event
          : null,
      ),
    );
  }

  deleteEvent(id: number) {
    this.store.dispatch(eventsActions.deleteEvent({ id }));
    return this.actions$.pipe(
      ofType(
        eventsActions.deleteEventSuccess,
        eventsActions.deleteEventFailure,
      ),
      map((action) =>
        action.type === eventsActions.deleteEventSuccess.type
          ? action.id
          : null,
      ),
    );
  }

  // Additional selector methods
  getEventById(id: number) {
    return this.store.select(eventSelectors.getById(id));
  }
}
