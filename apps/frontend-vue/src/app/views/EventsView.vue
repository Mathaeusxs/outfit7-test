<script setup lang="ts">
import { ref, onMounted, inject, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { useDialog } from "primevue/usedialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import axios from "axios";
import EventEditDialog from "./EventEditDialog.vue";
import { Event, EventTypes, type CountryInfo } from "@libs/types";

const toast = useToast();
const confirm = useConfirm();
const dialog = useDialog();

const events = ref<Event[]>([]);
const globalFilterValue = ref("");

const appState = inject<{ countryInfo: CountryInfo | null }>("appState")!;
const isAdsAllowed = computed(() => appState.countryInfo?.enableAds !== false);

const columns = [
  { field: "id", header: "Id" },
  { field: "name", header: "Name" },
  { field: "type", header: "Type" },
  { field: "description", header: "Description" },
  { field: "priority", header: "Priority" },
];

async function loadData() {
  try {
    const response = await axios.get<Event[]>("/api/events");
    events.value = response.data;
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load events",
      life: 3000,
    });
  }
}

function openEdit(event?: Event) {
  const editMode = !!event;
  dialog.open(EventEditDialog, {
    props: {
      header: event ? `Edit Event: ${event.name}` : "New Event",
      modal: true,
      style: { width: "40vw" },
    },
    data: {
      editMode,
      data: event ?? null,
    },
    onClose: async (options) => {
      const result = options?.data;
      if (!result) return;

      try {
        if (editMode && event?.id != null) {
          await axios.patch<Event>(`/api/events/${event.id}`, result);
        } else {
          await axios.post<Event>(`/api/events`, result);
        }

        toast.add({
          severity: "success",
          summary: "Successful",
          detail: editMode ? "Item Updated" : "Item Created",
          life: 3000,
        });
        await loadData();
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: `Failed to ${editMode ? "update" : "create"} event`,
          life: 3000,
        });
      }
    },
  });
}

function deleteEvent(event: Event) {
  confirm.require({
    message: `Are you sure you want to delete ${event.name}?`,
    header: "Confirm",
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      label: "No",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Yes",
      severity: "danger",
    },
    accept: async () => {
      try {
        await axios.delete(`/api/events/${event.id}`);
        toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Event Deleted",
          life: 3000,
        });
        loadData();
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete event",
          life: 3000,
        });
      }
    },
  });
}

// Same as OnInit
onMounted(() => {
  loadData();
});
</script>

<template>
  <div>
    <h2 class="mb-4 text-2xl font-bold">Events</h2>

    <Toolbar class="mb-6">
      <template #start>
        <Button
          label="New"
          icon="pi pi-plus"
          class="mr-2"
          @click="openEdit()"
        />
      </template>

      <template #end>
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText
            v-model="globalFilterValue"
            type="text"
            placeholder="Search..."
          />
        </IconField>
      </template>
    </Toolbar>

    <DataTable
      :value="events"
      :rows="10"
      :paginator="true"
      :global-filter-fields="['id', 'name', 'description', 'type', 'priority']"
      :row-hover="true"
      data-key="id"
      current-page-report-template="Showing {first} to {last} of {totalRecords} entries"
      :show-current-page-report="true"
      :global-filter="globalFilterValue"
      class="p-datatable-sm"
    >
      <Column style="width: 4rem">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              severity="info"
              :disabled="!isAdsAllowed && data.type === EventTypes.Ads"
              @click="openEdit(data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              :disabled="!isAdsAllowed && data.type === EventTypes.Ads"
              @click="deleteEvent(data)"
            />
          </div>
        </template>
      </Column>

      <Column
        v-for="col in columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="true"
      >
      </Column>
    </DataTable>
  </div>
</template>
