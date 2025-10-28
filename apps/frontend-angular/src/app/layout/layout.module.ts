import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MainNgModule } from "../modules/main-ng.module";

import { LayoutComponent } from "./layout.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PrimeNgGeneralModule } from "../modules/prime-ng.module";

@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [MainNgModule, RouterModule, PrimeNgGeneralModule],
  providers: [],
})
export class AppLayoutModule {}
