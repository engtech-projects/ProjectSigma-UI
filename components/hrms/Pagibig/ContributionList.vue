<script setup>
import { storeToRefs } from "pinia"
import { usePagibigStore } from "@/stores/pagibig"

const pagibig = usePagibigStore()

const { list: contributionList, isEdit, contribution, getParams, pagination, errorMessage, successMessage } = storeToRefs(pagibig)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEdit = (cont) => {
    isEdit.value = true
    contribution.value = cont
}

const deleteCont = async (cont) => {
    try {
        boardLoading.value = true
        await pagibig.deleteContribution(cont.id)
        snackbar.add({
            type: "success",
            text: pagibig.successMessage
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
    { name: "Range From", id: "range_from" },
    { name: "Range To", id: "range_to" },
    { name: "Employer Share %", id: "employer_share_percent" },
    { name: "Employer Max Contribution", id: "employer_maximum_contribution" },
    { name: "Employer Compensation", id: "employer_compensation" },
    { name: "Employee Share %", id: "employee_share_percent" },
    { name: "Employee Max Contribution", id: "employee_maximum_contribution" },
    { name: "Employee Compensation", id: "employee_compensation" },
]
const actions = {
    edit: true,
    delete: true
}

</script>

<template>
    <LayoutBoards title="Contribution List" class="w-full">
        <div class="pb-2 text-gray-500 text-[12px]">
            <LayoutPsTable :header-columns="headers" :datas="contributionList" :actions="actions" @edit-row="setEdit" @delete-row="deleteCont" />
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
