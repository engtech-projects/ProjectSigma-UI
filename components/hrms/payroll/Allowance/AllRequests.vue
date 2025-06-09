<script setup>
import { storeToRefs } from "pinia"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

const genallowstore = useGenerateAllowanceStore()
const { allRequests, errorMessage, successMessage } = storeToRefs(genallowstore)
if (!allRequests.value.isLoaded) {
    allRequests.value.isLoaded = true
    genallowstore.getAllRequests()
}

const boardLoading = ref(false)

const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Charge Department", id: "charge_name" },
    { name: "Cutoff Start", id: "cutoff_start_human" },
    { name: "Cutoff End", id: "cutoff_end_human" },
    { name: "Allowance Date", id: "allowance_date_human" },
    { name: "Total # of Day(s)", id: "total_days" },
    { name: "Requested by", id: "requested_by_user" },
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

</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="allRequests.list"
                :actions="actions"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic"
        >
            {{ successMessage }}
        </p>
    </LayoutLoadingContainer>
    <HrmsPayrollAllowanceInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
