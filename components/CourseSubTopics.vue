<template>
  <div class="w-full" v-if="isSubTopicModalOpen">
    <div
      id="crypto-modal"
      tabindex="-1"
      class="overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 max-h-full flex items-center justify-center rounded-lg p-6 shadow-lg backdrop-blur-sm bg-[#00000033]"
      @click="closeModal"
    >
      <div class="relative p-4 w-3/4 max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 gap-2"
          >
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ courseName }}
            </h3>
            <button
              type="button"
              @click="closeModal"
              class="text-red-300 bg-transparent hover:bg-gray-200 hover:text-red-500 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crypto-modal"
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
          <!-- Modal body -->
          <div>
          </div>
          <div class="p-4 md:p-5 overflow-y-auto h-[calc(100vh-20vh)]">
            <section v-if="subjectData.length>0">
              <div v-for="module in subjectData[0]?.topics" :key="module">
                <h3
                  class="font-semibold text-xl text-[#FC6736] whitespace-nowrap w-full"
                >
                  {{ module?.name }}
                </h3>
                <ul class="pl-7">
                  <li
                    v-for="sub in module?.subtopics"
                    :key="sub"
                    class="topics text-base font-medium"
                  >
                    {{ sub?.name }}
                  </li>
                </ul>
              </div>
            </section>
            <section v-else>
              <div>
                <h2 class="text-lg font-semibold text-red-600">
                  No Course Data Found!
                </h2>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isSubTopicModalOpen: { required: true, type: Boolean },
  subjectData: { type: [Array, Object] },
  courseName: { type: String, required: true },
});
const { isSubTopicModalOpen, subjectData, courseName } = props;
const emit = defineEmits(["closeSubTopicModal"]);
const closeModal = () => {
  emit("closeSubTopicModal");
};
</script>

<style scoped></style>
