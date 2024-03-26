<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useUserStore } from "@/stores/hrms/users"
import type { EmployeeInformation } from "@/stores/hrms/employee"

const userAccountStore = useUserStore()
const { editData } = storeToRefs(userAccountStore)
const employeeId = ref<EmployeeInformation>({} as EmployeeInformation)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const { data: userData } = useAuth()

const showModal = ref(false)

editData.value.params.employee_id = employeeId.value.id

const confirmChanges = async (id: number) => {
    showModal.value = false
    // if (confirmPassword.value !== userData.password) {
    //     snackbar.add({
    //         type: "error",
    //         text: "Incorrect password. Please try again."
    //     })
    //     return
    // }
    editData.value.params.employee_id = id
    // editData.value.params.employee_id = employeeId.value.id
    try {
        boardLoading.value = true
        await userAccountStore.editEmployeeAccount()
        snackbar.add({
            type: "success",
            text: editData.value.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        userAccountStore.$reset()
        employeeId.value = {} as EmployeeInformation
        boardLoading.value = false
    }
}

const closeModal = () => {
    showModal.value = false
}
const saveUsername = () => {
    showModal.value = true
}
const saveEmail = () => {
    showModal.value = true
}
const savePassword = () => {
    showModal.value = true
}
</script>
<template>
    <LayoutBoards title="Account Info" :loading="boardLoading">
        <div class="w-full">
            <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul id="default-tab" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#default-tab-content" role="tablist">
                    <li class="mr-2" role="presentation">
                        <button
                            id="pd-tab"
                            class="inline-block p-4 border-b-2 rounded-t-lg"
                            data-tabs-target="#pd"
                            type="button"
                            role="tab"
                            aria-controls="pis"
                            aria-selected="false"
                        >
                            Personal Details
                        </button>
                    </li>
                </ul>
            </div>
            <div id="default-tab-content">
                <div id="pd" class="hidden p-2 rounded-lg bg-gray-50 dark:bg-gray-800 " role="tabpanel" aria-labelledby="pd-tab">
                    <div class="grid grid-flow-col p-2">
                        <div class="flex-1 p-2 space-y-3">
                            <label class="block text-xl font-semibold text-gray-900 dark:text-white">
                                Username: {{ userData.name }}
                            </label>

                            <LayoutFormPsTextInput v-model="editData.params.name" title="New Username" name="name" class="w-48 italic" />
                            <button
                                type="submit"
                                class="w-32 text-white bg-cyan-600 hover:bg-secondary-base focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                @click="saveUsername"
                            >
                                Save Changes
                            </button>
                        </div>
                        <div class="flex-1 p-2 space-y-3">
                            <label class="block text-xl font-medium text-gray-900 dark:text-white">
                                Your current email address is:
                                <p class="text-teal-500">
                                    {{ userData.email }}
                                </p>
                            </label>

                            <LayoutFormPsEmailInput v-model="editData.params.email" title="New Email" name="email1" placeholder="JohnDoe@gmail.com" class="w-64 italic" />
                            <LayoutFormPsEmailInput v-model="editData.params.email" title="Confirm New Email" name="email2" placeholder="JohnDoe@gmail.com" class="w-64 italic" />

                            <button
                                type="submit"
                                class="w-32 text-white bg-cyan-600 hover:bg-secondary-base focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                @click="saveEmail"
                            >
                                Save Changes
                            </button>
                        </div>

                        <div class="flex-1 p-2 space-y-3">
                            <label class="block text-xl font-semibold text-gray-900 dark:text-white">
                                Password
                            </label>
                            <LayoutFormPsPasswordInput v-model="editData.params.password" title="Password" name="password" placeholder="••••••••" class="w-64 italic" />
                            <LayoutFormPsPasswordInput v-model="editData.params.password" title="Confirm New Password" name="password" placeholder="••••••••" class="w-64 italic" />
                            <button
                                type="submit"
                                class="w-32 text-white bg-cyan-600 hover:bg-secondary-base focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                @click="savePassword"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                    <div v-show="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                        <div class="bg-white p-4 mt-10 ml-64 gap-4 rounded-md shadow-lg overflow-auto absolute space-x-4">
                            <span class="close cursor-pointer text-md flex justify-end ml-auto" @click="closeModal">&times;</span>
                            <h3>Confirm Password</h3>
                            <input class="rounded-lg" type="password" placeholder="Enter your password">
                            <button class="w-32 text-white bg-cyan-600 hover:bg-secondary-base focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" @click="confirmChanges">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </LayoutBoards>
</template>
