<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()
const { myRequestList: cashadvanceList } = storeToRefs(cashadvances)

const infoModalData = ref({})
const showInfoModal = ref(false)

const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const headers = [
    { name: "Employee Name", id: "employee.fullname_first" },
    { name: "Cash Advance Amount", id: "amount" },
    { name: "Terms", id: "terms_of_payment" },
    { name: "Installment Deduction", id: "installment_deduction" },
    { name: "Deduction Date start", id: "deduction_date_start" },
    { name: "Purpose", id: "purpose" },
    { name: "Balance", id: "balance" },
    { name: "Total Paid", id: "total_paid" },
    { name: "Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
</script>

<template>
    <LayoutBoards class="w-full">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="cashadvanceList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <HrmsCashadvanceInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
        type="infoModalData"
    />
</template>
