<script setup>
import { useLoansStore } from "@/stores/hrms/loansAndCash/loans"
const loansStore = useLoansStore()
const { allList } = storeToRefs(loansStore)
onMounted(() => {
    if (!allList.value.isLoaded) {
        loansStore.getAllList()
    }
})
const headers = [
    { text: "Employee Name", value: "employee.fullname_first" },
    { text: "Date Filed", value: "date_filed" },
    { text: "Loan Name", value: "name" },
    { text: "Amount Loaned", value: "amount_formatted" },
    { text: "Deduction", value: "installment_deduction_formatted" },
    { text: "Action", value: "actions" },
]

const changePaginate = (newParams) => {
    allList.value.params.page = newParams.page ?? ""
}

const infoModalData = ref({})
const showInfoModal = ref(false)

const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
</script>
<template>
    <LayoutLoadingContainer :loading="allList.isLoading">
        <div class="w-full">
            <HrmsCommonSearchEmployeeSelector v-model="allList.params.employee_id" />
        </div>
        <div class="w-full">
            <div class="mt-5 mb-6 ">
                <EasyDataTable
                    class="mt-5"
                    :headers="headers"
                    :items="allList.list"
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
                <PsCustomPagination
                    :links="allList.pagination"
                    @change-params="changePaginate"
                />
            </div>
        </div>
        <HrmsLoansInfoModal v-model:show-modal="showInfoModal" :data="infoModalData" />
    </LayoutLoadingContainer>
</template>
<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
