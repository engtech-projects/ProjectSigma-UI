<script setup>
import { useApprovalStore } from "@/stores/hrms/setup/approvals"

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
            <HrmsSetupApprovalsForm v-show="!isEdit" />
        </div>
    </LayoutAcessContainer>
</template>
