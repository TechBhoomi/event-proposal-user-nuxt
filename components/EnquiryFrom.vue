<template>
  <div class="p-4 mb-2">
    <section>
      <Notivue v-slot="item" :position="toastPosition" :theme="materialTheme">
        <Notification :item="item" />
      </Notivue>
    </section>
    <h2 class="text-3xl p-2 font-bold font-lexend text-center">Enquiry Form</h2>
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md m-auto">
      <form @submit.prevent="handleSubmit">
        <!-- Name -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            id="name"
            v-model="name"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your Name"
            required
          />
        </div>
        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="name@example.com"
            required
          />
        </div>
        <!-- Mobile -->
        <div class="mb-4">
          <label for="mobile" class="block text-sm font-medium text-gray-700"
            >Mobile</label
          >
          <input
            type="tel"
            id="mobile"
            v-model="mobile"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your Mobile Number"
            required
          />
        </div>
        <!-- Message -->
        <div class="mb-4">
          <label for="message" class="block text-sm font-medium text-gray-700"
            >Message</label
          >
          <textarea
            id="message"
            v-model="message"
            rows="4"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your Message"
            required
          ></textarea>
        </div>
        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F96E2A] focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useGlobalStore } from "~/store/globalStore";
const STORE = useGlobalStore();
const name = ref("");
const email = ref("");
const mobile = ref("");
const message = ref("");
const handleSubmit = async () => {
  const apiBody = {
    name: name.value,
    email: email.value,
    mobile: mobile.value,
    message: message.value,
  };
  const toastPosition = ref("top-right");
  const response = await STORE.postEnquiry(apiBody);
  if ([200, 201, 202].includes(response.status)) {
    // name.value = "";
    // email.value = "";
    // mobile.value = "";
    // message.value = "";
    push.success("Enquiry form submitted successfully!",{ timeout: 100 });
  } else {
    push.error("Something went wrong please try again!");
  }
  // Handle form submission logic here
  // console.log("Form submitted:", {
  //   name: name.value,
  //   email: email.value,
  //   mobile: mobile.value,
  //   message: message.value,
  // });
};
</script>
