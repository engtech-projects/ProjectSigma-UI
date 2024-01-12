<script setup>

definePageMeta({
    layout: "default",
})
useHead({
    title: "Approvals",
    meta: [{ name: "description", content: "" }],
})
</script>

<template>
    <div>
        <div class="flex flex-col mt-10 md:mt-0 md:flex-row gap-6">
            <HrmsSetupApprovalsForm />
        </div>
        <div class="container mx-auto mt-8" />
    </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
