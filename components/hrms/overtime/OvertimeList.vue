<script setup>
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"

const overtimes = useOvertimeStore()
const { overtime, list: overtimeList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(overtimes)

const headers = [
    { name: "Charged to", id: "charging_name" },
    { name: "Date of Overtime", id: "overtime_date" },
    { name: "From", id: "start_time_human" },
    { name: "To", id: "end_time_human" },
    { name: "Purpose/Reason", id: "reason" },
]
const actions = {
    showTable: true, // edit: true, // delete: true
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)
const setEdit = (ovr) => {
    isEdit.value = true
    overtime.value = ovr
}

const deleteReq = async (req) => {
    try {
        boardLoading.value = true
        await overtimes.deleteRequest(req.id)
        snackbar.add({
            type: "success",
            text: overtimes.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

</script>

<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="overtimeList"
                :actions="actions"
                @edit-row="setEdit"
                @delete-row="deleteReq"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
        <HrmsOvertimeInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
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
