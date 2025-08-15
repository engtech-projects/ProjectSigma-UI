<script setup>
import { useSalaryDisbursementStore } from "@/stores/hrms/payroll/salaryDisbursement"
import { PAYROLL_TYPE, RELEASE_TYPE } from "@/stores/hrms/payroll/generatePayroll"

const salaryDisbursementStore = useSalaryDisbursementStore()
const { allRequests } = storeToRefs(salaryDisbursementStore)
const debouncedGetData = useDebounceFn(() => {
    salaryDisbursementStore.getAllRequests()
}, 500)
onMounted(() => {
    if (!allRequests.value.isLoaded) {
        debouncedGetData()
    }
})
watch(
    () => ({ ...allRequests.value.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            allRequests.value.params.page = 1
        }
        debouncedGetData()
    },
    { deep: true }
)
const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
}

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
    // infoModalData.value = data
    // showInfoModal.value = true
    navigateTo({
        path: "/hrms/payroll/salary-disbursement/details",
        query: {
            id: data.id
        },
    })
}

</script>
<template>
    <div class="pb-2 text-gray-500 p-2">
        <LayoutLoadingContainer :loading="allRequests.isLoading">
            <!-- FILTERS -->
            <div class="flex gap-2">
                <LayoutFormPsDateInput v-model="allRequests.params.payroll_date" class="w-full" title="Payroll Date" required />
                <LayoutFormPsSelect
                    v-model="allRequests.params.payroll_type"
                    :options-list="PAYROLL_TYPE"
                    :add-all="true"
                    title="Payroll Type"
                    class="w-full p-2"
                    required
                />
                <LayoutFormPsSelect
                    v-model="allRequests.params.release_type"
                    :options-list="RELEASE_TYPE"
                    :add-all="true"
                    title="Release Type"
                    class="w-full p-2"
                    required
                />
            </div>
            <LayoutPsTable
                :header-columns="headers"
                :datas="allRequests.list"
                :actions="actions"
                @show-table="showInformation"
            />
        </LayoutLoadingContainer>
    </div>
    <div class="flex justify-center mx-auto">
        <PsCustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
    </div>
    <HrmsPayrollSalaryDisbursementInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
