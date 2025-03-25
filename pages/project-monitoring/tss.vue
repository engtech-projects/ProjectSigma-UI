<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
projectStore.viewState = true
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_GROUP,
        ])"
    >
        <div class="flex flex-col gap-4">
            <ProjectsMydraftsDetails />
        </div>
    </LayoutAcessContainer>
</template>
