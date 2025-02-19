<script setup>
import { storeToRefs } from "pinia"
import { useTermsStore } from "@/stores/accounting/setup/terms"

const termsStore = useTermsStore()

const { list: termsList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(termsStore)

const setEdit = (term) => {
    isEdit.value = true
    termsStore.term = term
}
const deleteTerm = async (term) => {
    try {
        boardLoading.value = true
        await termsStore.deleteTerm(term.id)
        snackbar.add({
            type: "success",
            text: termsStore.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    termsStore.getTerms()
}

const headers = [
    { name: "Name", id: "name", style: "text-left" },
    { name: "Entry Type", id: "debit_credit", style: "text-left" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Terms List" class="w-full" :loading="termsStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="termsList" :actions="actions" @edit-row="setEdit" @delete-row="deleteTerm" />
        </div>
        <div v-if="termsList.length" class="flex justify-center mx-auto">
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
