<script setup>
import { storeToRefs } from "pinia"
import { useFailToLogStore } from "@/stores/hrms/attendance/failtolog"

const failtologs = useFailToLogStore()

const { myRequests } = storeToRefs(failtologs)

const headers = [
    { name: "Date", id: "date_human" },
    { name: "Time", id: "time_human" },
    { name: "Employee", id: "employee.fullname_last" },
    { name: "Charging", id: "charging_designation" },
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
    myRequests.value.params.page = newParams.page ?? ""
}

</script>
<template>
    <LayoutBoards title="" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myRequests.list"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
    <HrmsAttendanceFailtologInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
