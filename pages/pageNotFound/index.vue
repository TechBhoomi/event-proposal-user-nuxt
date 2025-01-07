<template>
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
</template>

<script setup>
import { ref } from "vue";

const message = ref("Welcome to Vue-3");
</script>

<style scoped></style>
