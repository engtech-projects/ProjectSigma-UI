<script setup>
import { storeToRefs } from "pinia"
import { useTransactionStore } from "~/stores/accounting/transactions/transaction"
import { useTransactionTypeStore } from "~/stores/accounting/transactions/transactiontype"

const transactionTypeStore = useTransactionTypeStore()
await transactionTypeStore.getTransactionTypes()

const transactionStore = useTransactionStore()
const { list: transactionList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(transactionStore)

const setEdit = (ttype) => {
    isEdit.value = true
    transactionStore.transaction = ttype
    return navigateTo("/accounting/transaction/edit?id=" + ttype.transaction_id)
}

// const isLoading = ref(false)
// const deleteType = async (ttype) => {
//     try {
//         transactionStore.isLoading = true
//         await transactionStore.deleteTransactionType(ttype.transaction_type_id)
//         snackbar.add({
//             type: "success",
//             text: transactionStore.successMessage
//         })
//     } finally {
//         isLoading.value = false
//     }
// }

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

// const headers = [
//     { name: "Date", id: "transaction_date" },
//     { name: "No.", id: "transaction_no" },
//     { name: "Transaction Type", id: "transaction_type_id" },
//     { name: "Reference", id: "reference_no" },
//     { name: "Payee", id: "stakeholder" },
//     { name: "Status", id: "status" },
// ]
// const actions = {
//     edit: true,
//     delete: true
// }

// const snackbar = useSnackbar()
const filter = ref("all")
const applyFilter = () => {
    transactionStore.getTransactions(filter.value !== "all" ? filter.value : null)
}
</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <div class="flex items-center gap-4 w-full">
            <div class="flex gap-2 items-center px-4 py-1 rounded-lg flex-1">
                <div class="flex flex-col gap-[2px]">
                    <label for="" class="text-xs">Transaction Type</label>
                    <div class="flex gap-2 h-8">
                        <select
                            id="period"
                            v-model="filter"
                            class="flex-1 h-8 rounded-lg text-sm py-1 px-2"
                            required
                        >
                            <option value="all">
                                All
                            </option>
                            <option v-for="p in transactionTypeStore.list" :key="p.transaction_type_id" :value="p.transaction_type_name">
                                {{ p.transaction_type_name }}
                            </option>
                        </select>
                        <button
                            class="w-fit text-white p-2 rounded bg-gray-500 content-center text-center px-4 flex items-center hover:bg-gray-700 active:bg-gray-600"
                            @click="applyFilter"
                        >
                            <Icon name="fa:filter" class="mr-2 mt-[3px]" />
                            <span>Apply Filter</span>
                        </button>
                    </div>
                </div>
            </div>
            <NuxtLink
                to="/accounting/transaction/create"
                class="w-48 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
            >
                <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
                <span>New Transaction</span>
            </NuxtLink>
        </div>
        <LayoutBoards title="List of Transactions" class="w-full" :loading="transactionStore.isLoading">
            <div class="pb-2 text-gray-500">
                <table class="table-auto w-full border-collapse">
                    <thead>
                        <tr class="text-left">
                            <th class="p-2 ">
                                Date
                            </th>
                            <th class="p-2">
                                Type
                            </th>
                            <th class="p-2">
                                No.
                            </th>
                            <th class="p-2">
                                Payee
                            </th>
                            <th class="p-2">
                                Reference
                            </th>
                            <th class="p-2">
                                Status
                            </th>
                            <th class="p-2 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="trn, i in transactionStore.list" :key="i" class="border text-left">
                            <td class="p-2">
                                {{ trn.transaction_date }}
                            </td>
                            <td class="p-2">
                                {{ trn.transaction_type? trn.transaction_type_name : "" }}
                            </td>
                            <td class="p-2">
                                {{ trn.transaction_no }}
                            </td>
                            <td class="p-2">
                                {{ trn.stakeholder.full_name }}
                            </td>
                            <td class="p-2">
                                {{ trn.reference_no }}
                            </td>
                            <td class="p-2">
                                {{ trn.status }}
                            </td>
                            <td class="text-right">
                                <button @click="setEdit(trn)">
                                    <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="transactionList"
                    :actions="actions"
                    @edit-row="setEdit"
                    @delete-row="deleteType"
                /> -->
                <!-- <i v-if="!transactionList.length&&!transactionStore.isLoading" class="p-4 text-center block">No data available.</i> -->
            </div>
            <div class="flex justify-center mx-auto">
                <CustomPagination
                    v-if="transactionList.length"
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
