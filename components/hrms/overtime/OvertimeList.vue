<script setup>
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"

const overtimes = useOvertimeStore()
const { allList } = storeToRefs(overtimes)
const debouncedGetData = useDebounceFn(() => {
    overtimes.getOvertime()
})
onMounted(() => {
    if (!allList.value.isLoaded) {
        debouncedGetData()
    }
})
const headers = [
    { name: "Charged to", id: "charging_name" },
    { name: "Date of Overtime", id: "overtime_date" },
    { name: "From", id: "start_time_human" },
    { name: "To", id: "end_time_human" },
    { name: "Purpose/Reason", id: "reason" },
    { name: "Request Status", id: "request_status" },
    { name: "Requested by", id: "created_by_user" },
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

const changePaginate = (newParams) => {
    allList.value.params.page = newParams.page ?? ""
}
watch(
    () => ({ ...allList.value.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            allList.value.params.page = 1
        }
        debouncedGetData()
    },
    { deep: true }
)
</script>
<template>
    <LayoutBoards class="w-full" :loading="allList.isLoading">
        <div class="w-full flex gap-2">
            <HrmsCommonSearchEmployeeSelector v-model="allList.params.employee_id" class="w-full" />
            <LayoutFormPsDateInput v-model="allList.params.date_filter" class="w-full" title="Date Filter" />
        </div>
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="allList.list"
                :actions="actions"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="allList.pagination" @change-params="changePaginate" />
        </div>
        <HrmsOvertimeInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutBoards>
</template>
