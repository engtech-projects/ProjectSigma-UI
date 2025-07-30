<script setup>
import { useApprovalStore } from "@/stores/hrms/setup/approvals"

const approvals = useApprovalStore()

const { hrmsApprovals, editApproval } = storeToRefs(approvals)
onMounted(() => {
    if (!hrmsApprovals.value.isLoaded) {
        approvals.getHrmsApprovals()
    }
})
const snackbar = useSnackbar()

const setSelector = (appr) => {
    if (appr.selector_type !== "specific") {
        appr.user_id = null
    }
}
const addApprover = (appr) => {
    appr.push({
        type: "",
        user_id: null,
        selector_type: "specific",
    })
}
const delApprover = (approvals, ind) => {
    approvals.splice(ind, 1)
}
const submitApprov = async (approval) => {
    try {
        await approvals.editApprovals(approval)
        snackbar.add({
            type: "success",
            text: editApproval.value.successMessage,
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: editApproval.value.errorMessage,
        })
    }
}
const changePaginate = (newParams) => {
    hrmsApprovals.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutBoards title="Approvals" class="w-full" :loading="hrmsApprovals.isLoading">
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
                    <tr v-for="(approv, index) in hrmsApprovals.list" :key="index" class="border-2 border-slate-300 ">
                        <td class="p-2">
                            <form :id="index + 'approvform'" @submit.prevent="submitApprov(approv)" />
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
                                        <div class="flex items-center">
                                            <input
                                                :id="index2 + 'user_selector' + index"
                                                v-model="approvers.selector_type"
                                                type="radio"
                                                value="employee"
                                                :name="index2 + 'radio1' + index"
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                @change="setSelector(approvers)"
                                            >
                                            <label
                                                :for="index2 + 'user_selector' + index"
                                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Employee Selector
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input
                                                :id="index2 + 'head_selector' + index"
                                                v-model="approvers.selector_type"
                                                type="radio"
                                                value="head"
                                                :name="index2 + 'radio1' + index"
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                @change="setSelector(approvers)"
                                            >
                                            <label
                                                :for="index2 + 'head_selector' + index"
                                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Head Selector
                                            </label>
                                        </div>
                                        <div class="flex items-center">
                                            <input
                                                :id="index2 + 'employee_selector' + index"
                                                v-model="approvers.selector_type"
                                                type="radio"
                                                value="specific"
                                                :name="index2 + 'radio2' + index"
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                @change="setSelector(approvers)"
                                            >
                                            <label
                                                :for="index2 + 'employee_selector' + index"
                                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Specific Employee
                                            </label>
                                            <HrmsCommonUserEmployeeSelector
                                                id="users_list"
                                                v-model="approvers.user_id"
                                                :form="index + 'approvform'"
                                                :disabled="approvers.selector_type !== 'specific'"
                                                :required="approvers.selector_type === 'specific'"
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
                                    :form="index + 'approvform'"
                                    type="submit"
                                    class="rounded-md bg-green-400 p-2 text-white hover:bg-green-500 justify-end"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="hrmsApprovals.pagination" @change-params="changePaginate" />
        </div>
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
