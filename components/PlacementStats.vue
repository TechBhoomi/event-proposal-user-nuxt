<template>
  <div class="p-1 pb-7 lg:pl-7 lg:pr-7 bg-[#EBEBEB] mb-2">
    <section>
      <h1 class="text-3xl p-2 font-bold font-lexend text-center">
        Placement Statistics
      </h1>
    </section>
    <article class="p-2 stats-container">
      <div
        class="grid grid-cols-2 gap-4 md:grid-cols-5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5"
      >
        <template v-for="(stat, name, index) in props.data" :key="index">
          <div
            v-if="
              name.toLowerCase() != 'yop' && name.toLowerCase() != 'yop_count'
            "
            class="transparent-div rounded-xl flex items-center justify-center flex-col px-3 py-3 md:py-7 md:px-4 xl:px-8 xl:py-6 lg:py-5 lg:px-5 font-lexend"
          >
            <div class="lg:text-lg text-base font-semibold">
              {{ name?.replace(/_/g, " ")?.toUpperCase() }}
            </div>
            <div class="lg:text-2xl text-lg font-bold">
              {{ stat.toLocaleString("en-IN") }}
            </div>
          </div>
        </template>
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
