<template>
    <div class="text-2xl font-normal mb-4">
      Employees' Record
    </div>
    <div>
      <TabComp />
    </div>

</template>

<script setup>
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});

definePageMeta({
  layout: "default",
}),
  useHead({
    title: "Employees",
    meta: [{ name: "description", content: "STAFF INFORMATION SHEET" }],
  });
</script>

