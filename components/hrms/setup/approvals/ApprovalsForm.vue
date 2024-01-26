<script setup>
import { storeToRefs } from "pinia"
import { useApprovalStore, SELECTOR } from "@/stores/approvals"

const approvals = useApprovalStore()

const { list: approvalsList, getParams, pagination, errorMessage, successMessage } = storeToRefs(approvals)

// const snackbar = useSnackbar()
const boardLoading = ref(false)

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}
const setSelector = (appr) => {
    if (appr.userselector === true) {
        appr.user_id = null
    }
}
const addApprover = (appr) => {
    appr.push({
        type: "",
        user_id: null,
        userselector: false
    })
    snackbar.add({
        type: "success",
        text: approvals.successMessage,
    })
}
const delApprover = (ind) => {
    appr.splice(ind, 1)
    snackbar.add({
        type: "success",
        text: approvals.successMessage,
    })
}

// const submitApprov = async (approval) => {
//     try {
//         boardLoading.value = true
//         if (!approval.id) {
//             await approvals.createApproval()
//         } else {
//             await approvals.editApprovals()
//         }
//         snackbar.add({
//             type: "success",
//             text: approvals.successMessage,
//         })
//     } catch {
//         snackbar.add({
//             type: "error",
//             text: approvals.errorMessage,
//         })
//     } finally {
//         approvals.clearMessages()
//         boardLoading.value = false
//     }
// }

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
                    <tr v-for="(approv, index) in approvalsList" :key="index" class="border">
                        <td class="p-2">
                            <!-- {{ approv }} -->
                            {{ approv.form }}
                        </td>
                        <div class="overflow-y-scroll max-h-40">
                            <td v-for="approvers, index2 in approv.approvals" :key="index2" class="p-3 flex flex-col">
                                <!-- {{ approvers }} -->
                                <div class="flex gap-4 justify-center mx-auto max-h-12">
                                    <input v-model="approvers.type" class="rounded-md" type="text">
                                </div>
                                <div class="flex-grow shrink-0">
                                    <input
                                        :id="index2+'user_selector'"
                                        v-model="approvers.userselector"
                                        type="radio"
                                        :value="true"
                                        :name="index2+'radio'"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        @change="setSelector(approvers)"
                                    >
                                    <label :for="index2+'user_selector'" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Employee Selector</label>
                                </div>
                                <div>
                                    <input
                                        :id="index2+'employee_selector'"
                                        v-model="approvers.userselector"
                                        type="radio"
                                        :value="false"
                                        :name="index2+'radio'"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        @change="setSelector(approvers)"
                                    >
                                    <label :for="index2+'employee_selector'" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Specific Employee</label>
                                    <select
                                        id="users_list"
                                        v-model="approvers.user_id"
                                        :disabled="approvers.userselector === true"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    >
                                        <option value="select" selected>
                                            --Select--
                                        </option>
                                        <option v-for="userSelect, userSelector in SELECTOR" :key="userSelector" :value="userSelect">
                                            {{ userSelect }}
                                        </option>
                                    </select>
                                </div>
                            </td>
                        </div>
                        <td class="p-2 rounded-md">
                            <div class="flex gap-4 justify-center mx-auto ">
                                <!-- <button type="submit" class="rounded-md bg-green-400 p-2 text-white hover:bg-green-500 justify-end" @click.prevent="submitApprov">
                                    Save Changes
                                </button> -->
                            </div>
                        </td>
                        <div class="grid grid-rows-2 justify-center gap-4 p-2">
                            <Icon name="ic:baseline-plus" color="black" @click.prevent="addApprover(approv.approvals)" />
                            <Icon name="ic:baseline-minus" color="black" @click.prevent="delApprover(index2)" />
                            <!-- <button type="button" class="rounded-md bg-green-400 p-2 text-white hover:bg-green-500 justify-end text-xs" @click.prevent="addApprover(approv.approvals)">
                                sdf
                            </button> -->
                            <button type="submit" class="rounded-md bg-green-400 p-2 text-white hover:bg-green-500 justify-end" @click.prevent="submitApprov">
                                Save Changes
                            </button>
                        </div>
                    </tr>
                    <i v-if="!approvalsList.length&&!approvals.boardLoading" class="p-4 text-center block">No data available.</i>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic"
        >
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
