<script setup>

useHead({
    title: "Division",
    meta: [{ name: "description", content: "" }],
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_division,
        ])"
    >
        <div>
            <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-6">
                <HrmsSetupDivisionNew />
            </div>
            <div class="container mx-auto mt-8">
                <HrmsSetupDivisionList />
            </div>
        </div>
    </LayoutAcessContainer>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
