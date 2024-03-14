<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { useJobapplicantStore } from "~/stores/employee/jobapplicant"

const pan = usePersonelActionNotice()
const employee = useEmployeeInfo()
const jobapplicant = useJobapplicantStore()
employee.$reset()
jobapplicant.$reset()
</script>
<template>
    <div v-if="pan.personelActionNotice.type === 'New Hire'" class="p-2">
        <SearchBarPan />
    </div>
    <div v-else class="p-2">
        <SearchBar />
    </div>
</template>
