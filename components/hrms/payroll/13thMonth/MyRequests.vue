<script setup>
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"
const dataStore = use13thMonthStore()
const { myRequests } = storeToRefs(dataStore)
if (!myRequests.value.isLoaded) {
    myRequests.value.isLoaded = true
    dataStore.getMyRequests()
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
const changePaginate = (newParams) => {
    myRequests.value.params.page = newParams.page ?? ""
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const boardLoading = ref(false)

</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myRequests.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <HrmsPayrollAllowanceInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
