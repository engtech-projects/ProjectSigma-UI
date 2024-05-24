<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_reports,
        ])"
    >
        <div
            class="w-full"
        >
            <div class="text-2xl font-normal mb-4 mt-0  ">
                Reports
            </div>
            <hr>
            <div>
                <HrmsReportsDisplay />
            </div>
        </div>
    </LayoutAcessContainer>
</template>

<script setup lang="ts">
useHead({
    title: "Reports",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
