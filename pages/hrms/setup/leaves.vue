<script setup>

import { storeToRefs } from "pinia"
import { useLeaveStore } from "@/stores/hrms/leaves"

const leaves = useLeaveStore()
const { isEdit } = storeToRefs(leaves)
leaves.getLeave()

useHead({
    title: "Leaves",
})
</script>

<template>
    <div class="flex flex-col md:flex-row gap-4">
        <HrmsSetupLeavesForm v-show="!isEdit" />
        <HrmsSetupLeavesEditForm v-show="isEdit" />
        <HrmsSetupLeavesTable />
    </div>
</template>
