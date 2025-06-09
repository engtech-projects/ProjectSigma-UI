<script setup>
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"
const dataStore = use13thMonthStore()
const { myApprovals } = storeToRefs(dataStore)
if (!myApprovals.value.isLoaded) {
    myApprovals.value.isLoaded = true
    dataStore.getMyApprovals()
}
const headers = [
    { name: "Payroll Duration", id: "payroll_duration" },
    { name: "13th Month Date", id: "date_requested" },
    { name: "Request Status", id: "request_status" },
    { name: "Requested By", id: "requested_by" },
    { name: "Requested On", id: "created_at_human" },
]
const actions = {
    link: {
        show: true,
        url: "/hrms/payroll/13thmonthpay/details"
    }
}
</script>
<template>
    <LayoutLoadingContainer class="w-full">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovals.list ?? []"
            />
        </div>
    </LayoutLoadingContainer>
</template>
