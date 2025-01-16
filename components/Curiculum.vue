<template>
  <section>
    <CourseSubTopics
      :subjectData="courseByID"
      v-if="isSubTopicModalOpen"
      :isSubTopicModalOpen="isSubTopicModalOpen"
      @closeSubTopicModal="closeSubTopicModal"
      :courseName="courseName"
    />
    <article class="p-2 flex items-center justify-center flex-col bg-[#EBEBEB] mb-2">
      <div class="text-2xl font-bold">What are you Looking for?</div>
      <div class="flex flex-wrap gap-2 p-4 mx-0">
        <section
          v-for="sub in courseData"
          @click="getCourseID(sub)"
          :key="sub"
          class="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold me-2 px-4 py-0.5 dark:bg-gray-700 dark:text-blue-400 border rounded-md border-blue-400 inline-flex items-center justify-center cursor-pointer text-base"
        >
          {{ sub?.title }}
        </section>
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
