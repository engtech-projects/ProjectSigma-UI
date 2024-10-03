<script setup lang="ts">
useHead({
    title: "Daily Time Record V1",
    meta: [
        { name: "description", content: "" }
    ],
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.admin,
        ])"
    >
        <div class="mt-10 md:mt-0 md:flex gap-2">
            <div class="w-full md:w-1/3">
                <HrmsEmployee201SearchProfile />
            </div>
            <HrmsAttendanceDtrV1InOut />
        </div>
    </LayoutAcessContainer>
</template>
