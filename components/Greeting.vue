<template>
  <section class="p-4 mb-2 flex items-center justify-center flex-col w-full">
    <div class="lg:text-3xl text-2xl p-2 font-bold font-lexend">
      <h1 class="w-full text-center">Hello {{ userName }},</h1>
      <h1 class="text-[#f5861f] text-center">Welcome to Qspiders</h1>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  userName: { type: String, default: "Name" },
  data: { type: Array, default: [] },
});
let { userName, data } = props;
</script>

<style scoped></style>
