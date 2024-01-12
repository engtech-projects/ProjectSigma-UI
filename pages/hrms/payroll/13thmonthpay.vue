<template>
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <HrmsPayroll13thmonthTable />
        <HrmsPayroll13thmonthForm />
    </div>
</template>

<script  setup lang="ts">

definePageMeta({
    layout: "default",
})
useHead({
    title: "13th Month Pay",
})

</script>
