import { createRouter, createWebHistory } from "vue-router";
import EventsView from "../views/EventsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/events",
    },
    {
      path: "/events",
      name: "events",
      component: EventsView,
    },
    {
      path: "/about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
