<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.project_monitoring_dashboard,
        ])"
    >
        <div
            class="w-full"
        >
            Projects Dashboard
        </div>
    </LayoutAcessContainer>
</template>
