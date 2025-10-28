import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap, take } from "rxjs/operators";

import { MainService } from "../services/main.service";
import { GeneralApiService } from "../services/api/general-api.service";

/**
 * Guard to ensure IP auth runs once on app start and populates MainService.country.
 * If country already set, it passes immediately.
 * On error, it still allows navigation.
 */
@Injectable({ providedIn: "root" })
export class IpAuthGuard implements CanActivate {
  constructor(
    private mainService: MainService,
    private apiService: GeneralApiService,
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean> {
    const current = this.mainService.country();
    if (current) {
      return of(true);
    }

    return this.apiService.ipAuth().pipe(
      take(1),
      map((country) => {
        this.mainService.country.set(country);
        return true;
      }),
      catchError(() => {
        // Set fake country
        this.mainService.country.set({
          countryCode: "Fake SI",
          enableAds: false,
        });
        return of(true);
      }),
    );
  }
}
