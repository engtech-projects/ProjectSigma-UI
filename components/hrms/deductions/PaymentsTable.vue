<script setup>
import { useOtherDeductionStore } from "@/stores/hrms/loansAndCash/otherDeduction"
const otherDeductionStore = useOtherDeductionStore()
const { paymentsList } = storeToRefs(otherDeductionStore)
const debouncedGetData = useDebounceFn(() => {
    otherDeductionStore.getPaymentsList()
}, 500)
onMounted(() => {
    if (!paymentsList.value.isLoaded) {
        debouncedGetData()
    }
})
watch(
    () => ({ ...paymentsList.value.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            paymentsList.value.params.page = 1
        }
        debouncedGetData()
    },
    { deep: true }
)
const headers = [
    { text: "Employee Name", value: "employee.fullname_first" },
    { text: "Deduction Name", value: "otherdeduction.otherdeduction_name" },
    { text: "Amount Paid", value: "amount_paid_formatted" },
    { text: "Date Paid", value: "date_paid_human" },
    { text: "Mode of Payment", value: "payment_type" },
]

const changePaginate = (newParams) => {
    paymentsList.value.params.page = newParams.page ?? ""
}

</script>
<template>
    <LayoutLoadingContainer :loading="paymentsList.isLoading">
        <div class="w-full">
            <HrmsCommonSearchEmployeeSelector v-model="paymentsList.params.employee_id" />
        </div>
        <div class="w-full">
            <div class="mt-5 mb-6 ">
                <EasyDataTable
                    class="mt-5"
                    :headers="headers"
                    :items="paymentsList.list"
                    :hide-footer="true"
                >
                    <template #item-actions="item">
                        <div class="flex flex-row gap-1">
                            <button @click="showDetails(item)">
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
                <PsCustomPagination
                    :links="paymentsList.pagination"
                    @change-params="changePaginate"
                />
            </div>
        </div>
    </LayoutLoadingContainer>
</template>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
