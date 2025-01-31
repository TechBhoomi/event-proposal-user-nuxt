<template>
  <div v-if="isBranchDetailsModalOpen">
    <!-- Main modal -->
    <div
      id="select-modal"
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full shadow-lg backdrop-blur-sm bg-[#00000033]"
    >
      <div
        class="relative p-4 w-full max-w-7xl mx-auto max-h-full"
        :class="animateClass"
      >
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <section>
            <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
            >
              <h3
                class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white font-lexend"
              >
                Branches in {{ cityName }}
              </h3>
              <button
                @click="closeModal"
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="select-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
          </section>
          <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-[#fff] p-4">
            <aside class="rounded-lg bg-[#efefef] p-2">
              <!-- Modal body -->
              <div class="p-4 md:p-5">
                <p
                  class="text-gray-500 dark:text-gray-400 mb-4 text-sm md:text-base font-sans"
                >
                  Select your desired location:
                </p>
                <ul class="space-y-4 mb-4">
                  <template
                    v-for="(branch, index) in branchDetails?.courses[0]
                      ?.branches"
                    :key="index"
                  >
                    <li
                      @click="seeBranchData(branch, index)"
                      class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                      :class="activeClass(index)"
                    >
                      <h2 class="font-semibold text-sm md:text-base font-sans">
                        {{ branch.branchName.toUpperCase() }}
                      </h2>
                    </li>
                  </template>
                </ul>
              </div>
            </aside>
            <aside class="rounded-lg bg-[#efefef] p-2">
              <section>
                <table class="w-full text-sm md:text-base">
                  <tbody>
                    <!-- Branch Name -->
                    <tr class="font-sans font-medium">
                      <td
                        class="pr-4 pb-2 text-start font-bold whitespace-nowrap"
                      >
                        Branch Name:
                      </td>
                      <td class="pb-2 font-sans">
                        {{ branchData?.branchName?.toUpperCase() }}
                      </td>
                    </tr>
                    <!-- Address -->
                    <tr>
                      <td
                        class="pr-4 pb-2 text-start  font-bold whitespace-nowrap"
                      >
                        Address:
                      </td>
                      <td class="pb-2 font-sans font-medium">
                        {{ branchData?.street }}
                      </td>
                    </tr>
                    <!-- Google Maps -->
                    <tr>
                      <td
                        class="pr-4 pb-2 text-start  font-bold whitespace-nowrap"
                      >
                        Google Maps:
                      </td>
                      <td class="pb-2">
                        <button class="text-blue-500 underline">
                          <a :href="branchData?.location" target="_blank">
                            View on Google Maps
                          </a>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <!-- Branch Image -->
              <section class="mt-4">
                <div
                  class="h-60 w-full md:h-96 rounded-md overflow-hidden flex items-center justify-center bg-gray-100"
                >
                  <img
                    :src="branchData?.branchImage"
                    alt="Branch Image"
                    class="h-full w-full object-cover"
                  />
                </div>
              </section>
            </aside>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const closeViewBranchDetails = ref("");
const URL = import.meta.env.VITE_BASE_URL;
const animateClass = ref("");
const props = defineProps({
  isBranchDetailsModalOpen: { type: [Boolean], default: false },
  branchDetails: { type: [Array], default: null },
  cityName: { type: [String], default: "Bangalore" },
});
const { isBranchDetailsModalOpen, branchDetails, cityName } = props;
const emit = defineEmits(["closeViewBranchDetails"]);
const closeModal = () => {
  emit("closeViewBranchDetails");
};
watch(
  () => props.isBranchDetailsModalOpen,
  () => {
    animateClass.value = "animate-browsein delay-200 block";
  }
);
const branchData = ref(null);
const seeBranchData = (data, index) => {
  branchData.value = data;
  activeIndex.value = index;
};
onMounted(() => {
  branchData.value = branchDetails?.courses[0]?.branches[0];
});
const activeIndex = ref(0);
const activeClass = index => {
  if (activeIndex.value == index) {
    console.log(index, activeIndex.value);
    return "border border-2 activeBorder";
  } else {
    return "border-transparent border-2";
  }
};
</script>

<style scoped>
.activeBorder {
  border-color: #f5a25d;
}
@media (max-width: 768px) {
  table {
    font-size: 0.875rem;
  }
}
</style>
