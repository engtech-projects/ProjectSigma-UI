<script setup>
import { useEmployeeSearch } from "@/stores/hrms/employeeSearch"
const employeeSearch = useEmployeeSearch()
employeeSearch.searchEmployeesNoAccount()
useHead({
    title: "User Accounts",
    meta: [{ name: "description", content: "" }],
})

</script>
<template>
    <div class="md:grid grid-cols-2 gap-2">
        <HrmsSetupUserAccountsCreateUser />
        <HrmsSetupUserAccountsUserAccessibilities />
    </div>
</template>
