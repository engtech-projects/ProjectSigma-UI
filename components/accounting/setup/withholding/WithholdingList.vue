<script setup>
import { storeToRefs } from "pinia"
import { useWithholdingTaxStore } from "@/stores/accounting/setup/withholdingtax"

const withholdingTaxStore = useWithholdingTaxStore()
const { isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(withholdingTaxStore)

const setEdit = (wt) => {
    isEdit.value = true
    withholdingTaxStore.withholdingTax = wt
}
const deleteWithholdingTax = async (wt) => {
    try {
        boardLoading.value = true
        await withholdingTaxStore.deleteWithholdingTax(wt.id)
        snackbar.add({
            type: "success",
            text: withholdingTaxStore.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "Something went wrong"
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    withholdingTaxStore.getWithholdingTaxes()
}

const headers = [
    { name: "Name", id: "wtax_name" },
    { name: "Vat Type", id: "vat_type" },
    { name: "Percentage", id: "wtax_percentage" },
    { name: "Account", id: "account.account_name" }
]
const actions = {
    edit: true,
    delete: true
}
const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Withholding Tax List" class="w-full" :loading="withholdingTaxStore.isLoading.list">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="withholdingTaxStore.list" :actions="actions" @edit-row="setEdit" @delete-row="deleteWithholdingTax" />
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
