<script setup>
import { storeToRefs } from "pinia"
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { useJobapplicantStore } from "@/stores/hrms/employee/jobapplicant"

const pan = usePersonelActionNotice()
const employee = useEmployeeInfo()
const jobapplicant = useJobapplicantStore()

const { personelActionNotice } = storeToRefs(pan)
employee.$reset()
jobapplicant.$reset()
const setEmployee = (employeeId) => {
    personelActionNotice.value.employee_id = employeeId
    personelActionNotice.value.employee = employee.fullname
}
</script>
<template>
    <div v-if="personelActionNotice.type === 'New Hire'" class="p-2">
        <SearchBarPan />
    </div>
    <div v-else class="p-2">
        <SearchBar @search-changed="setEmployee" />
    </div>
</template>
