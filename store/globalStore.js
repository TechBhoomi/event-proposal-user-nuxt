import axios from "axios";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("globalStore", () => {
  const count = ref(0);
  const apiError = ref(false);
  const URL = import.meta.env.VITE_BASE_URL;
  const eventData = ref([]);
  const isEventApiLoading = ref(false);
  async function getEventData(uuid) {
    try {
      let url = `${URL}/api/v1/get_events`;
      if (uuid) {
        url += `?uuid=${uuid}`;
      }
      isEventApiLoading.value = true;
      apiError.value = false;
      eventData.value = [];
      const response = await axios.get(url);
      eventData.value = await response.data.data;
      if (response.data.data.length < 1) {
        apiError.value = true;
      }
    } catch (error) {
      apiError.value = "Somthing went wrong!";
      throw new Error(error.response.message);
    } finally {
      isEventApiLoading.value = false;
    }
  }
  return { count, getEventData, eventData, isEventApiLoading, apiError };
});
