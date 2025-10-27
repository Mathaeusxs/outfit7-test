import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Event } from "@libs/types";
import { environment } from "@environment";

@Injectable({ providedIn: "root" })
export class EventsApiService {
  private apiUrl = `${environment.apiPath}/events`;

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<Event[]>(this.apiUrl);
  }

  findOne(id: number) {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  create(event: Event) {
    return this.http.post<Event>(this.apiUrl, event);
  }

  update(id: number, event: Event) {
    return this.http.patch<Event>(`${this.apiUrl}/${id}`, event);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
