<template>
  <section>
    <div
      class="w-full object-cover bg-slate-400 sm:h-72 md:h-[40vh] lg:h-[70vh] xl:h[70vh] 2xl:h-[70vh] overflow-clip"
    >
      <img :src="coverImage" alt="" class="w-full" />
    </div>
    <!-- <div class="lg:flex items-center justify-between gap-2 p-2">
      <section
        class="font-bold text-[#F96E2A] text-2xl basis-[10%] flex items-center lg:justify-center justify-start"
      >
        QSpiders
      </section>
      <section class="basis-[90%]">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam veniam
        aut possimus vel incidunt! Autem possimus provident animi saepe, maxime
        nesciunt corrupti quos nostrum aspernatur nihil earum enim, dignissimos
        a maiores ducimus eveniet! Perspiciatis officia non dolorum nesciunt.
        Earum nulla a tempore culpa error qui repellat dignissimos asperiores ut
        aut, incidunt rem provident! Ut nihil eum deleniti totam quod magnam
        dolore, labore, dignissimos, sint voluptates veritatis ipsam possimus.
        Voluptates in libero cupiditate modi veritatis! Numquam ipsum beatae
        maxime? Est dolorem cupiditate placeat libero suscipit quasi rem
        doloribus ipsa, recusandae ut. Ex omnis delectus repudiandae officia.
        Temporibus quibusdam qui accusamus, deserunt porro inventore voluptatem
        autem, aliquam veritatis vitae dolorem aliquid officiis rem id odit.
        Quidem, dicta nulla? Itaque fugiat dicta corrupti, laboriosam ad quos
        expedita minus labore
      </section>
    </div> -->
  </section>
</template>

<script setup>
defineProps({
  coverImage: { default: null },
});
</script>

<style scoped></style>
