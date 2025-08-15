<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()
const { ongoingCashAdvanceList, pagination, getParams, ca } = storeToRefs(cashadvances)
const showInformationModal = ref(false)
const debouncedGetData = useDebounceFn(() => {
    cashadvances.getOngoingCashAdvance()
}, 500)
onMounted(() => {
    if (!ongoingCashAdvanceList.value.isLoaded) {
        debouncedGetData()
    }
})
watch(
    () => ({ ...ongoingCashAdvanceList.value.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            ongoingCashAdvanceList.value.params.page = 1
        }
        debouncedGetData()
    },
    { deep: true }
)
const showInformation = (data) => {
    ca.value = data
    showInformationModal.value = true
}
const headers = [
    { name: "Employee Name", id: "employee.fullname_first" },
    { name: "Cash Advance Amount", id: "amount_formatted" },
    { name: "Terms", id: "terms_of_payment" },
    { name: "Installment Deduction", id: "installment_deduction_formatted" },
    { name: "Deduction Date start", id: "deduction_date_start" },
    { name: "Purpose", id: "purpose" },
    { name: "Balance", id: "remaining_balance_formatted" },
    { name: "Total Paid", id: "total_paid_formatted" },
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
            :datas="ongoingCashAdvanceList.list"
            :actions="actions"
            @show-table="showInformation"
        />
    </div>
    <div class="flex justify-center mx-auto">
        <PsCustomPagination
            v-if="ongoingCashAdvanceList.list.length"
            :links="pagination"
            @change-params="changePaginate"
        />
    </div>
    <HrmsCashadvanceInfoModal
        v-model:show-modal="showInformationModal"
        :data="ca"
    />
</template>
