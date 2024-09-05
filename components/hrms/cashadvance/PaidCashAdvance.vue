<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()
const { paidCashAdvanceList, pagination, getParams, ca } = storeToRefs(cashadvances)
const showInformationModal = ref(false)
const utils = useUtilities()
onMounted(() => {
    if (!paidCashAdvanceList.value.isLoaded) {
        cashadvances.getPaidCashAdvance()
    }
})
const showInformation = (data) => {
    ca.value = data
    newPayment.value.cashadvance_id = data.id
    showInformationModal.value = true
}
const newPayment = ref({
    id: null,
    cashadvance_id: null,
    amount_paid: null,
    date_paid: utils.value.dateToString(new Date()),
    payment_type: "Manual",
    posting_status: "Posted",
    paymentAmount: null,
})
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
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
</script>

<template>
    <div class="pb-2 text-gray-500 p-2">
        <HrmsCommonSearchEmployeeSelector v-model="getParams.employee_id" />
        <LayoutPsTable
            :header-columns="headers"
            :datas="paidCashAdvanceList.list"
            :actions="actions"
            @show-table="showInformation"
        />
    </div>
    <div class="flex justify-center mx-auto">
        <CustomPagination
            v-if="paidCashAdvanceList.list.length"
            :links="pagination"
            @change-params="changePaginate"
        />
    </div>
    <HrmsCashadvanceInfoModal
        v-model:show-modal="showInformationModal"
        :data="ca"
    />
</template>
