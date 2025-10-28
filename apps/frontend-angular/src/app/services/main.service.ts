import { Injectable, signal } from "@angular/core";

import { CountryInfo } from "@libs/types";

@Injectable({ providedIn: "root" })
export class MainService {
  country = signal<CountryInfo | null>(null);
}
