<script setup>
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"

// const { list: contributionList, isEdit, contribution, getParams, pagination, errorMessage, successMessage } = storeToRefs(contributions)

const travels = useTravelorderStore()
const { travel, list: travelList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(travels)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEdit = (trv) => {
    isEdit.value = true
    travel.value = trv
}

const deleteReq = async (cont) => {
    try {
        boardLoading.value = true
        await travels.deleteContribution(cont.id)
        snackbar.add({
            type: "success",
            text: travels.successMessage
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
    { name: "Requesting Office", id: "range_from" },
    { name: "Range To", id: "range_to" },
    { name: "Employer Share", id: "employer_share" },
    { name: "Employer Contribution", id: "employer_contribution" },
    { name: "Employee Share", id: "employee_share" },
    { name: "Employee Contribution", id: "employee_contribution" },
]
const actions = {
    edit: true,
    delete: true
}

</script>

<template>
    <LayoutBoards title="Travel Order Request List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable :header-columns="headers" :datas="travelList" :actions="actions" @edit-row="setEdit" @delete-row="deleteReq" />
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
    </LayoutBoards>
</template>
