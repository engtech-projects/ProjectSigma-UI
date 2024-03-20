<script setup>
import { useManpowerStore } from "@/stores/employee/manpower"
import { useDepartmentStore } from "@/stores/hrms/departments"
import { useUserStore } from "@/stores/hrms/users"

const manpowers = useManpowerStore()
const departments = useDepartmentStore()
const user = useUserStore()

manpowers.getManpower()
manpowers.getManpowerHiringRequests()
departments.getDepartmentList()
user.getUserEmployees()

useHead({
    title: "Job Applicants",
})

</script>

<template>
    <div class="grid grid-flow-col gap-4">
        <HrmsEmployeeJobOpeningList />
    </div>
</template>
