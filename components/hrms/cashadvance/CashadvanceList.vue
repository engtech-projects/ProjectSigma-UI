<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()
const { cashAdvanceList } = storeToRefs(cashadvances)

onMounted(() => {
    if (!cashAdvanceList.value.isLoaded) {
        cashadvances.getCA()
    }
})
const headers = [
    { text: "Employee Name", value: "employee.fullname_first" },
    { text: "Cash Advance Amount", value: "amount_formatted" },
    { text: "Terms", value: "terms_of_payment" },
    { text: "Installment Deduction", value: "installment_deduction_formatted" },
    { text: "Deduction Date start", value: "deduction_date_start" },
    { text: "Purpose", value: "purpose" },
    { text: "Balance", value: "remaining_balance_formatted" },
    { text: "Total Paid", value: "total_paid_formatted" },
    { text: "Status", value: "request_status" },
    { text: "Action", value: "actions" },
]
const changePaginate = (newParams) => {
    cashAdvanceList.value.params.page = newParams.page ?? ""
}

const infoModalData = ref({})
const showInfoModal = ref(false)

const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
</script>
<template>
    <LayoutLoadingContainer :loading="cashAdvanceList.isLoading">
        <div class="w-full">
            <HrmsCommonSearchEmployeeSelector v-model="cashAdvanceList.params.employee_id" />
        </div>
        <div class="w-full">
            <div class="mt-5 mb-6 ">
                <EasyDataTable
                    class="mt-5"
                    :headers="headers"
                    :items="cashAdvanceList.list"
                    :hide-footer="true"
                >
                    <template #item-actions="item">
                        <div class="flex flex-row gap-1">
                            <button @click="showInformation(item)">
                                <Icon
                                    name="material-symbols:visibility-rounded"
                                    color="white"
                                    class="bg-teal-700 rounded h-8 w-8 p-1"
                                />
                            </button>
                        </div>
                    </template>
                </EasyDataTable>
            </div>
            <div class="flex justify-center mx-auto">
                <CustomPagination
                    :links="cashAdvanceList.pagination"
                    @change-params="changePaginate"
                />
            </div>
        </div>
        <HrmsCashadvanceInfoModal v-model:show-modal="showInfoModal" :data="infoModalData" />
    </LayoutLoadingContainer>
</template>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
