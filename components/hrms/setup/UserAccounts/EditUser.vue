<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useUserStore } from "@/stores/hrms/users"

const userAccountStore = useUserStore()
const { editCurrent } = storeToRefs(userAccountStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const { data: userData } = useAuth()

const showModal = ref(false)

const typechange = ref("")
const confirmChanges = async () => {
    showModal.value = false
    try {
        boardLoading.value = true

        if (editCurrent.value.params.password !== editCurrent.value.params.confirm_password) {
            throw new Error("Passwords do not match.")
        }

        if (typechange.value) {
            editCurrent.value.params.typechange = typechange.value
            await userAccountStore.editCurrentUser()
            snackbar.add({
                type: "success",
                text: editCurrent.value.successMessage
            })
        } else {
            throw new Error("No change detected.")
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "Something went wrong."
        })
    } finally {
        userAccountStore.$reset()
        boardLoading.value = false
    }
}

const closeModal = () => {
    showModal.value = false
}
const saveUsername = () => {
    typechange.value = "name"
    showModal.value = true
}
const saveEmail = () => {
    typechange.value = "email"
    showModal.value = true
}
const savePassword = () => {
    typechange.value = "password"
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

                            <LayoutFormPsTextInput v-model="editCurrent.params.name" title="New Username" name="text" class="w-64 italic" />

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

                            <LayoutFormPsEmailInput v-model="editCurrent.params.email" title="New Email" name="email" class="w-64 italic" />

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
                            <LayoutFormPsPasswordInput v-model="editCurrent.params.password" title="Password" name="password" placeholder="••••••••" class="w-64 italic" />
                            <LayoutFormPsPasswordInput v-model="editCurrent.params.confirm_password" title="Confirm New Password" name="password" placeholder="••••••••" class="w-64 italic" />
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
                            <input v-model="editCurrent.params.current_password" class="rounded-lg" type="password" placeholder="Enter your password" required>
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
