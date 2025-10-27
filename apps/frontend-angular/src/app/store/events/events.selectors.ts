import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventsState, eventsAdapter } from "./events.reducer";

const featureSelector = createFeatureSelector<EventsState>("events");

const { selectAll, selectEntities, selectIds, selectTotal } =
  eventsAdapter.getSelectors();

export const eventSelectors = {
  getIds: createSelector(featureSelector, selectIds),
  getEntities: createSelector(featureSelector, selectEntities),
  getAll: createSelector(featureSelector, selectAll),
  getTotal: createSelector(featureSelector, selectTotal),
  getById: (id: number) =>
    createSelector(featureSelector, (state) => state.entities[id]),
  getError: createSelector(featureSelector, (state) => state.error),
  getLoading: createSelector(featureSelector, (state) => state.loading),
};
