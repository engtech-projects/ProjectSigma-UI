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
    personelActionNotice.value.employee_id = employeeId.id
    personelActionNotice.value.employee = employee.fullname
}
const setApplicant = (applicant) => {
    console.log(applicant)
    pan.personelActionNotice.pan_job_applicant_id = applicant.id
}
</script>
<template>
    <div v-if="personelActionNotice.type === 'New Hire'" class="p-2">
        <SearchBarPan @search-changed="setApplicant" />
    </div>
    <div v-else class="p-2">
        <SearchBar @search-changed="setEmployee" />
    </div>
</template>
