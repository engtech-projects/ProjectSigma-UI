<template>
  <div>
    <!-- <Table /> -->
    test
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
  meta: [{ name: "description", content: "Personnel Action Form" }],
});
</script>

