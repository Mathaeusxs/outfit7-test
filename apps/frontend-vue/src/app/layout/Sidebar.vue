<script setup lang="ts">
interface MenuItem {
  label: string;
  icon: string;
  routerLink: string;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const menuItems: MenuGroup[] = [
  {
    label: "Home",
    items: [
      {
        label: "Events",
        icon: "pi pi-fw pi-calendar",
        routerLink: "/events",
      },
    ],
  },
  {
    label: "General",
    items: [
      {
        label: "About",
        icon: "pi pi-fw pi-info-circle",
        routerLink: "/about",
      },
    ],
  },
];

const closeSidebar = () => {
  emit("update:open", false);
};
</script>

<template>
  <div
    class="fixed left-0 z-40 h-auto w-64 flex-shrink-0 -translate-x-full transform overflow-y-auto bg-gray-900 text-white transition-transform duration-300 lg:static lg:top-auto lg:h-full lg:translate-x-0"
    :class="{ 'translate-x-0': open }"
    style="top: 4rem; bottom: 0; height: auto"
  >
    <nav class="p-4">
      <ul class="space-y-1">
        <template v-for="(group, groupIndex) in menuItems" :key="groupIndex">
          <li
            class="mt-4 mb-2 px-4 text-sm font-semibold text-gray-400 uppercase"
          >
            {{ group.label }}
          </li>
          <li v-for="(item, itemIndex) in group.items" :key="itemIndex">
            <router-link
              :to="item.routerLink"
              active-class="bg-primary-600"
              class="flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-gray-800"
              @click="closeSidebar"
            >
              <i :class="item.icon + ' text-lg'"></i>
              <span class="font-medium">{{ item.label }}</span>
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
  </div>

  <!-- Overlay for mobile -->
  <div
    v-if="open"
    class="fixed inset-0 z-30 bg-black/40 lg:hidden"
    @click="closeSidebar"
  ></div>
</template>
