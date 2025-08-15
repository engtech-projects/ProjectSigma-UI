<script setup>
import { storeToRefs } from "pinia"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

const genallowstore = useGenerateAllowanceStore()
const { myApprovals } = storeToRefs(genallowstore)
const debouncedGetData = useDebounceFn(() => {
    genallowstore.getMyApprovals()
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
