<script setup lang="ts">
useHead({
    title: "Daily Time Record V2",
    meta: [
        { name: "description", content: "" }
    ],
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_dtr,
        ])"
    >
        <div class="mt-10 md:mt-0 md:flex gap-2">
            <div class="w-full md:w-1/3">
                <HrmsEmployee201SearchProfile />
            </div>
            <HrmsAttendanceDtrV2InOut />
        </div>
    </LayoutAcessContainer>
</template>
