<script setup>

import { storeToRefs } from "pinia"
import { useApprovalStore } from "@/stores/hrms/setup/approvals"
import { useEnumsStore } from "@/stores/hrms/enum"

const approvals = useApprovalStore()
const { isEdit } = storeToRefs(approvals)
approvals.getApproval()

const enums = useEnumsStore()
enums.getUserEmployeeEnums()

useHead({
    title: "Approvals",
})
</script>

<template>
    <div class="flex flex-col md:flex-row gap-4">
        <HrmsSetupApprovalsForm v-show="!isEdit" />
    </div>
</template>
