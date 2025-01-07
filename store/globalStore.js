import axios from "axios";
import { defineStore } from "pinia";

export const useGlobalStore = defineStore("globalStore", () => {
  const count = ref(0);
  const apiError = ref(false);
  const URL = import.meta.env.VITE_BASE_URL;
  const eventData = ref([]);
  const isEventApiLoading = ref(false);
  // course api
  const courseData = ref(null);
  const isCouseDataLoading = ref(false);
  const hasCourseApiError = ref(false);
  // get course by id
  const courseByID = ref([]);
  const getCourseByIdLoading = ref(false);
  const hasCourseByIdError = ref(false);
  // get event
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
  // get all courses
  async function getCourse() {
    try {
      const response = await axios.get(
        "https://golang.qspiders.com/backend/api/v1/categories/getAllCategories?organization=jspiders"
      );
      courseData.value = response?.data?.data[0]?.courseResponse;
    } catch (error) {
      hasCourseApiError.value = error.response;
    } finally {
      isCouseDataLoading.value = false;
    }
  }
  // get course by id
  async function getCourseById(course_Id) {
    let URL = `https://golang.qspiders.com/backend/api/v1/courses/getbyid`;
    if (course_Id) {
      URL += `?courseId=${course_Id}`;
      console.log(URL);
      try {
        const response = await axios.get(URL);
        courseByID.value = response.data?.data?.details;
      } catch (error) {
        hasCourseByIdError.value = error.response;
      } finally {
        getCourseById, (getCourseByIdLoading.value = false);
      }
    } else {
      throw new Error("Please provide a valid course ID");
    }
  }
  return {
    count,
    getEventData,
    eventData,
    isEventApiLoading,
    apiError,
    getCourse,
    isCouseDataLoading,
    hasCourseApiError,
    courseData,
    getCourseById,
    courseByID,
    getCourseByIdLoading,
    hasCourseByIdError,
  };
});
