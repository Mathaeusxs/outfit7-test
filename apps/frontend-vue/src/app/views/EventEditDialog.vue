<script setup lang="ts">
import { ref, computed, onMounted, inject, Ref } from "vue";
import type { DynamicDialogInstance } from "primevue/dynamicdialogoptions";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import { EventTypes, type CountryInfo } from "@libs/types";

const dialogRef = inject<Ref<DynamicDialogInstance>>("dialogRef")!;
const appState = inject<{ countryInfo: CountryInfo | null }>("appState")!;

const form = ref<{
  name: string;
  description: string;
  type: EventTypes;
  priority: number;
}>({
  name: "",
  description: "",
  type: EventTypes.App,
  priority: 5,
});

onMounted(() => {
  const newVal = dialogRef.value.data?.data;
  if (newVal) {
    form.value = {
      name: newVal.name ?? "",
      description: newVal.description ?? "",
      type: newVal.type ?? EventTypes.App,
      priority: newVal.priority ?? 5,
    };
  }
});

const isAdsEnabled = computed(() => appState.countryInfo?.enableAds !== false);

const typeOptions = computed(() => {
  let values = Object.values(EventTypes) as EventTypes[];
  const tmp = values.map((t) => ({
    label: t,
    value: t,
    disabled: t === EventTypes.Ads && !isAdsEnabled.value,
  }));
  return tmp;
});

const isValid = computed(
  () =>
    !!form.value.name &&
    !!form.value.description &&
    !!form.value.type &&
    form.value.priority != null,
);

function onSave() {
  if (!isValid.value) return;
  dialogRef.value.close({ ...form.value });
}

function onCancel() {
  dialogRef.value.close();
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium">Name</label>
      <InputText v-model="form.name" placeholder="Event name" />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium">Description</label>
      <Textarea
        v-model="form.description"
        auto-resize
        rows="3"
        placeholder="Event description"
      />
    </div>
    <div class="flex gap-4">
      <div class="flex flex-1 flex-col gap-2">
        <label class="text-sm font-medium">Type</label>
        <Select
          v-model="form.type"
          :options="typeOptions"
          :option-disabled="(option) => option.disabled"
          optionLabel="label"
          optionValue="value"
          placeholder="Select type"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium">Priority</label>
        <InputNumber v-model="form.priority" :min="0" :max="10" showButtons />
      </div>
    </div>

    <div class="flex justify-end gap-2 pt-2">
      <Button label="Cancel" severity="secondary" text @click="onCancel" />
      <Button label="Save" :disabled="!isValid" @click="onSave" />
    </div>
  </div>
</template>
