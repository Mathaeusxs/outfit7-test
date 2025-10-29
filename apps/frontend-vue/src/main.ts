import "./styles.scss";
import "primeicons/primeicons.css";
import router from "./app/router";
import { createApp } from "vue";
import App from "./app/App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(DialogService);
app.mount("#root");
