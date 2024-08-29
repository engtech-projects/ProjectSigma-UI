<script setup>
import { useOtherDeductionStore } from "@/stores/hrms/loansAndCash/otherDeduction"
const otherDeductionStore = useOtherDeductionStore()
const { paidList } = storeToRefs(otherDeductionStore)
onMounted(() => {
    if (!paidList.value.isLoaded) {
        otherDeductionStore.getPaidList()
    }
})
const headers = [
    { text: "Employee Name", value: "employee.fullname_first" },
    { text: "Date Filed", value: "date_filed" },
    { text: "Deduction Name", value: "otherdeduction_name" },
    { text: "Amount to Deduct", value: "amount" },
    { text: "Term", value: "terms_of_payment" },
    { text: "Monthly Deduction", value: "installment_deduction" },
    { text: "Action", value: "actions" },
]

const changePaginate = (newParams) => {
    paidList.value.params.page = newParams.page ?? ""
}
const infoModalData = ref({})
const showInfoModal = ref(false)

const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

</script>
<template>
    <LayoutLoadingContainer>
        <div class="w-full">
            <HrmsCommonSearchEmployeeSelector v-model="paidList.params.employee_id" />
        </div>
        <div class="w-full">
            <div class="mt-5 mb-6 ">
                <EasyDataTable
                    class="mt-5"
                    :headers="headers"
                    :items="paidList.list"
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
                    :links="paidList.pagination"
                    @change-params="changePaginate"
                />
            </div>
        </div>
        <HrmsLoansDeductionsInfoModal v-model:show-modal="showInfoModal" :data="infoModalData" />
    </LayoutLoadingContainer>
</template>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
