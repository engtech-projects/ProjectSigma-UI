<script setup>
useHead({
    title: "Department Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_schedule_department,
        ])"
    >
        <div>
            <div class="text-2xl font-normal mb-4 mt-10 md:mt-0 ">
                Department Schedule
            </div>
            <hr>
            <div>
                <HrmsScheduleDept />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
