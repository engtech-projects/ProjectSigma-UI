<script setup>

import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
const manpowers = useManpowerStore()
const { allRequests } = storeToRefs(manpowers)
onMounted(() => {
    if (!allRequests.value.isLoaded) {
        manpowers.getAllRequests()
    }
})
const infoModalData = ref({})
const showInfoModal = ref(false)

const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Requesting Department", id: "requesting_department_name" },
    { name: "Position/Title", id: "position.name" },
    { name: "Date Requested", id: "date_requested" },
    { name: "Date Required", id: "date_required" },
    { name: "Employment Type", id: "employment_type" },
    { name: "Nature of Request", id: "nature_of_request" },
    { name: "Requested by", id: "requested_by_user.name" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true,
}

</script>

<template>
    <LayoutLoadingContainer class="w-full" :loading="allRequests.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="allRequests.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto p-2">
            <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <HrmsEmployeeManpowerInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
