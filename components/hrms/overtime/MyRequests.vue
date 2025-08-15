<script setup>
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"

const overtimes = useOvertimeStore()
const { myRequestList } = storeToRefs(overtimes)
const debouncedGetData = useDebounceFn(() => {
    overtimes.getMyRequests()
})
onMounted(() => {
    if (!myRequestList.value.isLoaded) {
        debouncedGetData()
    }
})
const headers = [
    { name: "Charged to", id: "charging_name" },
    { name: "Date of Overtime", id: "overtime_date" },
    { name: "From", id: "start_time_human" },
    { name: "To", id: "end_time_human" },
    { name: "Purpose/Reason", id: "reason" },
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
const changePaginate = (newParams) => {
    myRequestList.value.params.page = newParams.page ?? ""
}
watch(
    () => ({ ...myRequestList.value.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            myRequestList.value.params.page = 1
        }
        debouncedGetData()
    },
    { deep: true }
)
</script>
<template>
    <LayoutBoards class="w-full" :loading="myRequestList.isLoading">
        <div class="w-full flex gap-2">
            <HrmsCommonSearchEmployeeSelector v-model="myRequestList.params.employee_id" class="w-full" />
            <LayoutFormPsDateInput v-model="myRequestList.params.date_filter" class="w-full" title="Date Filter" />
        </div>
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="myRequestList.list"
                :actions="actions"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="myRequestList.pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
    <HrmsOvertimeInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
