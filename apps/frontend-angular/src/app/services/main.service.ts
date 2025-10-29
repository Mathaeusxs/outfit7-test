import { Injectable, signal } from "@angular/core";

import { CountryInfo } from "@libs/types";

@Injectable({ providedIn: "root" })
export class MainService {
  // Kinda auth implementation for testing purposes
  country = signal<CountryInfo | null>(null);
}
