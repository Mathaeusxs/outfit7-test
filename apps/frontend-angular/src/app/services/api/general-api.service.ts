import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { CountryInfo } from "@libs/types";
import { environment } from "@environment";

@Injectable({ providedIn: "root" })
export class GeneralApiService {
  private apiUrl = `${environment.apiPath}/general`;

  constructor(private http: HttpClient) {}

  ipAuth() {
    return this.http.get<CountryInfo>(`${this.apiUrl}/ip-auth`);
  }
}
