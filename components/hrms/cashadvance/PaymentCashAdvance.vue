<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()
const { paymentCashAdvanceList, pagination, getParams, ca } = storeToRefs(cashadvances)
const showInformationModal = ref(false)
onMounted(() => {
    if (!paymentCashAdvanceList.value.isLoaded) {
        cashadvances.getPaymentsCashAdvance()
    }
})
const showInformation = (data) => {
    ca.value = data
    showInformationModal.value = true
}
const headers = [
    { name: "Employee Name", id: "employee.fullname_first" },
    { name: "Cash Advance Purpose", id: "cashadvance.purpose" },
    { name: "Mode of Payment", id: "payment_type" },
    { name: "Date Paid", id: "date_paid_human" },
    { name: "Total Paid", id: "amount_paid_formatted" },
]
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
</script>
<template>
    <div class="pb-2 text-gray-500 p-2">
        <HrmsCommonSearchEmployeeSelector v-model="getParams.employee_id" />
        <LayoutPsTable
            :header-columns="headers"
            :datas="paymentCashAdvanceList.list"
            :actions="actions"
            @show-table="showInformation"
        />
    </div>
    <div class="flex justify-center mx-auto">
        <PsCustomPagination
            v-if="paymentCashAdvanceList.list.length"
            :links="pagination"
            @change-params="changePaginate"
        />
    </div>
    <HrmsCashadvanceInfoModal
        v-model:show-modal="showInformationModal"
        :data="ca"
    />
</template>
