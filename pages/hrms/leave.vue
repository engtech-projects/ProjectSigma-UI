<script setup>
import { useEmployeeInfo } from "~/stores/hrms/employee"
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"
import { useEnumsStore } from "@/stores/hrms/enum"
import { useLeaveStore } from "@/stores/hrms/setup/leaves"

const enums = useEnumsStore()
enums.getDepartmentEnums()

const leaveRequest = useLeaveRequest()
leaveRequest.allLeaves()
leaveRequest.allApprovals()

const leaves = useLeaveStore()
leaves.getLeave()

useHead({
    title: "Leave",
    meta: [
        { name: "description", content: "" }
    ],
})
</script>

<template>
    <div class="w-full flex p-2">
        <div class="md:w-3/5 p-2 w-full">
            <HrmsLeaveForm />
        </div>
        <div class="md:w-2/5 p-2 w-full">
            <HrmsLeaveAllList />
            <HrmsLeaveApprovalList />
        </div>
    </div>
</template>
