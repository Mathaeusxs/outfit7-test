import { reactive } from "vue";
import axios from "axios";
import { CountryInfo } from "@libs/types";

export const appState = reactive<{ countryInfo: CountryInfo | null }>({
  countryInfo: null,
});

export async function fetchCountryInfo() {
  try {
    const res = await axios.get<CountryInfo>("/api/general/ip-auth");
    appState.countryInfo = res.data;
  } catch (error) {
    // Set a safe default
    appState.countryInfo = appState.countryInfo ?? {
      countryCode: "SI",
      enableAds: false,
    };
    console.error("Failed to fetch country info:", error);
  }
}

export function forceSetCountry(countryCode: string, enableAds = true) {
  appState.countryInfo = {
    countryCode,
    enableAds: enableAds,
  };
}
