<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import { RouterView } from "vue-router";
import Topbar from "./layout/Topbar.vue";
import Sidebar from "./layout/Sidebar.vue";
import Footer from "./layout/Footer.vue";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";
import DynamicDialog from "primevue/dynamicdialog";
import { appState, fetchCountryInfo, forceSetCountry } from "./state";

const sidebarOpen = ref(false);

const onToggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

onMounted(() => {
  fetchCountryInfo();
});

provide("appState", appState);
provide("forceSetCountry", forceSetCountry);
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Fixed Topbar -->
    <Topbar
      @menuToggle="onToggleSidebar"
      class="fixed top-0 right-0 left-0 z-20"
    />

    <!-- Main Content -->
    <div class="mt-16 flex flex-1">
      <!-- Sidebar -->
      <Sidebar v-model:open="sidebarOpen" />

      <!-- Main Content -->
      <div class="ml-0 flex flex-1 flex-col transition-all duration-300">
        <div class="flex-1 p-6">
          <RouterView />
        </div>
        <Footer />
      </div>
    </div>
  </div>

  <Toast position="bottom-right" />
  <ConfirmDialog />
  <DynamicDialog />
</template>

<style scoped lang="scss"></style>
