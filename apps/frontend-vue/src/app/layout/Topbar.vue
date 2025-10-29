<script setup lang="ts">
import { defineEmits, inject, computed } from "vue";
import Button from "primevue/button";
import SplitButton from "primevue/splitbutton";
import type { CountryInfo } from "@libs/types";

const emit = defineEmits<{
  menuToggle: [];
}>();

const onMenuClick = () => {
  emit("menuToggle");
};

const appState = inject<{ countryInfo: CountryInfo | null }>("appState")!;
const forceSetCountry =
  inject<(code: string, enableAds?: boolean) => void>("forceSetCountry")!;

const currentCountryLabel = computed(
  () => appState.countryInfo?.countryCode ?? "—",
);

const countryItems = [
  {
    label: "Fake US (ads on)",
    command: () => forceSetCountry("US", true),
  },
  {
    label: "Fake SI (ads off)",
    command: () => forceSetCountry("SI", false),
  },
];
</script>

<template>
  <header
    class="flex h-16 items-center justify-between bg-white px-6 shadow-md"
  >
    <!-- Left Side -->
    <div class="flex items-center gap-4">
      <Button
        icon="pi pi-bars"
        text
        class="lg:hidden"
        @click="onMenuClick"
        aria-label="Toggle menu"
      />
      <a href="/" class="flex items-center gap-2">
        <span class="text-primary-600 text-2xl font-bold">Events7 - Vue</span>
      </a>
    </div>

    <!-- Right Side -->
    <div class="flex items-center gap-4">
      <SplitButton
        icon="pi pi-globe"
        :label="currentCountryLabel"
        :model="countryItems"
        severity="secondary"
        text
      />
    </div>
  </header>
</template>
