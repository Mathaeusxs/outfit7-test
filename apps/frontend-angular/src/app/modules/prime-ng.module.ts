import { NgModule } from "@angular/core";

import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialog } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { SelectModule } from "primeng/select";
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TextareaModule } from "primeng/textarea";
import { MessageModule } from "primeng/message";
import { SplitButtonModule } from "primeng/splitbutton";

const primengModules = [
  TableModule,
  ConfirmDialog,
  ToastModule,
  ToolbarModule,
  ButtonModule,
  IconFieldModule,
  InputIconModule,
  SelectModule,
  DialogModule,
  ConfirmDialogModule,
  InputTextModule,
  InputNumberModule,
  TextareaModule,
  DynamicDialogModule,
  MessageModule,
  SplitButtonModule,
];

@NgModule({
  imports: [...primengModules],
  exports: [...primengModules],
  providers: [],
})
export class PrimeNgGeneralModule {}
