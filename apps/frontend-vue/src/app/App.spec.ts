import { describe, it, expect } from "vitest";
import router from "./router";
import { mount } from "@vue/test-utils";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";

describe("App", () => {
  it("renders properly", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [
          router,
          PrimeVue,
          ToastService,
          ConfirmationService,
          DialogService,
        ],
      },
    });

    await router.isReady();
    expect(wrapper.text()).toContain("Events7 - Vue");
  });
});
