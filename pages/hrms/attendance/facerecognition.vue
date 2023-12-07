<script setup lang="ts">
  definePageMeta({
    layout: "default",
  }),
    useHead({
      title: "Face Login",
      meta: [{ name: "description", content: "" }],
      bodyAttrs: {
        class: "login",
      },
    });
</script>

<template>
  <div class="shadow-md p-4 mt-10 md:mt-0 bg-white mb-3 border border-gray-300 rounded-lg w-full md:w-3/5 flex flex-col justify-center mx-auto">
    <h5 class="flex gap-3 justify-center mx-auto text-2xl text-center font-medium text-gray-900 dark:text-white ">
        <Icon
        name="material-symbols-light:familiar-face-and-zone"
        color="black"
        class="w-8 h-8"
      /> Setup Face Recognition
      <!-- <img class="w-8 flex justify-center items-center mx-auto" src="/evenpar.jpg" alt="logo" /> -->
    </h5>

    <div>
      <SearchBar class=" flex-1 shrink-0 mx-auto p-8 w-full md:w-3/5"/>
    </div>

    <div>
      <HrmsAttendanceFaceDetection />
    </div>

  </div>
</template>
  
