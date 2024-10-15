<script setup>
useHead({
    title: "Approvals",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_approvals,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <HrmsSetupApprovalsForm />
        </div>
    </LayoutAcessContainer>
</template>
