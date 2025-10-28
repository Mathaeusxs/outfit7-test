export enum EventType {
  Crosspromo = "crosspromo",
  Liveops = "liveops",
  App = "app",
  Ads = "ads",
}

export interface Event {
  id: number;
  name: string;
  description: string;
  type: EventType;
  priority: number;
}
