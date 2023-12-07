<script setup>

definePageMeta({
  layout: "default",
}),
  useHead({
    title: "Department Schedule",
    meta: [{ name: "description", content: "" }],
  });
</script>

<template>
  <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
    Department Schedule
  </div>
    <hr>

  <div>
    <HrmsScheduleDepartment />
  </div>
</template>