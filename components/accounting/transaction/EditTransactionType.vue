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

async function updateTransactionType () {
    try {
        boardLoading.value = true
        await transactionTypeStore.editTransactionType()
        snackbar.add({
            type: "success",
            text: transactionTypeStore.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: transactionTypeStore.errorMessage || "something went wrong."
        })
    } finally {
        // transactionTypeStore.clearMessages()
        boardLoading.value = false
    }
}

function cancelEdit () {
    transactionTypeStore.isEdit = false
    transactionTypeStore.reset()
}

function select (val:any) {
    transactionTypeStore.transactionType.account_id = val.account_id
}
</script>

<template>
    <LayoutBoards title="Edit Transaction Type" :loading="boardLoading" class="w-full h-fit border-t-8 rounded-lg border-teal-500">
        <form @submit.prevent="updateTransactionType">
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
            </div>

            <div class="flex justify-end gap-4">
                <button
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5"
                    @click="cancelEdit"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Update
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
