<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useEmployeeSearch } from "@/stores/hrms/employeeSearch"
import { useUserStore } from "@/stores/hrms/setup/users"
import PsSelectSearch from "~/components/layout/Form/PsSelectSearch.vue"
import type { EmployeeInformation } from "@/stores/hrms/employee"
const employeeSearch = useEmployeeSearch()
const userAccountStore = useUserStore()
const { createData } = storeToRefs(userAccountStore)
const { searchEmployeeParamsNoAccount, searchResultList } = storeToRefs(employeeSearch)
const employeeId = ref<EmployeeInformation>({} as EmployeeInformation)
const snackbar = useSnackbar()
const register = async () => {
    createData.value.params.employee_id = employeeId.value.id
    try {
        // boardLoading.value = true
        await userAccountStore.createEmployeeAccount()
        snackbar.add({
            type: "success",
            text: createData.value.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        userAccountStore.$reset()
        employeeId.value = {} as EmployeeInformation
        // boardLoading.value = false
    }
}
</script>
<template>
    <section class="bg-gray-50 dark:bg-gray-900 mb-4">
        <div
            class="flex flex-col items-center justify-center mx-auto lg:py-0"
        >
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border-t-4 border-teal-400"
            >
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                    <img class="w-20 h-20 mx-auto rounded-xl" src="/evenpar.jpg" alt="logo">
                    <div class="border-b w-full h-[14px] text-center p-3 mt-2 mb-7">
                        <span class="text-md bg-white text-black px-3 italic">
                            User Account Setup
                        </span>
                    </div>

                    <form
                        class="space-y-4 md:space-y-6"
                        action="#"
                        @submit.prevent="register"
                    >
                        <PsSelectSearch v-model:result="employeeId" v-model:search-input="searchEmployeeParamsNoAccount.key" :search-list="searchResultList" title="fullname_last" />
                        <LayoutFormPsEmailInput v-model="createData.params.email" title="Email" name="email" placeholder="JohnDoe@gmail.com" />
                        <LayoutFormPsTextInput v-model="createData.params.name" title="Username" name="username" placeholder="JohnDoe" />
                        <LayoutFormPsPasswordInput v-model="createData.params.password" title="Password" name="password" placeholder="••••••••" />
                        <button
                            type="submit"
                            class="w-full text-white bg-cyan-600 hover:bg-secondary-base focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
