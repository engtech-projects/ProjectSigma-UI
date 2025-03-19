<script setup>

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_GROUP,
        ])"
    >
        <div class="flex flex-col gap-4">
            <ProjectsDetails />
        </div>
    </LayoutAcessContainer>
</template>
