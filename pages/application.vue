<template>
  
  <EvenparHeader />

    <div class="grid grid-cols-3 p-2 mt-6">
      <div class="text-lg lg:text-2xl font-normal text-left mb-4 col-span-2">
      EMPLOYMENT APPLICATION FORM
    </div>
    
    <div class="flex items-center justify-center mb-10 border-2 rounded-md">
      <Fileinput class="inline-block p-2 mt-4" />
      </div>

      <div class="flex items-center">
        <div class="italic">
        EMPLOYEE INFORMATION
        </div>
      </div>
      <span class="block text-center text-[12px] text-red-700">(note: please do not leave blank spaces. Write N/A for not applicable)</span>

    </div>
    <div class="rounded-md p-2 mt-4 ">
      <EmployeeInfo />
    </div>
    
    <div class="grid grid-cols-3 p-2 mt-6">
      <div class="flex items-center">
        <div class="italic">
        EDUCATION
        </div>
      </div>
    </div>
    <div class="rounded-md p-2 mt-4 ">
      <EmployeeEducation />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "shell",
}),
  useHead({
    title: "Employment Application",
    meta: [{ name: "description", content: "New Employee" }],
  });
</script>
