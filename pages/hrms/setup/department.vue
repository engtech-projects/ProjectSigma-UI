<script setup lang="ts">
import { useDepartmentStore } from '@/stores/departments';

// Create and use Pinia in the app
const departmentStore = useDepartmentStore();
usePinia(departmentStore);

definePageMeta({
  layout: "default",
  }),
  useHead({
    title: "Department",
  });


</script>


<template>

  <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-4">

    <HrmsDepartmentNewDepartment />
    <HrmsDepartmentList />

  </div>
  
</template>
