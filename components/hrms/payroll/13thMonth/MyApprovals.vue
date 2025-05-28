<script setup>
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"
const dataStore = use13thMonthStore()
const { myApprovals } = storeToRefs(dataStore)
if (!myApprovals.value.isLoaded) {
    myApprovals.value.isLoaded = true
    dataStore.getMyApprovals()
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
    <LayoutLoadingContainer class="w-full">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovals.list ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutLoadingContainer>
    <HrmsPayrollAllowanceInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
