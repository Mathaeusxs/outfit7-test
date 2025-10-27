import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Event } from "@libs/types";
import { pColumn } from "@app/types";
import { EventsStoreService } from "@app/store/services";
import { firstValueFrom } from "rxjs";
import { DialogService } from "primeng/dynamicdialog";
import { EventEditComponent } from "./event-edit/event-edit.component";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrl: "./events.component.scss",
  standalone: false,
})
export class EventsComponent implements OnInit {
  data$ = this.eventsStoreService.allEvents$;
  cols: pColumn[];

  displayEditDialog = false;
  editData: Event;
  editMode = false;

  constructor(
    private eventsStoreService: EventsStoreService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
  ) {}

  exportCSV() {
    /*   this.dt.exportCSV(); */
  }

  ngOnInit() {
    this.cols = [
      { field: "id", header: "Id" },
      { field: "name", header: "Name" },
      { field: "type", header: "Type" },
      { field: "description", header: "Description" },
      { field: "priority", header: "Priority" },
    ];

    this.loadData();
  }

  private loadData() {
    this.eventsStoreService.loadEvents();
  }

  openEdit(item?: Event) {
    const ref = this.dialogService.open(EventEditComponent, {
      header: item ? "Edit Event: " + item.name : "New Event",
      inputValues: {
        data: item || {},
        editMode: !!item,
      },
      modal: true,
      width: "40vw",
    });

    if (!ref) return;

    ref.onClose.subscribe(async (result: Event) => {
      if (result) {
        let resp: Event | null = null;
        if (item) {
          // Edit mode
          resp = await firstValueFrom(
            this.eventsStoreService.updateEvent(item.id, result),
          );
        } else {
          // New item
          resp = await firstValueFrom(
            this.eventsStoreService.createEvent(result),
          );
        }

        if (resp == null) return;

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: item ? "Item Updated" : "Item Created",
          life: 3000,
        });

        this.loadData();
      }
    });
  }

  deleteItem(item: Event) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + item.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      rejectButtonProps: {
        label: "No",
        severity: "secondary",
        variant: "text",
      },
      acceptButtonProps: {
        severity: "danger",
        label: "Yes",
      },
      accept: async () => {
        const resp = await firstValueFrom(
          this.eventsStoreService.deleteEvent(item.id),
        );
        if (resp == null) return;

        this.loadData();

        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Item Deleted",
          life: 3000,
        });
      },
    });
  }
}
