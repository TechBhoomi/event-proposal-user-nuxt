<template>
  <div class="w-full" v-if="isSubTopicModalOpen">
    <div
      id="crypto-modal"
      tabindex="-1"
      class="overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 max-h-full flex items-center justify-center rounded-lg p-6 shadow-lg backdrop-blur-sm bg-[#00000033]"
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
          <div class="p-4 md:p-5 overflow-y-auto h-[calc(100vh-20vh)]">
            <div class="accordion">
              <div
                v-for="(module, index) in subjectData[0]?.topics || []"
                :key="index"
                class="accordion-item"
              >
                <div
                  class="accordion-header flex items-center cursor-pointer"
                  @click="toggleAccordion(index)"
                >
                  <h2 class="text-xl font-semibold text-[#173B45]">
                    {{ module?.name }}
                  </h2>
                </div>
                <div v-if="isOpen(index)" class="accordion-content mt-2">
                  <ul class="pl-7">
                    <li
                      v-for="sub in module?.subtopics"
                      :key="sub"
                      class="topics text-base font-medium"
                    >
                      <div class="flex items-center gap-2">
                        <span>
                          <svg
                            class="h-4 w-4"
                            fill="#FF8343"
                            viewBox="0 0 256 256"
                            id="Flat"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#FF8343"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <path
                                d="M240,128c0,10.44238-7.51074,18.27441-14.1377,25.18457-3.77246,3.93359-7.67285,8-9.14648,11.56348-1.35449,3.27343-1.43652,8.69629-1.51562,13.93945-.14747,9.75879-.31446,20.81934-8.0044,28.50879-7.68945,7.68945-18.75,7.85644-28.5083,8.00391-5.24414.0791-10.667.16113-13.94043,1.51562-3.5625,1.47363-7.62988,5.374-11.5625,9.14648C146.27441,232.48926,138.44238,240,127.99951,240c-10.44238,0-18.27392-7.51074-25.18408-14.1377-3.93311-3.77246-8-7.67285-11.56348-9.14648-3.27295-1.35449-8.69531-1.43652-13.93945-1.51562-9.75879-.14747-20.81934-.31446-28.50879-8.00391s-7.85644-18.75-8.00391-28.50879c-.0791-5.24316-.16113-10.666-1.51562-13.93945-1.47363-3.56348-5.374-7.62989-9.14648-11.56348C23.51074,146.27441,16,138.44238,16,128s7.51074-18.27441,14.1377-25.18457c3.77246-3.93359,7.67285-8,9.14648-11.56348,1.35449-3.27343,1.43652-8.69629,1.51562-13.93945.14747-9.75879.31446-20.81934,8.0044-28.50879,7.68945-7.68945,18.75-7.85644,28.5083-8.00391,5.24414-.0791,10.667-.16113,13.94043-1.51562,3.5625-1.47363,7.62988-5.374,11.5625-9.14648C109.72559,23.51074,117.55762,16,128.00049,16c10.44238,0,18.27392,7.51074,25.18408,14.1377,3.93311,3.77246,8,7.67285,11.56348,9.14648,3.27295,1.35449,8.69531,1.43652,13.93945,1.51562,9.75879.14747,20.81934.31446,28.50879,8.00391s7.85644,18.75,8.00391,28.50879c.0791,5.24316.16113,10.666,1.51562,13.93945,1.47363,3.56348,5.374,7.62989,9.14648,11.56348C232.48926,109.72559,240,117.55762,240,128Z"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        <span> {{ sub?.name }}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isSubTopicModalOpen: { required: true, type: Boolean },
  subjectData: { type: [Array, Object] },
  courseName: { type: String, required: true },
});
const { isSubTopicModalOpen, subjectData, courseName } = props;
onMounted(() => {
  console.log(subjectData, "subjectData");
});
const emit = defineEmits(["closeSubTopicModal"]);
const closeModal = () => {
  emit("closeSubTopicModal");
};

// Manage accordion open state
const activeIndex = ref(null);

const toggleAccordion = index => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const isOpen = index => activeIndex.value === index;

// Icons for open/close
const openIcon = "Open";
const closeIcon = "Close";
</script>

<style scoped>
.accordion-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
  padding: 8px 16px;
  background: #f9f9f9;
}

.accordion-header {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.accordion-content {
  padding: 8px 0;
  border-top: 1px solid #ddd;
}
</style>
