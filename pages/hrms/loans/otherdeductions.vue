<template>
    <div>
        <HrmsLoansDeductionsForm />
        <HrmsLoansDeductionsTable />
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    layout: "default",
}),

useHead({
    title: "Other Deductions",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
