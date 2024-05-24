<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_201,
        ])"
    >
        <div class="w-full">
            <div class="text-2xl font-normal mb-4 mt-10 md:mt-0">
                Employees Record
            </div>
            <div>
                <HrmsEmployee201TabComp />
            </div>
        </div>
    </LayoutAcessContainer>
</template>

<script setup>
useHead({
    title: "201",
})
</script>
