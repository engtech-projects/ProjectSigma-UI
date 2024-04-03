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
leaveRequest.myRequest()
</script>

<template>
    <div class="w-full flex p-2">
        <div class="md:w-3/5 p-2 w-full">
            <HrmsLeaveForm />
        </div>
        <div class="md:w-2/5 p-2 w-full">
            <HrmsLeaveAllList />
            <HrmsLeaveApprovalList />
            <HrmsLeaveMyLeaveRequest />
        </div>
    </div>
</template>
