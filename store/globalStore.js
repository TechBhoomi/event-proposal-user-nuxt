import axios from "axios";
import { defineStore } from "pinia";
export const useGlobalStore = defineStore("globalStore", () => {
  const count = ref(0);
  const apiError = ref(false);
  const URL = import.meta.env.VITE_BASE_URL;
  const eventData = ref([]);
  const isEventApiLoading = ref(false);
  const courseData = ref(null);
  const isCouseDataLoading = ref(false);
  const hasCourseApiError = ref(false);
  const courseByID = ref([]);
  const getCourseByIdLoading = ref(false);
  const hasCourseByIdError = ref(false);

  const placementStats = ref([]);
  const isPlacementDataLoading = ref(false);
  const hasPlacementStatsError = ref(false);
  const userName = ref("");
  const carouselData = ref([]);
  const placementImages = ref([]);
  // branch data
  const branches = ref("");
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
      userName.value = response.data?.data[0]?.name;
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
        "https://golang.qspiders.com/backend/api/v1/categories/getAllCategories?organization=qspiders"
      );
      courseData.value = response?.data?.data[0]?.courseResponse;
    } catch (error) {
      hasCourseApiError.value = error.response;
    } finally {
      isCouseDataLoading.value = false;
    }
  }

  // async function getEventData(uuid) {
  //   try {
  //     let url = `${URL}/api/v1/get_events`;
  //     if (uuid) {
  //       url += `?uuid=${uuid}`;
  //     }
  //     isEventApiLoading.value = true;
  //     apiError.value = false;
  //     eventData.value = [];
  
  //     const response = await axios.get(url);
  //     eventData.value = response.data.data;
  //     userName.value = response.data?.data[0]?.name;
  
  //     if (response.data.data.length < 1) {
  //       apiError.value = true;
  //     } else {
  //       const degreeId = response.data.data[0]?.degree?.id;
  //       if (degreeId) {
  //         await getCourse(degreeId); // Fetch courses based on degree ID
  //       }
  //     }
  //   } catch (error) {
  //     apiError.value = "Something went wrong!";
  //     throw new Error(error.response?.message || "Unknown error");
  //   } finally {
  //     isEventApiLoading.value = false;
  //   }
  // }
  
  // async function getCourse(degree_id) {
  //   try {
  //     const url = `https://golang.qspiders.com/backend/api/v1/categories/getAllCategories?organization=qspiders&degree_id=${degree_id}`;
  //     const response = await axios.get(url);
  //     courseData.value = response?.data?.data[0]?.courseResponse || [];
  //   } catch (error) {
  //     hasCourseApiError.value = error.response || "Something went wrong!";
  //   } finally {
  //     isCouseDataLoading.value = false;
  //   }
  // }

  
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
  async function getBranchByOrg() {
    try {
      const response = await axios.get(
        `https://golang.qspiders.com/backend/api/v1/branches/viewAll?organization=qspiders`
      );
      branches.value = response?.data.data[0]?.cities;
    } catch (error) {
      console.log(error);
    }
  }
  // function to post enquiry form
  async function postEnquiry(apiBody) {
    try {
      const response = await axios.post(
        `${URL}/api/v1/create_enquiry`,
        apiBody
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async function getPlacementStats() {
    try {
      const response = await axios.get(
        "https://hrstbackend.qspiders.com/placements/website_data_reportSummary/"
      );
      placementStats.value = response.data;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function getCarouselImages() {
    try {
      const response = await axios.get(`${URL}/api/v1/get_image?id=1`);
      carouselData.value = response.data.data[0].images;
    } catch (error) {
      console.log(error);
    }
  }
  async function getPlacementImages() {
    try {
      const response = await axios.get(`${URL}/api/v1/get_image?id=2`);
      placementImages.value = response.data.data[0].images;
    } catch (error) {
      console.log(error);
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
    getBranchByOrg,
    branches,
    postEnquiry,
    getPlacementStats,
    placementStats,
    userName,
    getCarouselImages,
    carouselData,
    getPlacementImages,
    placementImages,
  };
});
