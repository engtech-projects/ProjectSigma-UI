<script setup>
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"
const dataStore = use13thMonthStore()
const { myApprovals } = storeToRefs(dataStore)
const debouncedGetData = useDebounceFn(() => {
    dataStore.getMyApprovals()
}, 500)
if (!myApprovals.value.isLoaded) {
    debouncedGetData()
}
watch(
    () => ({ ...myApprovals.value.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            myApprovals.value.params.page = 1
        }
        debouncedGetData()
    },
    { deep: true }
)
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
const changePaginate = (newParams) => {
    myApprovals.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="myApprovals.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovals.list ?? []"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="myApprovals.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
