<script setup>
</script>
<template>
    <LayoutNavModuleGroup
        v-if="useCheckAccessibility([
            AccessibilityTypes.PROJECT_MONITORING_GROUP,
        ])"
        title="Project Monitoring"
    >
        <LayoutNavSingle
            v-if="useCheckAccessibility([
                AccessibilityTypes.PROJECT_MONITORING_MARKETING,
            ])"
            linkarea="/project-monitoring"
            icon="ic:baseline-space-dashboard"
            single-nav-title="Projects Dashboard"
        />
        <LayoutNavSingle
            v-if="useCheckAccessibility([
                AccessibilityTypes.PROJECT_MONITORING_MARKETING,
            ])"
            linkarea="/project-monitoring/marketing"
            icon="material-symbols:business-center"
            single-nav-title="Marketing"
        />
        <LayoutNavSingle
            v-if="useCheckAccessibility([
                AccessibilityTypes.PROJECT_MONITORING_TSS,
            ])"
            linkarea="/project-monitoring/technical-service"
            icon="material-symbols:linked-services"
            single-nav-title="Technical Service"
        />
    </LayoutNavModuleGroup>
</template>
