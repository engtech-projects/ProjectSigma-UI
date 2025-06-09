<script setup>
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"
const dataStore = use13thMonthStore()
const { allRequests } = storeToRefs(dataStore)
if (!allRequests.value.isLoaded) {
    allRequests.value.isLoaded = true
    dataStore.getAllRequests()
}
const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "Payroll Duration", id: "payroll_duration" },
    { name: "13th Month Date", id: "date_requested" },
    { name: "Requested By", id: "requested_by" },
    { name: "Requested On", id: "created_at_human" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    link: {
        show: true,
        url: "/hrms/payroll/13thmonthpay/details"
    }
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="allRequests.isLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="allRequests.list"
                :actions="actions"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
