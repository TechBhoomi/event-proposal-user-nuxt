<template>
  <div class="p-2">
    <section>
      <h1 class="lg:text-3xl text-xl font-bold">Curriculum</h1>
    </section>
    <article class="rounded-md bg-[#FFE6C7] pt-2 pb-4">
      <h2 class="font-bold text-base w-full text-center p-2">
        Software Testing With Java Automation <span>-3 Months</span>
      </h2>
      <section class="lg:grid grid-cols-3 gap-2 p-2">
        <div class="border-2 rounded-lg overflow-hidden bg-[#fff]">
          <h2 :class="headingStyles">Subjects Covered</h2>
          <div :class="courseBlock">
            <ul>
              <li v-for="sub in subjects" :key="sub">{{ sub }}</li>
            </ul>
          </div>
        </div>
        <div class="border-2 rounded-lg overflow-hidden bg-[#fff]">
          <h2 :class="headingStyles">Modules</h2>
          <div>
            <div :class="courseBlock" class="module_block">
              <div v-for="module in modules" :key="module">
                <h3 class="font-semibold underline underline-offset-2">
                  {{ module.module }}
                </h3>
                <ul class="pl-7">
                  <li
                    v-for="sub in module.subject"
                    :key="sub"
                    class="font-normal topics"
                  >
                    {{ sub }}
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <button class="w-full bg-[#6EACDA] p-1 rounded-md">
                Download Pdf
              </button>
            </div>
          </div>
        </div>
        <div class="border-2 rounded-lg overflow-hidden bg-[#fff]">
          <h2 :class="headingStyles">Testimonials</h2>
          <div :class="courseBlock">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
            quidem minima a vel, incidunt facere odit excepturi fugiat
            recusandae tenetur iure fugit animi deserunt repellendus voluptatum
            laboriosam beatae sed deleniti non. Doloremque perferendis magnam
            laboriosam rerum exercitationem quas tempora nisi et fugiat a nihil,
            dolore autem magni fuga, iusto laborum. At odio vitae distinctio
            eaque inventore ducimus tenetur aspernatur officia nisi eum.
            Voluptate aliquid beatae quibusdam quis quaerat fuga tempore sed
            impedit. Provident totam magnam enim ad facere nam non unde id,
            vitae ex sequi nihil exercitationem voluptatum delectus modi itaque
            ullam amet deserunt numquam ipsum recusandae nulla quas. Eius!
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
let subjects = reactive([
  "Manual Testing",
  "Database SQL",
  "JAVA",
  "Selanium",
  "Aptitude",
  "Spoken English",
]);
const modules = reactive([
  {
    module: "Basic Concepts",
    subject: [
      "Variables and Data Types",
      "Constants",
      "Input and Output",
      "Comments",
      "Syntax and Semantics",
    ],
  },
  {
    module: " Data Structures",
    subject: [
      "Arrays",
      "Strings",
      "Lists",
      "Stacks and Queues",
      "Dictionaries/HashMaps",
      "Sets",
      "Trees and Graphs (Advanced)",
    ],
  },
]);
const headingStyles = computed(() => {
  return "p-2 font-bold text-base bg-[#FF8343] rounded-sm text-[#FFFF]";
});
const courseBlock = computed(
  () =>
    "h-[32vh] sm:h-[40vh] md:h-[40vh] xs:h-[40vh] overflow-auto p-2 bg-[#fff]"
);
</script>

<style scoped>
.topics {
  list-style: disc;
  text-decoration: none !important;
}
.module_block {
  overflow-y: scroll; /* Ensure the element is scrollable */
}

.module_block::-webkit-scrollbar {
  width: 8px;
}

.module_block::-webkit-scrollbar-thumb {
  background: #B2B2B2; /* Blue scrollbar thumb */
  border-radius: 10px;
}

.module_block::-webkit-scrollbar-track {
  background: #ecf0f1; /* Light grey track */
}

ul > li {
  padding: 0.2rem;
}
</style>
