<script setup>
import { useUserStore } from "@/stores/hrms/users"

const userAccountStore = useUserStore()
userAccountStore.getUserEmployees()

useHead({
    title: "Edit User Accounts",
    meta: [{ name: "description", content: "User Accounts Edit Page" }],
})
</script>
<template>
    <HrmsSetupUserAccountsEditUser />
</template>
