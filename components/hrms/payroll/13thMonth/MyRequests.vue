<script setup>
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"
const dataStore = use13thMonthStore()
const { myRequests } = storeToRefs(dataStore)
const debouncedGetData = useDebounceFn(() => {
    dataStore.getMyRequests()
}, 500)
if (!myRequests.value.isLoaded) {
    debouncedGetData()
}
watch(
    () => ({ ...myRequests.value.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            myRequests.value.params.page = 1
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
    myRequests.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="myRequests.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myRequests.list ?? []"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
