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

    <article v-else>
      <section v-for="component in sortedElements" :key="component.id">
        <!--! NAVBAR -->
        <div v-if="component.name == 'navbar'">
          <header>
            <NavHeader
              title="Qspiders"
              tagline="Qspiders Training Institution | Enquiry Course Proposal | 26 Nov 2024"
            />
            <!-- <Navbar :menuItems="component.details" /> -->
            <Navbar
              :menuItems="component.details.map(item => item.data)"
              :uuid="uniqueTemplateId"
            />
          </header>
        </div>
        <!--!CAROUSAL-->
        <div v-if="component.name === 'carousel'">
          <Carousel :images="component.details.map(item => item.data)" />
        </div>
        <div v-if="component.name === 'Curriculum'" id="Curriculum">
          <Curiculum />
        </div>
        <!--! COVER IMAGE -->
        <!-- <div v-else-if="component.name == 'cover_image'">
          <CoverImage :coverImage="component.details.data" />
        </div> -->
        <!-- <div v-else-if="component.name == 'location'">
          <Footer />
        </div> -->

        <!--
     
      <Curiculum />
      <UpcomingBatch />
      <PlacementStats />
      <PlacementActivity />
      <OtherCoursesAndBranches />
      <Footer /> -->
      </section>
    </article>
  </section>
</template>

<script setup>
import { useGlobalStore } from "@/store/globalStore";
import { computed } from "vue";
import EnquiryFrom from "~/components/EnquiryFrom.vue";

const STORE = useGlobalStore();
const { count, eventData, isEventApiLoading, apiError } = storeToRefs(STORE);

const sortedElements = computed(() => {
  return (
    eventData.value.length > 0 &&
    eventData.value[0]?.template?.template[0]?.elements?.sort((a, b) => {
      const positionOrder = ["top", "center", "body", "bottom"];
      return (
        positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
      );
    })
  );
});

const route = useRoute();
const router = useRouter();
let uniqueTemplateId = ref(null);
onBeforeMount(async () => {
  const { uuid } = route.params;
  uniqueTemplateId.value = uuid;
  router.push(uuid);
  await STORE.getEventData(uuid);
});

</script>

<style scoped></style>
