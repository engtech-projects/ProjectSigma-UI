<script setup>
import { storeToRefs } from "pinia"
import { APPROVAL_NEW_ITEM_PROFILE, useApprovalStore } from "@/stores/inventory/setup/approvals"

const approvals = useApprovalStore()

const { list: approvalsList, errorMessage, successMessage, formApproval } = storeToRefs(approvals)
const inventoryListSetup = [APPROVAL_NEW_ITEM_PROFILE]

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setSelector = (appr) => {
    if (appr.userselector === true) {
        appr.user_id = null
    }
}

const addApprover = (appr) => {
    appr.push({
        type: "",
        user_id: null,
        userselector: true
    })
}

const delApprover = (approvals, ind) => {
    approvals.splice(ind, 1)
}

const submitApprov = async (approval) => {
    try {
        boardLoading.value = true
        formApproval.value = approval
        await approvals.editApprovals()
        snackbar.add({
            type: "success",
            text: approvals.successMessage,
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message,
        })
    } finally {
        approvals.clearMessages()
        boardLoading.value = false
    }
}

</script>
<template>
    <LayoutBoards title="Approvals" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr class="">
                        <th class="p-2">
                            Form
                        </th>
                        <th class="p-2">
                            Approvals
                        </th>
                        <th class="p-2">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(approv, index) in approvalsList" :key="index" class="border-2 border-slate-300 ">
                        <template v-if="inventoryListSetup.includes(approv.form)">
                            <td class="p-2">
                                {{ approv.form }}
                            </td>
                            <div class="p-2 space-y-2">
                                <td
                                    v-for="approvers, index2 in approv.approvals"
                                    :key="index2"
                                    class="p-3 flex flex-col border border-slate-400 rounded-lg "
                                >
                                    <div class="flex ml-auto">
                                        <Icon
                                            name="ic:baseline-minus"
                                            class="flex ml-auto bg-red-400 hover:bg-red-500 text-black hover:text-white rounded-sm w-10"
                                            @click.prevent="delApprover(approv.approvals, index2)"
                                        />
                                    </div>
                                    <div class="grid gap-2 md:grid-cols-2">
                                        <div>
                                            <label
                                                for=""
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >Approval
                                                Type</label>
                                            <input
                                                v-model="approvers.type"
                                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                type="text"
                                            >
                                        </div>

                                        <div>
                                            <input
                                                :id="index2 + 'user_selector' + index"
                                                v-model="approvers.userselector"
                                                type="radio"
                                                :value="true"
                                                :name="index2 + 'radio1' + index"
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                @change="setSelector(approvers)"
                                            >
                                            <label
                                                :for="index2 + 'user_selector' + index"
                                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >Employee
                                                Selector</label>
                                            <div class="flex items-center">
                                                <input
                                                    :id="index2 + 'employee_selector' + index"
                                                    v-model="approvers.userselector"
                                                    type="radio"
                                                    :value="false"
                                                    :name="index2 + 'radio2' + index"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    @change="setSelector(approvers)"
                                                >
                                                <label
                                                    :for="index2 + 'employee_selector' + index"
                                                    class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >Specific
                                                    Employee</label>
                                                <HrmsCommonUserEmployeeSelector
                                                    id="users_list"
                                                    v-model="approvers.user_id"
                                                    :disabled="approvers.userselector === true"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <Icon
                                    name="ic:baseline-plus"
                                    class="flex ml-auto bg-green-400 hover:bg-green-500 text-black hover:text-white rounded-sm w-10"
                                    @click.prevent="addApprover(approv.approvals)"
                                />
                            </div>
                            <td class="p-2 rounded-md">
                                <div class="grid md:grid-rows-1 justify-center gap-4 p-2">
                                    <button
                                        type="submit"
                                        class="rounded-md bg-green-400 p-2 text-white hover:bg-green-500 justify-end"
                                        @click.prevent="submitApprov(approv)"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
        <p
            hidden
            class="error-message text-red-600 text-center font-semibold mt-2 italic"
            :class="{ 'fade-out': !errorMessage }"
        >
            {{ errorMessage }}
        </p>
        <p v-show="successMessage" hidden class="success-message text-green-600 text-center font-semibold italic">
            {{ successMessage }}
        </p>
    </LayoutBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
