<template>
  <article>
    <section v-for="component in sortedElements" :key="component.id">
      <!--! NAVBAR -->
      <div v-if="component.name == 'navbar'">
        <header class="sticky top-0">
          <NavHeader
            title="Qspiders"
            tagline="Qspiders Training Institution | Enquiry Course Proposal | 26 Nov 2024"
          />
          <Navbar :menuItems="component.details" />
        </header>
      </div>
      <!--!CAROUSAL-->
      <div v-if="component.name == 'carousel'">
        <Carousel />
      </div>
      <!--! COVER IMAGE -->
      <div v-else-if="component.name == 'cover_image'">
        <CoverImage :coverImage="component.details.data" />
      </div>
      <div v-else-if="component.name == 'location'">
        <Footer />
      </div>
      <!-- 
    <Description />
    <Curiculum />
    <UpcomingBatch />
    <PlacementStats />
    <PlacementActivity />
    <OtherCoursesAndBranches />
    <Footer /> -->
    </section>
    <section>
      {{ sortedElements }}
    </section>
  </article>
</template>

<script setup>
// import Navbar from "@/components/Navbar.vue";
// import NavHeader from "@/components/NavHeader.vue";
import { useGlobalStore } from "@/store/globalStore";
import { computed } from "vue";

const STORE = useGlobalStore();
const { count, eventData } = storeToRefs(STORE);
// Map to associate component names with Vue components
// const componentMap = {
//   navbar: Navbar,
//   carousel: Carousel,
// };

const sortedElements = computed(() => {
  return eventData.value[1]?.template?.template[0]?.elements.sort((a, b) => {
    const positionOrder = ["top", "center", "bottom"];
    return (
      positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
    );
  });
});

onBeforeMount(async () => {
  await STORE.getEventData();
});

</script>

<style scoped></style>
