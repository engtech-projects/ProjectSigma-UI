<script setup>
useHead({
    title: "Employee Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_schedule_employee,
        ])"
    >
        <div class="w-full">
            <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
                Employee Schedule
            </div>
            <hr>
            <div>
                <HrmsScheduleEmp />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
