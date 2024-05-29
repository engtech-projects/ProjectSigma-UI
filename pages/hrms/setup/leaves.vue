<script setup>

import { storeToRefs } from "pinia"
import { useLeaveStore } from "@/stores/hrms/setup/leaves"

const leaves = useLeaveStore()
const { isEdit } = storeToRefs(leaves)
leaves.getLeave()

useHead({
    title: "Leaves",
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_leaves,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <HrmsSetupLeavesForm v-show="!isEdit" />
            <HrmsSetupLeavesEditForm v-show="isEdit" />
            <HrmsSetupLeavesTable />
        </div>
    </LayoutAcessContainer>
</template>
