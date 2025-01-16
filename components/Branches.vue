<template>
  <article>
    <BranchDetails
      v-if="isBranchDetailsModalOpen"
      :isBranchDetailsModalOpen="isBranchDetailsModalOpen"
      @closeViewBranchDetails="closeViewBranchDetails"
      :branchDetails="branchDetails"
      :cityName="cityName"
    />
    <article class="flex items-center justify-center flex-col bg-[#EBEBEB] p-4">
      <div class="p-1 w-full flex items-center justify-center border border-2 border-r-indigo-500">
        <div class="text-2xl font-bold">Our Branches and Locations</div>
      </div>
      <div
        class="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 w-full p-3 mx-0"
      >
        <div
          v-for="(city, index) in branches"
          :key="index"
          @click="openBranchDetails(city)"
          class="group flex flex-col bg-[#F5A25D] border-[#10375C] border-[0.015rem] shadow-sm rounded-lg w-full p-5 cursor-pointer"
        >
          <div class="flex items-center">
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white group-hover:animate-flyin"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                clip-rule="evenodd"
              />
            </svg>

            <h5 class="ml-3 text-slate-800 lg:text-xl text-sm font-semibold">
              {{ city.cityName }}
            </h5>
          </div>
          <div>
            <!-- <p
            class="text-slate-800 font-semibold text-sm hover:underline flex items-center cursor-pointer"
          >
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </p> -->
          </div>
        </div>
      </div>
    </article>
  </article>
</template>

<script setup>
import { ref } from "vue";
import { useGlobalStore } from "~/store/globalStore";
const STORE = useGlobalStore();
const { branches } = storeToRefs(STORE);
const isBranchDetailsModalOpen = ref(false);
const cityName = ref("");
const viewBranchDetails = () => {
  isBranchDetailsModalOpen.value = true;
};
const closeViewBranchDetails = () => {
  isBranchDetailsModalOpen.value = false;
};
onBeforeMount(async () => {
  await STORE.getBranchByOrg();
});
const branchDetails = ref(null);
const openBranchDetails = data => {
  console.log(data, "data");
  branchDetails.value = data;
  cityName.value = data?.cityName;
    isBranchDetailsModalOpen.value = true;
};
</script>

<style scoped></style>
