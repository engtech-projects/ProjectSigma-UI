<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { useEmployeeSearch } from "@/stores/hrms/employeeSearch"
import type { EmployeeInformation } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()
const employeeSearch = useEmployeeSearch()
employeeSearch.searchEmployees()
const { searchEmployeeParams, searchResultList } = storeToRefs(employeeSearch)
const employeeId = ref<EmployeeInformation>({} as EmployeeInformation)
const emit = defineEmits(["searchChanged"])
watch(employeeId, async (newValue) => {
    if (newValue) {
        await employee.getEmployeeInformation(newValue.id)
        emit("searchChanged", newValue)
    }
})
</script>
<template>
    <LayoutFormPsSelectSearch v-model:result="employeeId" v-model:search-input="searchEmployeeParams.key" :search-list="searchResultList" title="fullname_last" />
</template>
