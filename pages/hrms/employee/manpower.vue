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
departments.getDepartmentList()
user.getUserEmployees()

useHead({
    title: "Manpower Request",
})

</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-2 gap-4">
        <div>
            <EmployeeManpowerAddRequest v-show="!isEdit" />
            <EmployeeManpowerEditRequest v-show="isEdit" />
        </div>
        <div>
            <EmployeeManpowerMonitoringList />
        </div>
    </div>
</template>
