<script setup>
import { storeToRefs } from "pinia"
import { useFailToLogStore } from "@/stores/hrms/attendance/failtolog"

const failtologs = useFailToLogStore()
const { myApprovals } = storeToRefs(failtologs)

const headers = [
    { name: "Date", id: "date_human" },
    { name: "Time", id: "time_human" },
    { name: "Log Type", id: "log_type" },
    { name: "Reason", id: "reason" },
]
const actions = {
    showTable: true,
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const boardLoading = ref(false)

const changePaginate = (newParams) => {
    myApprovals.value.params.page = newParams.page ?? ""
}
</script>

<template>
    <LayoutBoards title="" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovals.list"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="myApprovals.pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
    <HrmsAttendanceFailtologInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
