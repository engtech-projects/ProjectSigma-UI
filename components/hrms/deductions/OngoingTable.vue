<script setup>
import { useOtherDeductionStore } from "@/stores/hrms/loansAndCash/otherDeduction"
const otherDeductionStore = useOtherDeductionStore()
const { ongoingList } = storeToRefs(otherDeductionStore)
const debouncedGetData = useDebounceFn(() => {
    otherDeductionStore.getOngoingList()
}, 500)
onMounted(() => {
    if (!ongoingList.value.isLoaded) {
        debouncedGetData()
    }
})
watch(
    () => ({ ...ongoingList.value.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            ongoingList.value.params.page = 1
        }
        debouncedGetData()
    },
    { deep: true }
)
const headers = [
    { text: "Employee Name", value: "employee.fullname_first" },
    { text: "Date Filed", value: "date_filed" },
    { text: "Deduction Name", value: "otherdeduction_name" },
    { text: "Amount to Deduct", value: "amount_formatted" },
    { text: "Term", value: "terms_of_payment" },
    { text: "Monthly Deduction", value: "installment_deduction_formatted" },
    { text: "Action", value: "actions" },
]

const changePaginate = (newParams) => {
    ongoingList.value.params.page = newParams.page ?? ""
}
const infoModalData = ref({})
const showInfoModal = ref(false)

const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

</script>
<template>
    <LayoutLoadingContainer :loading="ongoingList.isLoading">
        <div class="w-full">
            <HrmsCommonSearchEmployeeSelector v-model="ongoingList.params.employee_id" />
        </div>
        <div class="w-full">
            <div class="mt-5 mb-6 ">
                <EasyDataTable
                    class="mt-5"
                    :headers="headers"
                    :items="ongoingList.list"
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
                    :links="ongoingList.pagination"
                    @change-params="changePaginate"
                />
            </div>
        </div>
        <HrmsDeductionsInfoModal v-model:show-modal="showInfoModal" :data="infoModalData" />
    </LayoutLoadingContainer>
</template>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
