<script setup>

import { storeToRefs } from "pinia"
import { useApprovalStore } from "@/stores/inventory/setup/approvals"
import { useEnumsStore } from "@/stores/inventory/enum"

const approvals = useApprovalStore()
const { isEdit } = storeToRefs(approvals)
approvals.getApproval()

const enums = useEnumsStore()
await enums.getUserEmployeeEnums()

useHead({
    title: "Approvals",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_setup_approvals,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <InventorySetupApprovalsForm v-show="!isEdit" />
        </div>
    </LayoutAcessContainer>
</template>
