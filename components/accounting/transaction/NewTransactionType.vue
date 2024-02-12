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
                    <select
                        id="account"
                        v-model="transactionTypeStore.transactionType.account_id"
                        class="w-full rounded-lg"
                        required
                    >
                        <option v-for="account in accountStore.list" :key="account.account_id" :value="account.account_id">
                            {{ account.account_name }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="flex justify-end">
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
