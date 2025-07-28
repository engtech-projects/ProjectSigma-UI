<script setup>
import { useSalaryDisbursementStore } from "@/stores/hrms/payroll/salaryDisbursement"
import { PAYROLL_TYPE, RELEASE_TYPE } from "@/stores/hrms/payroll/generatePayroll"

const salaryDisbursementStore = useSalaryDisbursementStore()
const { myApprovals } = storeToRefs(salaryDisbursementStore)
onMounted(() => {
    if (!myApprovals.value.isLoaded) {
        myApprovals.value.isLoaded = true
        salaryDisbursementStore.getMyApprovals()
    }
})
const headers = [
    { name: "Payroll Date", id: "payroll_date_human" },
    { name: "Payroll Type", id: "payroll_type" },
    { name: "Release Type", id: "release_type" },
    { name: "Requested By", id: "created_by_user_name" },
    { name: "Request Status", id: "request_status" },
]

const actions = {
    showTable: true,
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const changePaginate = (newParams) => {
    myApprovals.value.params.page = newParams.page ?? 1
}
</script>
<template>
    <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
        <LayoutLoadingContainer :loading="myApprovals.isLoading">
            <!-- FILTERS -->
            <div class="flex gap-2">
                <LayoutFormPsDateInput v-model="myApprovals.params.payroll_date" class="w-full" title="Payroll Date" required />
                <LayoutFormPsSelect
                    v-model="myApprovals.params.payroll_type"
                    :options-list="PAYROLL_TYPE"
                    :add-all="true"
                    title="Payroll Type"
                    class="w-full p-2"
                    required
                />
                <LayoutFormPsSelect
                    v-model="myApprovals.params.release_type"
                    :options-list="RELEASE_TYPE"
                    :add-all="true"
                    title="Release Type"
                    class="w-full p-2"
                    required
                />
            </div>
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovals.list ?? []"
                @show-table="showInformation"
            />
        </LayoutLoadingContainer>
    </div>
    <div class="flex justify-center mx-auto">
        <PsCustomPagination :links="myApprovals.pagination" @change-params="changePaginate" />
    </div>
    <HrmsPayrollSalaryDisbursementInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
