<template>
  <section class="mb-2">
    <CourseSubTopics
      :subjectData="courseByID"
      v-if="isSubTopicModalOpen"
      :isSubTopicModalOpen="isSubTopicModalOpen"
      @closeSubTopicModal="closeSubTopicModal"
      :courseName="courseName"
    />
    <article
      class="p-2 flex items-center justify-center flex-col bg-[#EBEBEB] mb-2"
    >
      <div class="text-3xl p-2 font-bold font-lexend">Our Popular Courses</div>
      <div
        class="grid lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-4 2xl:grid-cols-5 2xl:gap-8 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 p-4 gap-4 mx-0"
      >
        <div
          v-for="sub in courseData"
          :key="sub"
          class="bg-white font-semibold text-center rounded-2xl border shadow-lg p-3 lg:max-w-[2-rem] flex items-center justify-between flex-col group"
        >
          <img
            class="mb-3 h-28 rounded-md mx-auto group-hover:scale-110 duration-200 ease-in-out"
            :src="sub?.icon"
            alt="course"
          />
          <h1 class="text-lg text-gray-700 font-bold font-lexend">
            {{ sub?.title }}
          </h1>
          <p class="text-sm text-gray-400 mt-2 text-justify basis-[70%]">
            {{ sub?.description }}
          </p>
          <!-- <button
            @click="getCourseID(sub)"
            type="button"
            class="px-5 py-3 text-xs font-medium text-center text-white rounded-lg bg-[#F96E2A]"
          >
            Learn More
          </button> -->
          <button
            @click="getCourseID(sub)"
            type="button"
            class="relative inline-flex items-center justify-center px-3.5 py-2 overflow-hidden font-medium text-[#F96E2A] transition duration-300 ease-out border-2 border-[#F96E2A] rounded-lg shadow-md group"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#F96E2A] group-hover:translate-x-0 ease"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span
              class="absolute flex items-center text-base font-semibold justify-center w-full h-full text-[#F96E2A] transition-all duration-300 transform group-hover:translate-x-full ease"
            >
              Learn More</span
            >
            <span class="relative text-base font-semibold invisible">
              Learn More</span
            >
          </button>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useGlobalStore } from "~/store/globalStore";
import { useNuxtApp } from "#app";
import CourseSubTopics from "./CourseSubTopics.vue";

const { $pdf } = useNuxtApp();

const generateAndDownloadPDF = async (subjects, course_name) => {
  try {
    // Initialize a new PDF document
    $pdf.new({
      margins: { top: 20, bottom: 20, left: 20, right: 20 },
      size: "A4",
    });
    $pdf.add([
      {
        raw: course_name?.name,
        text: { fontSize: 26, fontWeight: "bold" },
        alignment: "center",
      },
      { lineBreak: {} }, // Adds a line break after the title
    ]);
    subjects.forEach(item => {
      console.log(item, "item");
      // Create an array for the main topic
      const mainTopic = [
        { raw: item.name, text: { fontSize: 20, fontWeight: "bold" } },
      ];
      // Map subtopics to an array of PDF entries
      const subtopics =
        item?.subtopics &&
        item?.subtopics.length > 0 &&
        item?.subtopics?.map(subtopic => ({
          raw: subtopic.name,
          text: { fontSize: 14, fontWeight: "light" },
        }));

      const spaces = [{ raw: "\n\n" }];
      // Combine main topic and subtopics
      if (subtopics && subtopics.length > 0) {
        let pdfEntries = [...mainTopic, ...subtopics, ...spaces];
        $pdf.add(pdfEntries);
      } else {
        let pdfEntries = [...mainTopic, ...spaces];
        $pdf.add(pdfEntries);
      }
      // Add the combined entries to the PDF
    });

    // Generate the PDF and obtain the Blob URL
    const blobUrl = await $pdf.run({
      type: "client",
      clientEmit: "blob",
    });

    // Create a temporary link to trigger the download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = course_name.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

const headingStyles = computed(() => {
  return "p-2 font-bold text-base bg-[#FF8343] rounded-sm text-[#FFFF]";
});
const courseBlock = computed(
  () =>
    "h-[32vh] sm:h-[40vh] md:h-[40vh] xs:h-[40vh] overflow-auto p-2 bg-[#fff]"
);

const STORE = useGlobalStore();
const {
  isCouseDataLoading,
  hasCourseApiError,
  courseData,
  courseByID,
  getCourseByIdLoading,
  hasCourseByIdError,
} = storeToRefs(STORE);

onBeforeMount(async () => {
  await STORE.getCourse();
});
const isSubTopicModalOpen = ref(false);
const courseName = ref("");
const getCourseID = async course => {
  await STORE.getCourseById(course?.courseResponseId);
  isSubTopicModalOpen.value = true;
  courseName.value = course?.title;
  console.log(courseByID.value);
};
const closeSubTopicModal = () => {
  isSubTopicModalOpen.value = false;
};
</script>

<style scoped>
.topics {
  list-style: disc;
  text-decoration: none !important;
}
.module_block {
  overflow-y: scroll; /* Ensure the element is scrollable */
}

.module_block::-webkit-scrollbar {
  width: 8px;
}

.module_block::-webkit-scrollbar-thumb {
  background: #b2b2b2; /* Blue scrollbar thumb */
  border-radius: 10px;
}

.module_block::-webkit-scrollbar-track {
  background: #ecf0f1; /* Light grey track */
}

ul > li {
  padding: 0.2rem;
}
</style>
