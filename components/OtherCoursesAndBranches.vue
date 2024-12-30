<template>
  <div class="p-2">
    <h1 class="lg:text-3xl text-xl font-bold">Other Courses And Locations</h1>
    <section class="flex items-center gap-1 p-2">
      <h2 class="text-lg font-semibold">Explore Other Courses</h2>
      <h2>
        <a href="" class="text-blue-500 text-base underline underline-offset-4"
          >Click here to know more</a
        >
      </h2>
    </section>
    <section>
      <button
        v-for="branch in branches"
        :key="branch"
        type="button"
        class="py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {{ branch }}
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
let branches = ref([
  "Hebbal",
  "Basavangudi",
  "BTM",
  "Kormangla",
  "Mandaya",
  "Chennai",
  "Mumbai",
  "Kolkata",
  "Bihar",
]);

const message = ref("Welcome to Vue-3");
</script>

<style scoped></style>
