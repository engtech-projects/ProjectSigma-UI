<script setup>

useHead({
    title: "Approvals",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_APPROVALS,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupApprovalsForm />
        </div>
    </LayoutAcessContainer>
</template>
