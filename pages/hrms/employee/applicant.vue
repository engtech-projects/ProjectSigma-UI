<script setup>
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
import { useDepartmentStore } from "@/stores/hrms/setup/departments"
import { useUserStore } from "@/stores/hrms/setup/users"

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
