<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { useEmployeeSearch } from "@/stores/hrms/employeeSearch"
import type { EmployeeInformation } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()
const employeeSearch = useEmployeeSearch()
const { employeesAll } = storeToRefs(employeeSearch)
onMounted(() => {
    if (!employeesAll.value.isLoaded) {
        employeeSearch.searchEmployees()
    }
})
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
    <LayoutFormPsSelectSearch
        v-model:result="employeeInfo"
        v-model:search-input="employeesAll.params.key"
        :loading="employeesAll.isLoading"
        :search-list="employeesAll.list"
        title="fullname_last"
        placeholder="Search Employee"
    />
</template>
