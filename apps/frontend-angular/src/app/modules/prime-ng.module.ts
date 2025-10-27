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

  /*  ThemeSwitcher,
    AvatarModule,
    KeyFilterModule,
    AvatarGroupModule,
    AnimateOnScrollModule,
    TabsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    AutoCompleteModule,
    BadgeModule,
    BreadcrumbModule,
    BlockUIModule,
    DatePickerModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ColorPickerModule,
    ConfirmPopupModule,
    ContextMenuModule,
    DataViewModule,
    DividerModule,
    DrawerModule,
    DockModule,
    DragDropModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    FocusTrapModule,
    GalleriaModule,
    IftaLabelModule,
    InplaceModule,
    InputMaskModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputOtpModule,
    ImageModule,
    ImageCompareModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MultiSelectModule,
    MeterGroupModule,
    OrganizationChartModule,
    OrderListModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
    ScrollerModule,
    ScrollPanelModule,
    ScrollTopModule,
    SkeletonModule,
    SliderModule,
    SpeedDialModule,
    SplitterModule,
    StepperModule,
    SplitButtonModule,
    StepsModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToggleButtonModule,
    ToggleSwitchModule,
    TooltipModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    CardModule,
    RippleModule,
    StyleClassModule,
    FloatLabelModule,
    AutoFocusModule,
    OverlayBadgeModule, */
];

@NgModule({
  imports: [...primengModules],
  exports: [...primengModules],
  providers: [],
})
export class PrimeNgGeneralModule {}
