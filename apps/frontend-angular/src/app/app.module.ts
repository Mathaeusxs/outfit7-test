import { makeEnvironmentProviders, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";

import { appConfig } from "./app.config";
import { AppRoutingModule } from "./app.routes";
import { AppLayoutModule } from "./layout/layout.module";

import { AppComponent } from "./app.component";
import { ConfirmationService, MessageService } from "primeng/api";
import { EventsStoreModule } from "./store/events/events.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ErrorInterceptor } from "./guards/error.interceptor";

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    AppLayoutModule,

    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      },
    ),
    EffectsModule.forRoot(),
    EventsStoreModule,
  ],
  providers: [
    makeEnvironmentProviders(appConfig.providers || []),
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class AppModule {}
