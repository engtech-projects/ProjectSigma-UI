<script setup>

import { storeToRefs } from "pinia"
import { useApprovalStore } from "@/stores/hrms/approvals"
import { useUserStore } from "@/stores/hrms/users"

const approvals = useApprovalStore()
const users = useUserStore()
const { isEdit } = storeToRefs(approvals)
approvals.getApproval()
users.getUserEmployees()

useHead({
    title: "Approvals",
})
</script>

<template>
    <div class="flex flex-col md:flex-row gap-4">
        <HrmsSetupApprovalsForm v-show="!isEdit" />
    </div>
</template>
