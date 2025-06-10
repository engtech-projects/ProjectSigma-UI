<script setup>
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"

const travels = useTravelorderStore()
const { approvalList } = storeToRefs(travels)
onMounted(() => {
    if (!approvalList.value.isLoaded) {
        travels.getMyApprovalRequests()
    }
})

const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const headers = [
    { name: "Requested by", id: "requested_by.name" },
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

</script>
<template>
    <LayoutBoards class="w-full" :loading="approvalList.isLoading">
        <div class="w-full flex gap-2">
            <HrmsCommonSearchEmployeeSelector v-model="approvalList.params.employee_id" class="w-full" />
            <LayoutFormPsDateInput v-model="approvalList.params.date_filter" class="w-full" title="Date Filter" />
        </div>
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="approvalList.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="approvalList.pagination" @change-params="changePaginate" />
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
