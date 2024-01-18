<script setup>
import { storeToRefs } from "pinia"
import { useLeaveStore } from "@/stores/leaves"

const leaves = useLeaveStore()
leaves.getLeave()

const { list: leaveList, isEdit, leave, getParams, pagination } = storeToRefs(leaves)

const boardLoading = ref(false)

const setEdit = (lv) => {
    isEdit.value = true
    leave.value = lv
}
const deleteLeaves = (lv) => {
    leaves.deleteLeave(lv.id)
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
    { name: "Employment Type", id: "employment_type_view" },
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
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
</template>
