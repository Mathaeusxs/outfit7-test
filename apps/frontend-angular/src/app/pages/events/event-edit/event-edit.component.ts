import { Component, input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MainNgModule, PrimeNgGeneralModule } from "@app/modules";
import { EventType, Event } from "@libs/types";
import { DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-event-edit",
  imports: [PrimeNgGeneralModule, MainNgModule],
  templateUrl: "./event-edit.component.html",
  styleUrl: "./event-edit.component.scss",
})
export class EventEditComponent {
  editMode = input(false);
  data = input<Event>();

  form: FormGroup;

  typeOptions = Object.values(EventType);

  constructor(
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      type: [EventType.App, Validators.required],
      priority: [5, Validators.required],
    });

    if (this.editMode() && this.data()) {
      this.form.patchValue({ ...this.data() });
    }
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
