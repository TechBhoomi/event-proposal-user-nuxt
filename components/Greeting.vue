<template>
  <section class="p-4 bg-[#EBEBEB] mb-2">
    <div class="text-3xl p-2 font-bold font-lexend">
      <h1>Hello {{ userName }},</h1>
      <h1 v-for="(greeting, index) in data" :key="index">{{ greeting }}</h1>
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
