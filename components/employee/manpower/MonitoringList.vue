<script setup>

import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/employee/manpower"
const manpowers = useManpowerStore()
const { list: manpowerList, isEdit, manpower, errorMessage, successMessage, pagination, getParams } = storeToRefs(manpowers)

const setEdit = (manpr) => {
    isEdit.value = true
    manpower.value = manpr
}

const deleteManpwr = async (manpr) => {
    try {
        boardLoading.value = true
        await manpowers.deleteManpower(manpr.id)
        snackbar.add({
            type: "success",
            text: manpowers.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}

const headers = [
    { name: "Requesting Department", id: "requesting_department" },
    { name: "Position/Title", id: "position" },
    { name: "Date Requested", id: "date_requested" },
    { name: "Date Required", id: "date_required" },
    { name: "Employment Type", id: "employment_type" },
    { name: "Nature of Request", id: "nature_of_request" },
    { name: "Requested by", id: "requested_by" },
    { name: "Request Status", id: "request_status" },
]
// const actions = {
//     edit: false,
//     delete: false
// }

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards title="Manpower Monitoring List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable :header-columns="headers" :datas="manpowerList" @edit-row="setEdit" @delete-row="deleteManpwr" />
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
        <!-- <div
            class="shadow-md p-4 mt-5 bg-white mb-3 border border-gray-200 rounded-lg w-full"
        >
            <EasyTable
                show-index
                :headers="headers"
                :items="items"
                class="mt-5"
            >
                <template #item-actions="item">
                    <button
                        @click="approveItem(item)"
                    >
                        <Icon name="material-symbols:check-circle" color="green" class="w-5 h-5" />
                    </button>
                    <button
                        @click="denyItem(item)"
                    >
                        <Icon name="material-symbols:cancel" color="red" class="w-5 h-5" />
                    </button>
                    <button
                        @click="viewItem(item)"
                    >
                        <Icon name="material-symbols:visibility-rounded" color="blue" class="w-5 h-5" />
                    </button>
                </template>
            </EasyTable>

            <div v-if="selectedItemDetails">
                <div class="fixed inset-0 bg-black opacity-50 " />
                <div class="fixed inset-0 flex items-center justify-center ">
                    <div class="bg-white p-8 max-w-lg rounded-lg border border-slate-300">
                        <h2 class="text-lg font-semibold mb-4">
                            Item Details
                        </h2>
                        <ul>
                            <li><strong>Employee Name:</strong> {{ selectedItemDetails.employee_name }}</li>
                            <li><strong>Department:</strong> {{ selectedItemDetails.department_name }}</li>
                            <li><strong>Action Taken:</strong> {{ selectedItemDetails.action_taken }}</li>
                        </ul>
                        <button class="mt-4" @click="closeViewModal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div> -->
    </LayoutBoards>
</template>
