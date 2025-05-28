<script setup>
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"
const dataStore = use13thMonthStore()
const { allRequests } = storeToRefs(dataStore)
if (!allRequests.value.isLoaded) {
    allRequests.value.isLoaded = true
    dataStore.getAllRequests()
}
const boardLoading = ref(false)
const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "Payroll Duration", id: "paryoll_duration_human" },
    { name: "Release Type", id: "release_type" },
    { name: "Request Status", id: "request_status" },
    { name: "Requested By", id: "requested_by" },
    { name: "Requested On", id: "created_at_human" },
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

</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="allRequests.list"
                :actions="actions"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <HrmsPayrollAllowanceInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
