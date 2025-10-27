import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Event } from "@libs/types";
import { eventsActions } from "./events.actions";

export interface EventsState extends EntityState<Event> {
  loading: boolean;
  error: string | null;
}

export const eventsAdapter: EntityAdapter<Event> = createEntityAdapter<Event>();

export const initialState: EventsState = eventsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const eventsReducer = createReducer(
  initialState,

  // Load Events
  on(eventsActions.loadEvents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(eventsActions.loadEventsSuccess, (state, { events }) =>
    eventsAdapter.setAll(events, {
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(eventsActions.loadEventsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Single Event
  on(eventsActions.loadEvent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(eventsActions.loadEventSuccess, (state, { event }) =>
    eventsAdapter.upsertOne(event, {
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(eventsActions.loadEventFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Event
  on(eventsActions.createEvent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(eventsActions.createEventSuccess, (state, { event }) =>
    eventsAdapter.addOne(event, {
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(eventsActions.createEventFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Event
  on(eventsActions.updateEvent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(eventsActions.updateEventSuccess, (state, { event }) =>
    eventsAdapter.updateOne(
      { id: event.id, changes: event },
      {
        ...state,
        loading: false,
        error: null,
      },
    ),
  ),
  on(eventsActions.updateEventFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Event
  on(eventsActions.deleteEvent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(eventsActions.deleteEventSuccess, (state, { id }) =>
    eventsAdapter.removeOne(id, {
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(eventsActions.deleteEventFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
