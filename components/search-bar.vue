<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { useEmployeeSearch } from "@/stores/hrms/employeeSearch"
import type { EmployeeInformation } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()
const employeeSearch = useEmployeeSearch()
employeeSearch.searchEmployees()
const { searchEmployeeParams, searchResultList } = storeToRefs(employeeSearch)
const employeeInfo = ref<EmployeeInformation>({} as EmployeeInformation)
const emit = defineEmits(["searchChanged"])
watch(employeeInfo, async (newValue) => {
    if (newValue?.id) {
        await employee.getEmployeeInformation(newValue.id)
        emit("searchChanged", newValue)
    } else {
        employee.$reset()
    }
})
</script>
<template>
    <LayoutFormPsSelectSearch v-model:result="employeeInfo" v-model:search-input="searchEmployeeParams.key" :search-list="searchResultList" title="fullname_last" placeholder="Search Employee" />
</template>
