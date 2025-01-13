<template>
  <nav
    class="bg-[#EEEEEE] text-[#2F3645] border-b-[0.1rem] border-b-[#2f36454f] sticky top-0 z-50"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex items-center lg:justify-end justify-between lg:h-10 h-10"
      >
        <!-- Brand -->
        <div class="flex items-center">
          <a href="#" class="lg:text-2xl text-base font-bold lg:hidden">Menu</a>
        </div>

        <!-- Hamburger Menu -->
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

        <!-- Desktop Menu -->
        <div class="hidden lg:flex space-x-4">
          <a
            v-for="(menu, index) in menuItems"
            :key="index"
            :href="`${menu == 'home' ? uuid : '#' + menu}`"
            class="hover:text-[#F96E2A] px-3 text-sm font-medium capitalize whitespace-nowrap"
            >{{ menu }}</a
          >
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMenuOpen"
      class="lg:hidden bg-[#EEEEEE] absolute right-0 w-full z-40"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          v-for="(menu, index) in menuItems"
          :key="index"
          href="#"
          class="block hover:bg-blue-500 px-3 py-2 rounded-md text-base font-medium capitalize"
          >{{ menu }}</a
        >
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

// Reactive state to track menu visibility
const isMenuOpen = ref(false);

// Prop to accept menu items
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

// Function to toggle the mobile menu visibility
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>
