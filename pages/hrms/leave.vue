<template>
    <div>
        <HrmsLeaveForm />
        <HrmsLeaveTable />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: "default",
})
useHead({
    title: "Leave",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
