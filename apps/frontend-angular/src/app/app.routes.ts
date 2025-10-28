import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { IpAuthGuard } from "./guards/ip-auth.guard";

export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "events",
    pathMatch: "full",
  },
  {
    path: "",
    component: LayoutComponent,
    canActivate: [IpAuthGuard],
    children: [
      {
        path: "events",
        loadChildren: () =>
          import("./pages/events/events.module").then((m) => m.EventsModule),
      },
      {
        path: "about",
        loadComponent: () =>
          import("./pages/about/about.component").then((m) => m.AboutComponent),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      paramsInheritanceStrategy: "always",
      useHash: true,
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
