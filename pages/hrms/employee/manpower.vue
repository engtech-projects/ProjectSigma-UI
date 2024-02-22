<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/employee/manpower"
import { useDepartmentStore } from "@/stores/departments"
import { useUserStore } from "@/stores/hrms/users"

const departments = useDepartmentStore()
const manpowers = useManpowerStore()
const user = useUserStore()
const { isEdit } = storeToRefs(manpowers)
manpowers.getManpower()
manpowers.getMyRequests()
manpowers.getMyApprovalRequests()
departments.getDepartmentList()
user.getUserEmployees()

useHead({
    title: "Manpower Request",
})

</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <HrmsEmployeeManpowerAddRequest v-show="!isEdit" />
            <!-- <EmployeeManpowerEditRequest v-show="isEdit" /> -->
        </div>
        <div class="flex flex-col gap-2">
            <HrmsEmployeeManpowerMonitoringList />
            <HrmsEmployeeManpowerMyApprovals />
            <HrmsEmployeeManpowerMyRequests />
        </div>
    </div>
</template>
