export enum EventTypes {
  Crosspromo = "crosspromo",
  Liveops = "liveops",
  App = "app",
  Ads = "ads",
}

export interface Event {
  id: number;
  name: string;
  description: string;
  type: EventTypes;
  priority: number;
}
