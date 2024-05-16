<template>
    <div>
        <HrmsLoansDeductionsForm @stored="stored" />
        <HrmsLoansDeductionsTable :tofetch="toFetchDeductions" @fetched="toFetchDeductions=false" />
    </div>
</template>

<script setup lang="ts">
const toFetchDeductions = ref(false)
const stored = () => {
    toFetchDeductions.value = true
}
useHead({
    title: "Other Deductions",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
