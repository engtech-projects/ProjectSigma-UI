<script setup>

useHead({
    title: "Approvals",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECT_MONITORING_SETUP_APPROVALS,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <ProjectsSetupApprovalsForm />
        </div>
    </LayoutAcessContainer>
</template>
