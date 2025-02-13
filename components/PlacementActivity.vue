<template>
  <div class="rounded-md p-2 flex flex-col mb-2">
    <section class="w-full">
      <h1 class="text-3xl p-2 font-bold font-lexend text-center">
        Placement Activities
      </h1>
    </section>
    <section>
      <div>
      </div>
      <div class="grid lg:grid-cols-4 grid-cols-2 px-2.5 py-2.5 gap-4">
        <div
          class="overflow-hidden object-cover"
          v-for="(image, imageIndex) in images"
          :key="imageIndex"
        >
          <img
            :src="`${URL}/api/v1/get_uploaded_images?name=${image}`"
            alt=""
            class="rounded-lg hover:scale-110 transition-transform duration-200 ease-in-out object-cover"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  images: { type: Array, required: true },
});
const URL = import.meta.env.VITE_BASE_URL;
</script>
<style scoped></style>
