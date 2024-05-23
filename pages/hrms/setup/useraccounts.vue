<script setup>
import { useAccessbilities } from "@/stores/hrms/accessibilities"
import { useEmployeeSearch } from "@/stores/hrms/employeeSearch"
import { useUserStore } from "@/stores/hrms/setup/users"
const accessbilities = useAccessbilities()
const users = useUserStore()
const optionType = ref("create")
accessbilities.getListIfEmpty()
const employeeSearch = useEmployeeSearch()
employeeSearch.searchEmployeesNoAccount()
const populateEmployee = () => {
    if (optionType.value === "create") {
        users.isEdit = false
        employeeSearch.searchEmployeesNoAccount()
    }
    if (optionType.value === "update") {
        users.isEdit = true
        employeeSearch.searchEmployeesWithAccount()
    }
}
useHead({
    title: "User Accounts",
    meta: [{ name: "description", content: "User Accounts Creation Page" }],
})

</script>
<template>
    <div class="w-full">
        <div class="md:flex gap-2 space-x-2 p-2">
            <input
                id="newhire"
                v-model="optionType"
                class=""
                type="radio"
                value="create"
                @change="populateEmployee()"
            >
            <label
                for="newhire"
                class="mr-4 text-xs text-gray-900 dark:text-gray-300"
            >CREATE USER</label>
            <input
                id="termination"
                v-model="optionType"
                class=""
                type="radio"
                value="update"
                @change="populateEmployee()"
            >
            <label
                for="termination"
                class="mr-4 text-xs text-gray-900 dark:text-gray-300"
            >EDIT USER</label>
        </div>
        <div class="md:grid grid-cols-2 gap-2">
            <HrmsSetupUserAccountsCreateUser
                v-if="optionType === 'create'"
                class="w-full"
            />
            <HrmsSetupUserAccountsEditUser
                v-if="optionType === 'update'"
                class="w-full"
            />
            <HrmsSetupUserAccountsUserAccessibilities
                class="w-full"
            />
        </div>
    </div>
</template>
