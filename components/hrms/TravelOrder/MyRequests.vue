<script setup>
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"

const travels = useTravelorderStore()
const { myRequestList } = storeToRefs(travels)
onMounted(() => {
    if (!myRequestList.value.isLoaded) {
        travels.getMyRequests()
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
        <HrmsTravelOrderInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutBoards>
</template>
