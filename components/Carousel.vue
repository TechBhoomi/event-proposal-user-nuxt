<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel as VueCarousel, Slide } from "vue3-carousel";
import { useGlobalStore } from "~/store/globalStore";
const STORE = useGlobalStore();

// Props to accept images dynamically
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});
let { images } = props;

const config = {
  autoplay: images.length > 1 ? 2000 : false,
  wrapAround: true,
  pauseAutoplayOnHover: true,
  navigationNextLabel: true,
};
const URL = import.meta.env.VITE_BASE_URL;
</script>

<template>
  <div class="carousel-container relative">
    <VueCarousel v-bind="config">
      <template #addons>
        <Navigation />
      </template>
      <Slide v-for="(image, index) in images" :key="index">
        <div class="carousel__item relative w-full">
          <img
            :src="`${URL}/api/v1/get_image?name=${image}`"
            alt="Slide Image"
            class="carousel-image lg:h-[80vh] h-[35vh] w-full object-cover"
          />
        </div>
      </Slide>
    </VueCarousel>
  </div>
</template>

<style scoped></style>
