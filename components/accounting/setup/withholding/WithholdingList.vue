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
    { name: "Account", id: "account_label" }
]
const actions = {
    edit: true,
    delete: true
}

const withholdingTaxList = computed(() => {
    return withholdingTaxStore.list.map((wt) => {
        return {
            ...wt,
            account_label: wt.account.account_number + " - " + wt.account.account_name
        }
    })
})
const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Withholding Tax List" class="w-full" :loading="withholdingTaxStore.isLoading.list">
        <div class="w-1/2 flex px-4">
            <LayoutFormPsTextInput v-model="withholdingTaxStore.getParams.key" title="Search Withholding Tax" class="w-full" />
        </div>
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="withholdingTaxList" :actions="actions" @edit-row="setEdit" @delete-row="deleteWithholdingTax" />
        </div>
        <div v-if="withholdingTaxStore.list.length" class="flex justify-center mx-auto">
            <PsCustomPagination :links="pagination" @change-params="changePaginate" />
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
