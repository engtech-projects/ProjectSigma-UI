<script setup>
import { useApprovalStore } from "@/stores/accounting/approvals"

const approvals = useApprovalStore()
const { isEdit } = storeToRefs(approvals)
approvals.getApproval()

useHead({
    title: "Approvals",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_approvals,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupApprovalsForm v-show="!isEdit" />
        </div>
    </LayoutAcessContainer>
</template>
