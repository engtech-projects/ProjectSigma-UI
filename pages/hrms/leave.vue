<script setup>
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"

useHead({
    title: "Leave",
    meta: [
        { name: "description", content: "" }
    ],
})
const leaveRequest = useLeaveRequest()
leaveRequest.allLeaves()
leaveRequest.allApprovals()
leaveRequest.allRequest()
</script>

<template>
    <div class="w-full flex p-2">
        <div class="md:w-2/3 p-2 w-full">
            <HrmsLeaveForm />
        </div>
        <div class="md:w-1/3 p-2 w-full">
            <HrmsLeaveAllLeaveList />
            <HrmsLeaveApprovalList />
            <HrmsLeaveMyLeaveList />
        </div>
    </div>
</template>
