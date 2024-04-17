<script setup>
import { storeToRefs } from "pinia"
import { useWtaxStore } from "@/stores/hrms/setup/wtax"

const withholdings = useWtaxStore()

const { list: withholdingList, isEdit, withholding, getParams, pagination, errorMessage, successMessage } = storeToRefs(withholdings)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEdit = (tax) => {
    isEdit.value = true
    withholding.value = tax
}

const deleteWtax = async (tax) => {
    try {
        boardLoading.value = true
        await withholdings.deleteWithholding(tax.id)
        snackbar.add({
            type: "success",
            text: withholdings.successMessage
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
    { name: "Term", id: "term" },
    { name: "Salary Range From", id: "range_from" },
    { name: "Salary Range To", id: "range_to" },
    { name: "Tax Base", id: "tax_base" },
    { name: "Tax Amount", id: "tax_amount" },
    { name: "Tax Percent Over Base", id: "tax_percent_over_base" },
]
const actions = {
    edit: true,
    delete: true
}
</script>

<template>
    <LayoutBoards title="Withholding Table" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="withholdingList" :actions="actions" @edit-row="setEdit" @delete-row="deleteWtax" />
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
