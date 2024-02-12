<script setup>
import { storeToRefs } from "pinia"
import { useTransactionTypeStore } from "~/stores/accounting/transactiontype"

const transactionTypeStore = useTransactionTypeStore()
await transactionTypeStore.getTransactionTypes()
const { list: typeList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(transactionTypeStore)

const setEdit = (ttype) => {
    isEdit.value = true
    transactionTypeStore.transactionType = ttype
}

const isLoading = ref(false)
const deleteType = async (ttype) => {
    try {
        transactionTypeStore.isLoading = true
        await transactionTypeStore.deleteTransactionType(ttype.transaction_type_id)
        snackbar.add({
            type: "success",
            text: transactionTypeStore.successMessage
        })
    } finally {
        isLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Transaction Type Name", id: "transaction_type_name" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
</script>

<template>
    <LayoutBoards title="Transaction Type List" class="w-full" :loading="transactionTypeStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable
                id="listTable"
                :header-columns="headers"
                :datas="typeList"
                :actions="actions"
                @edit-row="setEdit"
                @delete-row="deleteType"
            />
            <i v-if="!typeList.length&&!transactionTypeStore.isLoading" class="p-4 text-center block">No data available.</i>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination
                v-if="typeList.length"
                :links="pagination"
                @change-params="changePaginate"
            />
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

<style>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
