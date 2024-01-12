<template>
    <div>
        <HrmsLoansForm />
        <HrmsLoansTable />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: "default",
})
useHead({
    title: "Loans",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
