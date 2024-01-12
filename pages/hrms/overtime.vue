<template>
    <div>
        <HrmsOvertimeForm />
        <HrmsOvertimeTable />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: "default",
}),

useHead({
    title: "Overtime",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
