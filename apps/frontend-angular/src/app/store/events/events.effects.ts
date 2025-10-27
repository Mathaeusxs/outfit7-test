import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { EventsApiService } from "../../services/api/data/events-api.service";
import { eventsActions } from "./events.actions";

@Injectable()
export class EventsEffects {
  constructor(
    private actions$: Actions,
    private eventsApi: EventsApiService,
  ) {}

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventsActions.loadEvents),
      switchMap(() =>
        this.eventsApi.findAll().pipe(
          map((events) => eventsActions.loadEventsSuccess({ events })),
          catchError((error) =>
            of(eventsActions.loadEventsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  loadEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventsActions.loadEvent),
      switchMap(({ id }) =>
        this.eventsApi.findOne(id).pipe(
          map((event) => eventsActions.loadEventSuccess({ event })),
          catchError((error) =>
            of(eventsActions.loadEventFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventsActions.createEvent),
      switchMap(({ event }) =>
        this.eventsApi.create(event).pipe(
          map((event) => eventsActions.createEventSuccess({ event })),
          catchError((error) =>
            of(eventsActions.createEventFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  updateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventsActions.updateEvent),
      switchMap(({ id, event }) =>
        this.eventsApi.update(id, event).pipe(
          map((event) => eventsActions.updateEventSuccess({ event })),
          catchError((error) =>
            of(eventsActions.updateEventFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventsActions.deleteEvent),
      switchMap(({ id }) =>
        this.eventsApi.delete(id).pipe(
          map(() => eventsActions.deleteEventSuccess({ id })),
          catchError((error) =>
            of(eventsActions.deleteEventFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
