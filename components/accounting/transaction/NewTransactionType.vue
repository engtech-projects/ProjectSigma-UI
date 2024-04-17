<script lang="ts" setup>
import { useTransactionTypeStore } from "~/stores/accounting/transactiontype"
import { useBookStore } from "~/stores/accounting/book"
import { useAccountStore } from "~/stores/accounting/account"

const transactionTypeStore = useTransactionTypeStore()
const bookStore = useBookStore()
bookStore.getBooks()
const accountStore = useAccountStore()
accountStore.getAccounts()
const boardLoading = ref(false)
const snackbar = useSnackbar()

async function handleSubmit () {
    try {
        boardLoading.value = true
        await transactionTypeStore.createTransactionType()
        if (transactionTypeStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: transactionTypeStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: transactionTypeStore.successMessage
            })
        }
    } catch (error) {
        transactionTypeStore.errorMessage = errorMessage
        snackbar.add({
            type: "error",
            text: transactionTypeStore.errorMessage
        })
    } finally {
        transactionTypeStore.reset()
        boardLoading.value = false
    }
}

async function updateType () {
    // try {
    //     boardLoading.value = true
    //     await transactionTypeStore.editAccountType()
    //     snackbar.add({
    //         type: "success",
    //         text: transactionTypeStore.successMessage
    //     })
    // } catch {
    //     snackbar.add({
    //         type: "error",
    //         text: transactionTypeStore.errorMessage || "something went wrong."
    //     })
    // } finally {
    //     // transactionTypeStore.clearMessages()
    //     boardLoading.value = false
    // }
}

// function cancelEdit () {
//     transactionTypeStore.isEdit = false
//     transactionTypeStore.reset()
// }
function select (val:any) {
    transactionTypeStore.transactionType.account_id = val.account_id
}
</script>

<template>
    <LayoutBoards title="Create New Transaction Type" :loading="boardLoading" class="w-full h-fit">
        <form @submit.prevent="!transactionTypeStore.isEdit?handleSubmit():updateType()">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="transaction_type_name"
                        class="text-xs italic"
                    >Transaction Type Name</label>
                    <input
                        id="transationTypeName"
                        v-model="transactionTypeStore.transactionType.transaction_type_name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div>
                    <label
                        for="book"
                        class="text-xs italic"
                    >Book</label>
                    <select
                        id="book"
                        v-model="transactionTypeStore.transactionType.book_id"
                        class="w-full rounded-lg"
                        required
                    >
                        <option v-for="book in bookStore.list" :key="book.book_id" :value="book.book_id">
                            {{ book.book_name }}
                        </option>
                    </select>
                </div>
                <div>
                    <label
                        for="book"
                        class="text-xs italic"
                    >Account</label>
                    <AccountingSelectSearch
                        :options="accountStore.list"
                        title="account_name"
                        opid="account_id"
                        :selected-id="transactionTypeStore.transactionType.account_id"
                        @select="select"
                    />
                </div>

                <div>
                    <label
                        for="symbol"
                        class="text-xs italic"
                    >Symbol</label>
                    <input
                        id="bookName"
                        v-model="transactionTypeStore.transactionType.symbol"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    to="/accounting/transaction-type"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Transaction Type
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
