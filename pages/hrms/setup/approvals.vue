<script setup>

import { storeToRefs } from "pinia"
import { useApprovalStore } from "@/stores/approvals"

const approvals = useApprovalStore()
const { isEdit } = storeToRefs(approvals)
approvals.getApproval()

useHead({
    title: "Approvals",
})
</script>

<template>
    <div class="flex flex-col md:flex-row gap-4">
        <HrmsSetupApprovalsForm v-show="!isEdit" />
    </div>
</template>
