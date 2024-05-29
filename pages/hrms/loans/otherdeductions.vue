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

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_loans_and_advances_other_deductions,
        ])"
    >
        <div>
            <HrmsLoansDeductionsForm @stored="stored" />
            <HrmsLoansDeductionsTable :tofetch="toFetchDeductions" @fetched="toFetchDeductions=false" />
        </div>
    </LayoutAcessContainer>
</template>
