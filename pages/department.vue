<script setup>

definePageMeta({
  layout: "default",
}),
  useHead({
    title: "Department",
    meta: [{ name: "description", content: "" }],
  });
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>

<template>
  <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-2">
    <HrmsDepartmentCategory />

    <HrmsDepartmentNewDepartment />
  </div>
  <div class="container mx-auto mt-2">
    <HrmsDepartmentList />
  </div>
</template>
