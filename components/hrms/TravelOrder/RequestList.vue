<script setup>
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"

const travels = useTravelorderStore()
const { list: travelList, getParams, pagination, errorMessage, successMessage } = storeToRefs(travels)

const boardLoading = ref(false)

const headers = [
    { name: "Requesting Office", id: "department.department_name" },
    { name: "Destination", id: "destination" },
    { name: "Purpose", id: "purpose_of_travel" },
    { name: "Duration", id: "duration_of_travel" },
    { name: "Remarks", id: "remarks" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}

const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <!-- <pre>{{ travelList }}</pre> -->
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="travelList ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
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
        <HrmsTravelOrderInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
            :show-approvals="false"
        />
    </LayoutBoards>
</template>
