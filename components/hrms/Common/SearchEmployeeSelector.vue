<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useEnumsStore } from "@/stores/hrms/enum"
import { useEmployeeSearch } from "@/stores/hrms/employeeSearch"
import type { EmployeeInformation } from "~/stores/hrms/employee"
defineProps({
    title: {
        type: String,
        required: false,
        default: "Employee Name",
    }
})
const enums = useEnumsStore()
const { allEmployeeEnum } = storeToRefs(enums)
onMounted(() => {
    if (!allEmployeeEnum.value.isLoaded) {
        enums.getEmployeeEnum()
    }
})
const model = defineModel({ required: false, type: Number, default: null })
const employeeSearch = useEmployeeSearch()
employeeSearch.searchEmployees()
const { employeesAll } = storeToRefs(employeeSearch)
const employeeId = ref<EmployeeInformation>({} as EmployeeInformation)
watch(employeeId, (newValue) => {
    if (newValue) {
        model.value = newValue.id
    } else {
        model.value = null
    }
})
</script>
<template>
    <div>
        <label
            for="employee_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ title }}
        </label>
        <LayoutFormPsSelectSearch
            v-model:result="employeeId"
            v-model:search-input="employeesAll.params.key"
            :search-list="employeesAll.list"
            :loading="employeesAll.isLoading"
            title="fullname_last"
            placeholder="Search Employee"
        />
    </div>
</template>
