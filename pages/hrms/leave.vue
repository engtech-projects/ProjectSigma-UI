<script setup>
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"
import { useEnumsStore } from "@/stores/hrms/enum"

const leaveRequest = useLeaveRequest()
leaveRequest.allLeaves()
leaveRequest.allApprovals()

const enums = useEnumsStore()
enums.getDepartmentEnums()

useHead({
    title: "Leave",
    meta: [
        { name: "description", content: "" }
    ],
})
</script>

<template>
    <div class="w-full flex p-2">
        <div class="md:w-1/2 p-2 w-full">
            <HrmsLeaveForm />
        </div>
        <div class="md:w-1/2 p-2 w-full">
            <HrmsLeaveAllList />
            <HrmsLeaveApprovalList />
        </div>
    </div>
</template>
