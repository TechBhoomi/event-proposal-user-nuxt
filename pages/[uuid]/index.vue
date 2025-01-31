<template>
  <section>
    <!--!LOADING STATE-->
    <article
      v-if="isEventApiLoading && !apiError"
      class="text-2xl font-bold animate-pulse m-auto"
    >
      Loading Template...
    </article>
    <!--!ERROR STATE-->
    <section v-else-if="apiError && !isEventApiLoading">
      <section
        class="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800"
      >
        <div
          class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
        >
          <div class="max-w-md text-center">
            <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-400">
              <span class="sr-only">Error</span>404
            </h2>
            <p class="text-2xl font-semibold md:text-3xl">
              Sorry, we couldn't find the the template you're looking for.
            </p>
            <p class="mt-4 mb-8 dark:text-gray-600">
              Please Enter the valid Template URL!
            </p>
          </div>
        </div>
      </section>
    </section>
    <!--!IDLE STATE -->

    <template v-else>
      <template v-for="component in sortedElements" :key="component.id">
        <!-- !THIS IS NOT WORKING AS EXPECTED IF INCLUDED INSIDE THIS SECTION -->
        <!-- <div
          v-if="component.name.toLowerCase() == 'header'"
          class="sticky top-0 z-50"
        >
          <NavHeader
            class="sticky top-0"
            title="Qspiders"
            :tagline="component?.details[0]?.data"
          />
        </div> -->

        <div
          v-if="component.name.toLowerCase() == 'navbar'"
          class="sticky top-0 z-50"
        >
          <Navbar
            :menuItems="component.details.map(item => item.data)"
            :uuid="uniqueTemplateId"
          />
        </div>
        <!--!CAROUSAL-->
        <div
          v-if="component.name?.toLowerCase() === 'carousel'"
          :id="component.name?.toLowerCase().trim().replace(' ', '_')"
          class="flex items-center justify-center p-2"
        >
          <Carousel :images="component.details.map(item => item.data)" />
        </div>
        <div
          v-if="component.name?.toLowerCase() === 'curriculum'"
          :id="component.name?.toLowerCase().trim().replace(' ', '_')"
        >
          <Curiculum />
        </div>

        <!-- !PLACEMENT STATS -->
        <div
          v-if="component.name.toLowerCase() === 'placement statistics'"
          :id="component.name.trim().replace(' ', '_')"
        >
          <PlacementStats :data="placementStats" />
        </div>
        <!-- !BRANCH DATA -->
        <div
          v-if="component.name.toLowerCase() === 'branch sneak-peek'"
          :id="component.name?.toLowerCase().trim().replace(' ', '_')"
        >
          <Branches />
        </div>
        <!-- !PLACEMENT ACTIVITY-->
        <div
          v-if="component.name.toLowerCase() === 'placement activities'"
          :id="component.name.toLowerCase().trim().replace(' ', '_')"
        >
          <PlacementActivity
            :images="component.details.map(item => item.data)"
          />
        </div>
        <!-- !ENQUIRY FORM -->
        <div
          v-if="component.name?.toLowerCase() === 'enquiry form'"
          :id="component.name.trim().replace(' ', '_')"
        >
          <EnquiryFrom />
        </div>
        <!-- !FOOTER -->
        <div
          v-if="component.name.toLowerCase() === 'footer'"
          :id="component.name.trim().replace(' ', '_')"
        >
          <Footer />
        </div>

        <!--!UPCOMING BATCHES -->
        <!-- <div
          v-if="component.name === 'Upcoming Batches'"
          :id="component.name.trim().replace(' ', '_')"
        >
          <UpcminingBatches />
        </div> -->

        <!-- <Curiculum />
      <UpcomingBatch />
      <PlacementStats />
      <PlacementActivity />
      <OtherCoursesAndBranches />
      <Footer />  -->
      </template>
    </template>
  </section>
</template>

<script setup>
import { useGlobalStore } from "@/store/globalStore";
import { computed } from "vue";
//import EnquiryFrom from "~/components/EnquiryFrom.vue";

const STORE = useGlobalStore();
const { count, eventData, isEventApiLoading, apiError, placementStats } =
  storeToRefs(STORE);

const sortedElements = computed(() => {
  return (
    eventData.value.length > 0 &&
    eventData.value[0]?.template?.template[0]?.elements?.sort((a, b) => {
      const positionOrder = [
        "header-top",
        "header-bottom",
        "Cover",
        "Body-Top",
        "Body-Center",
        "Body-Bottom",
        "Bottom",
        "Footer",
      ];
      return (
        positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
      );
    })
  );
});

console.log(sortedElements.value, "sortedElements");

const route = useRoute();
const router = useRouter();
let uniqueTemplateId = ref(null);
onBeforeMount(async () => {
  const { uuid } = route.params;
  uniqueTemplateId.value = uuid;
  router.push(uuid);
  await STORE.getEventData(uuid);
  await STORE.getPlacementStats();
});
</script>

<style scoped>
.scroll-container {
  overflow-y: auto;
  height: 100vh;
}
</style>
