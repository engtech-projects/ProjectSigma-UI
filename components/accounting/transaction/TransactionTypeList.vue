<script setup>
import { storeToRefs } from "pinia"
import { useTransactionTypeStore } from "~/stores/accounting/transactiontype"

const transactionTypeStore = useTransactionTypeStore()
await transactionTypeStore.getTransactionTypes()
const { list: typeList, getParams, pagination, errorMessage, successMessage } = storeToRefs(transactionTypeStore)

// const setEdit = (ttype) => {
//     isEdit.value = true
//     transactionTypeStore.transactionType = ttype
//     return navigateTo("/accounting/transaction-type/edit?id=" + ttype.transaction_type_id)
// }

// const isLoading = ref(false)
// const deleteType = async (ttype) => {
//     try {
//         transactionTypeStore.isLoading = true
//         await transactionTypeStore.deleteTransactionType(ttype.transaction_type_id)
//         snackbar.add({
//             type: "success",
//             text: transactionTypeStore.successMessage
//         })
//     } finally {
//         isLoading.value = false
//     }
// }

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Transaction Type Name", id: "transaction_type_name" },
    { name: "Symbol", id: "symbol" }
]
// const actions = {
//     edit: true,
//     delete: true
// }

// const snackbar = useSnackbar()
</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <!-- <NuxtLink
            to="/accounting/transaction-type/create"
            class="flex-1 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
        >
            <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
            <span>Create New Type</span>
        </NuxtLink> -->
        <LayoutBoards title="Transaction Type List" class="w-full" :loading="transactionTypeStore.isLoading">
            <div class="pb-2 text-gray-500">
                <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="typeList"
                    :actions="actions"
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
    </div>
</template>

<style scoped>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
