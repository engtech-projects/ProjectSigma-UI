<script setup>
import { useLoansStore } from "@/stores/hrms/loansAndCash/loans"
const utils = useUtilities()
const loansStore = useLoansStore()
const { getParams, paidList } = storeToRefs(loansStore)
onMounted(() => {
    if (!paidList.value.isLoaded) {
        loansStore.getPaidList()
    }
})
const headers = [
    { text: "Employee Name", value: "fullName" },
    { text: "Date Filed", value: "date_filed" },
    { text: "Amount Loaned", value: "amount" },
    { text: "Deduction", value: "installment_deduction" },
    { text: "Action", value: "actions" },
]
const employeeList = computed(() => {
    const list = []
    if (loansStore.paidList.data) {
        for (const i in loansStore.paidList.data.data) {
            const item = loansStore.paidList.data.data[i]
            item.fullName = item.employee.family_name + ", " + item.employee.first_name
            item.date_filed = utils.value.dateToString(new Date(item.created_at))
            list.push(item)
        }
    }
    return list
})
const changePaginate = (newParams) => {
    getParams.value.params.page = newParams.page ?? ""
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
            <HrmsCommonSearchEmployeeSelector v-model="getParams.employee_id" />
        </div>
        <div class="w-full">
            <div class="mt-5 mb-6 ">
                <EasyDataTable
                    buttons-pagination
                    class="mt-5"
                    table-class-name="customize-table"
                    :headers="headers"
                    :items="employeeList"
                    :hide-footer="true"
                >
                    <template #item-actions="item">
                        <div class="flex flex-row gap-1">
                            <button @click="showInformation(item)">
                                <Icon name="material-symbols:visibility-rounded" color="white" class="bg-teal-700 rounded h-8 w-8 p-1" />
                            </button>
                        </div>
                    </template>
                </EasyDataTable>
            </div>
            <div class="flex justify-center mx-auto">
                <CustomPagination
                    v-if="employeeList.length"
                    :links="loansStore.pagination"
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
