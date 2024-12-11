<template>
  <nav class="bg-[#F96E2A] text-white p-1 sticky top-0">
    <div class="grid lg:grid-cols-2">
      <!-- Brand -->
      <div class="">
        <a href="#" class="sm:text-base lg:text-2xl font-bold lg:pl-4 pl-2"
          >QSpiders</a
        >
      </div>
      <!-- Tagline/Other details -->
      <div
        class="flex items-center justify-start xl:justify-start lg:justify-center gap-1"
      >
        <h2 class="text-xs lg:text-base">Qspiders Training Institution</h2>
        <h2>|</h2>
        <h2 class="text-xs lg:text-base">Enquiry Course Proposal</h2>
        <h2>|</h2>
        <h2 class="text-xs lg:text-base">26 Nov 2024</h2>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const message = ref("Welcome to Vue-3");
</script>

<style scoped></style>
