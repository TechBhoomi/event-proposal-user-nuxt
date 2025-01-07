<template>
  <div class="p-2">
    <iframe id="pdf" />
    <section>
      <h1 class="lg:text-3xl text-xl font-bold">Curriculum</h1>
    </section>
    <article class="rounded-md bg-[#FFE6C7] pt-2 pb-4">
      <h2 class="font-bold text-base w-full text-center p-2">
        Software Testing With Java Automation <span>-3 Months</span>
      </h2>
      <section class="lg:grid grid-cols-3 gap-2 p-2">
        <div class="border-2 rounded-lg overflow-hidden bg-[#fff]">
          <h2 :class="headingStyles">Subjects Covered</h2>
          <div :class="courseBlock">
            <ul>
              <li
                v-for="sub in courseData"
                :key="sub"
                @click="getCourseID(sub)"
                class="hover:font-semibold cursor-pointer"
              >
                {{ sub?.title }}
              </li>
            </ul>
          </div>
        </div>
        <div class="border-2 rounded-lg overflow-hidden bg-[#fff]">
          <h2 :class="headingStyles">Modules</h2>
          <div v-if="courseByID && courseByID.length > 0">
            <div :class="courseBlock" class="module_block">
              <div v-for="module in courseByID[0]?.topics" :key="module">
                <h3 class="font-semibold underline underline-offset-2">
                  {{ module?.name }}
                </h3>
                <ul class="pl-7">
                  <li
                    v-for="sub in module?.subtopics"
                    :key="sub"
                    class="font-normal topics"
                  >
                    {{ sub?.name }}
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <button
                class="w-full bg-[#6EACDA] p-1 rounded-md"
                @click="generateAndDownloadPDF(courseByID[0]?.topics)"
              >
                Download Pdf
              </button>
            </div>
          </div>
          <div v-else class="text-red-600 text-center">No Data Found</div>
        </div>
        <div class="border-2 rounded-lg overflow-hidden bg-[#fff]">
          <h2 :class="headingStyles">Testimonials</h2>
          <div :class="courseBlock">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
            quidem minima a vel, incidunt facere odit excepturi fugiat
            recusandae tenetur iure fugit animi deserunt repellendus voluptatum
            laboriosam beatae sed deleniti non. Doloremque perferendis magnam
            laboriosam rerum exercitationem quas tempora nisi et fugiat a nihil,
            dolore autem magni fuga, iusto laborum. At odio vitae distinctio
            eaque inventore ducimus tenetur aspernatur officia nisi eum.
            Voluptate aliquid beatae quibusdam quis quaerat fuga tempore sed
            impedit. Provident totam magnam enim ad facere nam non unde id,
            vitae ex sequi nihil exercitationem voluptatum delectus modi itaque
            ullam amet deserunt numquam ipsum recusandae nulla quas. Eius!
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useGlobalStore } from "~/store/globalStore";
import { useNuxtApp } from "#app";

const { $pdf } = useNuxtApp();

const jsonData = ref([
  { title: "Item 1", description: "Description for item 1" },
  { title: "Item 2", description: "Description for item 2" },
  // Add more data as needed
]);

const generateAndDownloadPDF = async subjects => {
  console.log(subjects);
  try {
    // Initialize a new PDF document
    $pdf.new({
      margins: { top: 20, bottom: 20, left: 20, right: 20 },
      size: "A4",
    });

    subjects.forEach(item => {
      console.log(item, "item");
      // Create an array for the main topic
      const mainTopic = [
        { raw: item.name, text: { fontSize: 25, fontWeight: "bold" } },
      ];
      // Map subtopics to an array of PDF entries
      const subtopics =
        item?.subtopics.length > 0 &&
        item?.subtopics?.map(subtopic => ({
          raw: subtopic.name,
          text: { fontSize: 16, fontWeight: "semiBold" },
        }));

      const spaces = [{ raw: "\n\n" }];
      // Combine main topic and subtopics
      const pdfEntries = [...mainTopic, ...subtopics, ...spaces];
      console.log(pdfEntries, "pdfEntries");

      // Add the combined entries to the PDF
      $pdf.add(pdfEntries);
    });

    // Generate the PDF and obtain the Blob URL
    const blobUrl = await $pdf.run({
      type: "client",
      clientEmit: "blob",
    });

    // Create a temporary link to trigger the download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "custom_document.pdf";
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
const courseSubjects = computed(() => {
  return courseData;
});

onBeforeMount(async () => {
  await STORE.getCourse();
});
const getCourseID = async course => {
  await STORE.getCourseById(course?.courseResponseId);
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
