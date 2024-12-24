<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const config = {
  autoplay: 2000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};
const images = ref([
  "https://cdn.pixabay.com/photo/2022/11/13/21/32/holly-7590229_640.jpg",
  "https://cdn.pixabay.com/photo/2022/12/11/13/21/baby-7648901_640.jpg",
]);
</script>

<template>
  <div class="carousel-container relative -z-10">
    <Carousel v-bind="config">
      <Slide v-for="slide in images" :key="slide">
        <div class="carousel__item relative w-full">
          <img
            :src="slide"
            alt="Slide Image"
            class="carousel-image lg:h-[80vh] h-[50vh] w-full object-cover"
          />
        </div>
      </Slide>
      <!-- <template #addons>
        <Navigation class="z-50 absolute" />
      </template> -->
    </Carousel>
  </div>
</template>
<style scoped></style>
