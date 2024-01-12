<template>
    <div>
        <HrmsSetupLeavesForm />
        <HrmsSetupLeavesTable />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
}),

useHead({
    title: "Leaves",
})
</script>
