<script setup>
import { storeToRefs } from "pinia"
import { useLeaveStore } from "@/stores/hrms/setup/leaves"

const leaves = useLeaveStore()

const { list: leaveList, isEdit, leave, getParams, pagination, errorMessage, successMessage } = storeToRefs(leaves)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEdit = (lv) => {
    isEdit.value = true
    leave.value = lv
}

const deleteLeaves = async (lv) => {
    try {
        boardLoading.value = true
        await leaves.deleteLeave(lv.id)
        snackbar.add({
            type: "success",
            text: leaves.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}

const headers = [
    { name: "Leave Name", id: "leave_name" },
    { name: "Amount of Leaves", id: "amt_of_leave" },
    { name: "Employment Status", id: "employment_status" },
]
const actions = {
    edit: true,
    delete: true
}
</script>
<template>
    <LayoutBoards title="Leave List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="leaveList" :actions="actions" @edit-row="setEdit" @delete-row="deleteLeaves" />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="pagination" @change-params="changePaginate" />
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
