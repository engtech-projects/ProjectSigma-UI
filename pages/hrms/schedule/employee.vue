<script setup>
import { onMounted } from 'vue'
import { initFlowbite, initTabs } from 'flowbite'

onMounted(() => {
    initFlowbite();
    initTabs();
})

definePageMeta({
  layout: "default",
}),
  useHead({
    title: "Employee Schedule",
    meta: [{ name: "description", content: "" }],
  });
</script>

<template>
  <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
    Employee Schedule
  </div>
    <hr>

  <div>
    <HrmsScheduleEmployee />
  </div>
</template>