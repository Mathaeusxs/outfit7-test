import { Component, effect, input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MainNgModule, PrimeNgGeneralModule } from "@app/modules";
import { MainService } from "@app/services";
import { EventTypes, Event } from "@libs/types";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-event-edit",
  imports: [PrimeNgGeneralModule, MainNgModule],
  templateUrl: "./event-edit.component.html",
  styleUrl: "./event-edit.component.scss",
})
export class EventEditComponent implements OnInit {
  editMode = input(false);
  data = input<Event>();

  form: FormGroup;

  typeOptions: { label: string; value: EventTypes; disabled?: boolean }[] = [];

  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
  ) {
    effect(() =>
      this.setTypeOptions(this.mainService.country()?.enableAds ?? false),
    );
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      type: [EventTypes.App, Validators.required],
      priority: [5, Validators.required],
    });

    if (this.editMode() && this.data()) {
      this.form.patchValue({ ...this.data() });
    }
  }

  private setTypeOptions(adsEnabled: boolean) {
    this.typeOptions = [];
    Object.values(EventTypes).forEach((type) => {
      const disabled = type === EventTypes.Ads && !adsEnabled;
      this.typeOptions.push({ label: type, value: type, disabled });
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSave() {
    if (this.form.valid) {
      const formValue = this.form.value;
      const result = {
        ...this.data(),
        name: formValue.name,
        description: formValue.description,
        type: formValue.type,
        priority: formValue.priority,
      };
      this.ref.close(result);
    }
  }
}
