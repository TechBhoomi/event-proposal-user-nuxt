<template>
  <div class="bg-[#EBEBEB] rounded-md p-2 flex flex-col">
    <section>
      <h1 class="lg:text-3xl text-xl font-bold w-full text-center">Placement Activities</h1>
    </section>
    <section>
      <div class="grid lg:grid-cols-5 grid-cols-3 px-2.5 py-2.5">
        <div
          class="lg:w-52 w-28 rounded-md"
          v-for="(image, imageIndex) in images"
          :key="imageIndex"
        >
          <img
            :src="`https://gotest.qspiders.com/api/v1/get_image?name=${image}`"
            alt=""
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
</script>

<style scoped></style>
