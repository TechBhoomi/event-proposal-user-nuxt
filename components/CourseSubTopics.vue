<template>
  <div class="w-full" v-if="isSubTopicModalOpen">
    <div
      id="crypto-modal"
      tabindex="-1"
      class="overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 max-h-full flex items-center justify-center rounded-lg lg:p-6 shadow-lg backdrop-blur-sm animate-browseInt"
    >
      <div class="relative p-4 lg:w-3/4 w-full max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t gap-2"
          >
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ courseName }}
            </h3>
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-200 text-red-500 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center"
              data-modal-toggle="crypto-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div
            class="p-4 md:p-5 overflow-y-auto h-[calc(100vh-10rem)]"
            v-if="subjectData[0]?.topics?.length"
          >
            <div class="accordion">
              <div
                v-for="(module, index) in subjectData[0]?.topics || []"
                :key="index"
                class="accordion-item"
              >
                <div
                  class="accordion-header flex items-center cursor-pointer"
                  @click.stop="toggleAccordion(index)"
                >
                  <h2 class="lg:text-xl font-semibold text-[#173B45]">
                    {{ module?.name }}
                  </h2>
                </div>
                <div v-if="isOpen(index)" class="accordion-content mt-2">
                  <ul class="pl-7">
                    <li
                      v-for="sub in module?.subtopics"
                      :key="sub"
                      class="topics text-base font-medium cursor-default"
                    >
                      <div class="flex items-center gap-2">
                        <span>
                          <svg
                            class="h-3 w-3"
                            fill="#f5861f"
                            viewBox="0 0 256 256"
                            id="Flat"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#f5861f"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M240,128c0,10.44238-7.51074,18.27441-14.1377,25.18457-3.77246,3.93359-7.67285,8-9.14648,11.56348-1.35449,3.27343-1.43652,8.69629-1.51562,13.93945-.14747,9.75879-.31446,20.81934-8.0044,28.50879-7.68945,7.68945-18.75,7.85644-28.5083,8.00391-5.24414.0791-10.667.16113-13.94043,1.51562-3.5625,1.47363-7.62988,5.374-11.5625,9.14648C146.27441,232.48926,138.44238,240,127.99951,240c-10.44238,0-18.27392-7.51074-25.18408-14.1377-3.93311-3.77246-8-7.67285-11.56348-9.14648-3.27295-1.35449-8.69531-1.43652-13.93945-1.51562-9.75879-.14747-20.81934-.31446-28.50879-8.00391s-7.85644-18.75-8.00391-28.50879c-.0791-5.24316-.16113-10.666-1.51562-13.93945-1.47363-3.56348-5.374-7.62989-9.14648-11.56348C23.51074,146.27441,16,138.44238,16,128s7.51074-18.27441,14.1377-25.18457c3.77246-3.93359,7.67285-8,9.14648-11.56348,1.35449-3.27343,1.43652-8.69629,1.51562-13.93945.14747-9.75879.31446-20.81934,8.0044-28.50879,7.68945-7.68945,18.75-7.85644,28.5083-8.00391,5.24414-.0791,10.667-.16113,13.94043-1.51562,3.5625-1.47363,7.62988-5.374,11.5625-9.14648C109.72559,23.51074,117.55762,16,128.00049,16c10.44238,0,18.27392,7.51074,25.18408,14.1377,3.93311,3.77246,8,7.67285,11.56348,9.14648,3.27295,1.35449,8.69531,1.43652,13.93945,1.51562,9.75879.14747,20.81934.31446,28.50879,8.00391s7.85644,18.75,8.00391,28.50879c.0791,5.24316.16113,10.666,1.51562,13.93945,1.47363,3.56348,5.374,7.62989,9.14648,11.56348C232.48926,109.72559,240,117.55762,240,128Z"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <span> {{ sub?.name }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            class="text-2xl font-bold text-red-500 animate-browseInt p-5"
            v-else
          >
            <h2>No data found for this course!</h2>
          </div>
          <div
            class="absolute bottom-4 right-0"
            v-if="subjectData[0]?.topics?.length"
          >
            <button
              @click="
                generateAndDownloadPDF(subjectData[0]?.topics, subjectData[0])
              "
              type="button"
              class="px-2 py-2 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>

              <span class="ml-2">Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isSubTopicModalOpen: { required: true, type: Boolean },
  subjectData: { type: [Array, Object] },
  courseName: { type: String, required: true },
});
const { isSubTopicModalOpen, subjectData, courseName } = props;
onMounted(() => {
  console.log(subjectData, "subjectData");
});
const emit = defineEmits(["closeSubTopicModal"]);
const closeModal = () => {
  emit("closeSubTopicModal");
};

import { useNuxtApp } from "#app";

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
  return "p-2 font-bold text-base bg-[#f5861f] rounded-sm text-[#FFFF]";
});
const courseBlock = computed(
  () =>
    "h-[32vh] sm:h-[40vh] md:h-[40vh] xs:h-[40vh] overflow-auto p-2 bg-[#fff]"
);

// Manage accordion open state
const activeIndex = ref(null);

const toggleAccordion = index => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const isOpen = index => activeIndex.value === index;

// Icons for open/close
const openIcon = "Open";
const closeIcon = "Close";
</script>

<style scoped>
.accordion-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
  padding: 8px 16px;
  background: #f9f9f9;
  border: 2px solid transparent;
  transition: all 150ms ease-in-out;
}
.accordion-item:hover {
  border: 2px solid #f5861f;
}

.accordion-header {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.accordion-content {
  padding: 8px 0;
  border-top: 1px solid #ddd;
}
</style>
