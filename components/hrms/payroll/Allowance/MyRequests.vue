<script setup>
import { storeToRefs } from "pinia"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

const genallowstore = useGenerateAllowanceStore()
const { myRequests } = storeToRefs(genallowstore)
const debouncedGetData = useDebounceFn(() => {
    genallowstore.getMyRequests()
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
    { immediate: true, deep: true }
)
const headers = [
    { name: "Charge Department", id: "charge_name" },
    { name: "Cutoff Start", id: "cutoff_start_human" },
    { name: "Cutoff End", id: "cutoff_end_human" },
    { name: "Allowance Date", id: "allowance_date_human" },
    { name: "Total # of Day(s)", id: "total_days" },
    { name: "Requested by", id: "created_by_user" },
    { name: "Request Status", id: "request_status" },
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
            <PsCustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <HrmsPayrollAllowanceInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
