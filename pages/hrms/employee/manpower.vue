<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
import { useUserStore } from "@/stores/hrms/setup/users"
import { useEnumsStore } from "@/stores/hrms/enum"

const enums = useEnumsStore()
const manpowers = useManpowerStore()
const user = useUserStore()
const { isEdit } = storeToRefs(manpowers)
manpowers.getManpower()
manpowers.getMyRequests()
manpowers.getMyApprovalRequests()
enums.getPositionEnums()
enums.getDepartmentEnums()
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
