<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel as VueCarousel, Slide } from "vue3-carousel";
import { useGlobalStore } from "~/store/globalStore";
const STORE = useGlobalStore();
const { carouselData } = storeToRefs(STORE);
onBeforeMount(async () => {
  await STORE.getCarouselImages();
});

// Props to accept images dynamically
// const props = defineProps({
//   images: {
//     type: Array,
//     required: true,
//   },
// });
// let { images } = props;

// const carouselData = [
//   "https://cdn.pixabay.com/photo/2025/02/09/17/58/cycling-9394894_1280.jpg",
//   "https://cdn.pixabay.com/photo/2016/12/14/13/33/girl-1906405_1280.jpg",
// ];
const config = {
  autoplay: carouselData.length > 1 ? 2000 : false,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  navigationNextLabel: true,
};
const URL = import.meta.env.VITE_BASE_URL;
</script>

<template>
  <div class="carousel-container relative mb-2">
    <VueCarousel v-bind="config">
      <template #addons>
        <Navigation />
      </template>
      <Slide v-for="(image, index) in carouselData" :key="index">
        <div class="carousel__item relative w-full">
          <img
            :src="`${URL}/api/v1/get_uploaded_images?name=${image}`"
            alt="Slide Image"
            class="carousel-image lg:h-[80vh] h-[35vh] w-full object-cover"
          />
        </div>
      </Slide>
    </VueCarousel>
  </div>
</template>

<style scoped></style>
