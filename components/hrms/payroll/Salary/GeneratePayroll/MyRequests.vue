<script setup>
import { useGeneratePayrollStore, PAYROLL_TYPE, RELEASE_TYPE } from "@/stores/hrms/payroll/generatePayroll"

const genPayrollRequestsStore = useGeneratePayrollStore()
const { myRequests } = storeToRefs(genPayrollRequestsStore)
onMounted(() => {
    if (!myRequests.value.isLoaded) {
        myRequests.value.isLoaded = true
        genPayrollRequestsStore.getMyRequests()
    }
})

const headers = [
    { name: "Payroll Date", id: "payroll_date_human" },
    { name: "Charged to", id: "charging_name" },
    { name: "Cut Off Start", id: "cutoff_start_human" },
    { name: "Cut Off End", id: "cutoff_end_human" },
    { name: "Payroll Type", id: "payroll_type" },
    { name: "Release Type", id: "release_type" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
const changePaginate = (newParams) => {
    myRequests.value.params.page = newParams.page ?? ""
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
const filterType = ref("")
</script>
<template>
    <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
        <LayoutLoadingContainer :loading="myRequests.isLoading">
            <!-- FILTERS -->
            <div class="flex gap-2">
                <LayoutFormPsDateInput v-model="myRequests.params.payroll_date" class="w-full" title="Payroll Date" required />
                <HrmsCommonDepartmentProjectSelector
                    v-model:select-type="filterType"
                    v-model:projectId="myRequests.params.project_id"
                    v-model:departmentId="myRequests.params.department_id"
                    title="Charged to"
                    class="w-full p-2"
                />
                <LayoutFormPsSelect
                    v-model="myRequests.params.payroll_type"
                    :options-list="PAYROLL_TYPE"
                    :add-all="true"
                    title="Payroll Type"
                    class="w-full p-2"
                    required
                />
                <LayoutFormPsSelect
                    v-model="myRequests.params.release_type"
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
                :datas="myRequests.list ?? []"
                @show-table="showInformation"
            />
        </LayoutLoadingContainer>
    </div>
    <div class="flex justify-center mx-auto">
        <PsCustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
    </div>
    <HrmsPayrollSalaryGeneratePayrollInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
