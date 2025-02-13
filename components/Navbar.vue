<template>
  <nav
    class="bg-[#f5861f] text-[#2F3645] border-b-[0.1rem] border-b-[#2f36454f] w-full p-2"
  >
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between lg:h-10 h-10 w-full">
        <div class="">
          <a
            href="#"
            class="sm:text-base lg:text-2xl font-bold lg:pl-4 pl-2 text-white font-lexend"
          >
            QSpiders
          </a>
        </div>

        <div class="flex lg:hidden">
          <button @click="toggleMenu">
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                v-if="!isMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="hidden lg:flex space-x-4 gap-4">
          <!-- <a
            v-for="(menu, index) in menuItems"
            :key="index"
            :href="`${
              menu == 'home'
                ? uuid
                : '#' + menu.toLowerCase().trim().replace(/ /g, '_')
            }`"
            class="px-3 text-sm capitalize whitespace-nowrap font-sans font-semibold text-white"
            >{{ menu }}</a
          > -->
          <a
            v-for="(menu, index) in menuItems"
            :key="index"
            :href="`#${menu.path}`"
            class="text-sm flex items-center justify-center w-full gap-4 group relative whitespace-nowrap font-sans font-semibold text-white"
          >
            <span>{{ menu.name }}</span>
            <span
              class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-white group-hover:w-3/6"
            ></span>
            <span
              class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-white group-hover:w-3/6"
            ></span>
          </a>
        </div>
      </div>
    </div>

    <div
      v-if="isMenuOpen"
      class="lg:hidden bg-[#EEEEEE] absolute right-0 w-full z-40"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          v-for="(menu, index) in menuItems"
          :key="index"
          :href="`${'#' + menu.toLowerCase().trim().replace(/ /g, '_')}`"
          class="block hover:bg-blue-500 px-3 py-2 rounded-md text-base font-semibold capitalize"
          >{{ menu }}</a
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

defineProps({
  menuItems: {
    type: Array,
    default: () => [],
  },
  uuid: {
    type: [String, Number],
    required: true,
  },
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
