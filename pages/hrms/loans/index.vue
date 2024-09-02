<script setup lang="ts">
useHead({
    title: "Loans",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_loans_and_advances_loans,
        ])"
    >
        <div>
            <HrmsLoansForm />
            <HrmsLoansTable />
        </div>
    </LayoutAcessContainer>
</template>
