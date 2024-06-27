<script setup>

import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
const manpowers = useManpowerStore()
const { list: manpowerList, errorMessage, successMessage, pagination, getParams } = storeToRefs(manpowers)
const infoModalData = ref(null)
const showInfoModal = ref(false)

const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Requesting Department", id: "requesting_department" },
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

const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="manpowerList ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto p-2">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
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
    </LayoutBoards>
    <HrmsEmployeeManpowerInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
