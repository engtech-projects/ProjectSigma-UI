<script setup>
import { storeToRefs } from "pinia"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

const genallowstore = useGenerateAllowanceStore()
const { myApprovals } = storeToRefs(genallowstore)
if (!myApprovals.value.isLoaded) {
    myApprovals.value.isLoaded = true
    genallowstore.getMyApprovals()
}

const headers = [
    { name: "Charge Department", id: "charge_name" },
    { name: "Cutoff Start", id: "cutoff_start_human" },
    { name: "Cutoff End", id: "cutoff_end_human" },
    { name: "Allowance Date", id: "allowance_date_human" },
    { name: "Total # of Day(s)", id: "total_days" },
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
    <LayoutBoards class="w-full">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovals.list ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <HrmsPayrollAllowanceInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
