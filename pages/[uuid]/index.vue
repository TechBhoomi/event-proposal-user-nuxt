<template>
  <section>
    <!--!LOADING STATE-->
    <article
      v-if="isEventApiLoading && !apiError"
      class="text-2xl font-bold animate-pulse m-auto bg-white h-[100vh]"
    >
      <div class="flex items-center justify-center h-full">
        <svg
          class="animate-spin border-[#f5861f]"
          xmlns="http://www.w3.org/2000/svg"
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
        >
          <g id="Group 1000003711">
            <circle
              id="Ellipse 717"
              cx="31.0018"
              cy="30.9993"
              r="26.5091"
              stroke="#D1D5DB"
              stroke-width="8"
              stroke-dasharray="5 5"
            />
            <path
              id="Ellipse 715"
              d="M38.7435 56.3529C45.0336 54.4317 50.3849 50.2409 53.7578 44.5947C57.1307 38.9484 58.2842 32.25 56.9942 25.8008C55.7043 19.3516 52.063 13.6122 46.7779 9.69765C41.4928 5.78314 34.9412 3.97307 28.396 4.61912"
              stroke="#f5861f"
              stroke-width="8"
            />
          </g>
        </svg>
      </div>
    </article>
    <!--!ERROR STATE-->
    <section v-else-if="apiError && !isEventApiLoading">
      <section class="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
        <div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div class="max-w-md text-center">
            <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-400">
              <span class="sr-only">Error</span>404
            </h2>
            <p
              class="text-2xl font-semibold md:text-3xl"
            >Sorry, we couldn't find the the template you're looking for.</p>
            <p class="mt-4 mb-8 dark:text-gray-600">Please Enter the valid Template URL!</p>
          </div>
        </div>
      </section>
    </section>
    <!--!IDLE STATE -->

    <template v-else>
      <div id="/" class="sticky top-0 z-50">
        <Navbar :menuItems="menuItems" />
      </div>
      <div class="bg-gray-50">
        <Carousel :images="carouselData" />
      </div>
      <div class="bg-gray-100">
        <Greeting :userName="userName" />
      </div>
      <div id="courses" class="bg-gray-50">
        <Curiculum />
      </div>
      <div id="branches" class="bg-gray-100">
        <Branches />
      </div>
      <!-- <div id="placement_stats" class="bg-gray-50">
        <PlacementStats :data="placementStats" />
      </div>-->
      <!-- <div id="enquiry_form" class="bg-gray-100">
        <EnquiryFrom />
      </div>-->
      <div id="placement_activities" class="bg-gray-50">
        <PlacementActivity :images="placementImages" />
      </div>
      <div id="hiring_partners" class="bg-gray-50">
        <HiringPartners />
      </div>
    </template>
  </section>
</template>

<script setup>
import { useGlobalStore } from "@/store/globalStore";
import { computed } from "vue";

const STORE = useGlobalStore();
const {
  count,
  eventData,
  isEventApiLoading,
  apiError,
  placementStats,
  userName,
  carouselData,
  placementImages
} = storeToRefs(STORE);

const sortedElements = computed(() => {
  return (
    eventData.value.length > 0 &&
    eventData.value[0]?.template?.template[0]?.elements?.sort((a, b) => {
      const positionOrder = [
        "Header",
        "Cover",
        "Greeting",
        "Body-Top",
        "Body-Center",
        "Body-Bottom",
        "Bottom",
        "Footer"
      ];
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
  await STORE.getPlacementStats();
  await STORE.getCarouselImages();
  await STORE.getPlacementImages();
});

definePageMeta({
  title: "Qspiders"
});

useHead({
  title: "Qspiders"
});
const menuItems = [
  { name: "Courses", path: "courses" },
   { name: "Other Courses", path: "https://qspiders.com/", external: true },
  { name: "Branches", path: "branches" },
  { name: "Other Branches", path: "https://qspiders.com/", external: true },
  { name: "Placement Stats", path: "https://qspiders.com/placements", external: true  },
  // { name: "Enquiry Form", path: "enquiry_form" },
  { name: "Placement Activities", path: "placement_activities" },
  { name: "Hiring Partners", path: "hiring_partners" }
];
</script>

<style scoped></style>
