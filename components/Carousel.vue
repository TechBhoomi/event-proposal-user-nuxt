<!-- <script setup>
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
   
    </Carousel>
  </div>
</template>
<style scoped></style> -->

<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel as VueCarousel, Slide } from "vue3-carousel";
import { useGlobalStore } from "~/store/globalStore";
const STORE = useGlobalStore();
const { getCarouselImages, caroselImages } = storeToRefs(STORE);

// Props to accept images dynamically
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});
let { images } = props;

const config = {
  autoplay: images.length > 2 ? 2000 : false,
  wrapAround: true,
  pauseAutoplayOnHover: true,
};
</script>

<template>
  <div class="carousel-container relative">
    <VueCarousel v-bind="config">
      <Slide v-for="(image, index) in images" :key="index">
        <div class="carousel__item relative w-full">
          <img
            :src="`https://gotest.qspiders.com/api/v1/get_image?name=${image}`"
            alt="Slide Image"
            class="carousel-image lg:h-[80vh] h-[50vh] w-full object-cover"
          />
        </div>
      </Slide>
    </VueCarousel>
  </div>
</template>

<style scoped></style>
