<template>
  <div class="p-1 pb-7 lg:pl-7 lg:pr-7 bg-[#EBEBEB] mb-2">
    <section>
      <h1 class="lg:text-3xl text-xl font-bold w-full text-center p-1">
        Placement Statistics
      </h1>
    </section>
    <article class="p-2 stats-container">
      <div
        class="grid grid-cols-2 lg:grid-cols-7 gap-9 lg:px-4 px-2 lg:py-20 py-6 content-center"
      >
        <div
          class="lg:w-52 w-full lg:h-24 h-20 transparent-div rounded-xl flex items-center justify-center flex-col"
          v-for="(stat, name, index) in props.data"
          :key="index"
        >
          <div class="lg:text-lg text-base font-semibold">
            {{ name?.replace(/_/g, " ")?.toUpperCase() }}
          </div>
          <div class="lg:text-2xl text-lg font-bold">{{ stat }}</div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
const props = defineProps({
  data: { type: Array },
});
</script>

<style scoped></style>
