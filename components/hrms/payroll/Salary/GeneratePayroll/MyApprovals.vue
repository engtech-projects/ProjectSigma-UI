<script setup>
import { useGeneratePayrollStore, PAYROLL_TYPE, RELEASE_TYPE } from "@/stores/hrms/payroll/generatePayroll"

const genPayrollRequestsStore = useGeneratePayrollStore()
const { myApprovals } = storeToRefs(genPayrollRequestsStore)
const debouncedGetData = useDebounceFn(() => {
    genPayrollRequestsStore.getMyApprovals()
}, 500)
onMounted(() => {
    if (!myApprovals.value.isLoaded) {
        myApprovals.value.isLoaded = true
        debouncedGetData()
    }
})
watch(
    () => ({ ...myApprovals.value.params }),
    (newParams, oldParams) => {
        if (newParams.page === oldParams.page) {
            myApprovals.value.page = 1
        }
        debouncedGetData()
    }, {
        deep: true,
    }
)
const headers = [
    { name: "Payroll Date", id: "payroll_date_human" },
    { name: "Charged to", id: "charging_name" },
    { name: "Cut Off Start", id: "cutoff_start_human" },
    { name: "Cut Off End", id: "cutoff_end_human" },
    { name: "Payroll Type", id: "payroll_type" },
    { name: "Release Type", id: "release_type" },
    { name: "Request Status", id: "request_status" },
]

const changePaginate = (newParams) => {
    myApprovals.value.params.page = newParams.page ?? ""
}
const actions = {
    showTable: true,
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
        <LayoutLoadingContainer :loading="myApprovals.isLoading">
            <!-- FILTERS -->
            <div class="flex gap-2">
                <LayoutFormPsDateInput v-model="myApprovals.params.payroll_date" class="w-full" title="Payroll Date" required />
                <HrmsCommonDepartmentProjectSelector
                    v-model:select-type="filterType"
                    v-model:projectId="myApprovals.params.project_id"
                    v-model:departmentId="myApprovals.params.department_id"
                    title="Charged to"
                    class="w-full p-2"
                />
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
    <HrmsPayrollSalaryGeneratePayrollInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
