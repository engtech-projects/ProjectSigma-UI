<script setup lang="ts">
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
            <HrmsEmployeePanPersonnelActionForm />
            <HrmsEmployeePanPersonnelActionFormList />
        </div>
    </div>
</template>
