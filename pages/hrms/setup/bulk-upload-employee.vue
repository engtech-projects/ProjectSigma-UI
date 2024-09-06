<script setup>

useHead({
    title: "Bulk Upload Employee",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            'AdminOnly',
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <HrmsSetupBulkuploadsForm />
        </div>
    </LayoutAcessContainer>
</template>
