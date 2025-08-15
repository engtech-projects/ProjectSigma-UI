<script setup>
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"

const travels = useTravelorderStore()
const { myRequestList } = storeToRefs(travels)
const debouncedGetData = useDebounceFn(() => {
    travels.getMyRequests()
}, 500)
onMounted(() => {
    if (!myRequestList.value.isLoaded) {
        debouncedGetData()
    }
})

const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const headers = [
    { name: "Requesting Office", id: "department.department_name" },
    { name: "Destination", id: "destination" },
    { name: "Purpose", id: "purpose_of_travel" },
    { name: "Duration", id: "duration_of_travel" },
    { name: "Remarks", id: "remarks" },
    { name: "Request Status", id: "request_status" },
    { name: "Requested By", id: "created_by_user" },
]
const actions = {
    showTable: true,
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
                :actions="actions"
                :datas="myRequestList.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="myRequestList.pagination" @change-params="changePaginate" />
        </div>
        <HrmsTravelOrderInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutBoards>
</template>
