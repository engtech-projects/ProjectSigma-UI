<script setup lang="ts">
definePageMeta({
    layout: "default",
})
useHead({
    title: "Personal Action Notice",
})
</script>

<template>
    <div>
        <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
            Personnel Action Form
        </div>
        <hr>
        <div class="flex gap-4">
            <EmployeePersonnelActionForm />
            <EmployeePersonnelActionFormList />
        </div>
    </div>
</template>
