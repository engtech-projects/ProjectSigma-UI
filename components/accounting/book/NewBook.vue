<script lang="ts" setup>
import { useAccountStore } from "~/stores/accounting/account"
import { useBookStore } from "~/stores/accounting/book"

const bookStore = useBookStore()
const snackbar = useSnackbar()
const isLoading = ref(false)

const accountStore = useAccountStore()
accountStore.getAccounts()

function select (val:any) {
    bookStore.book.account_id = val.account_id
}

async function handleSubmit () {
    try {
        isLoading.value = true
        await bookStore.createAccount()
        if (bookStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: bookStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: bookStore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: bookStore.errorMessage
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <LayoutBoards title="Create New Book" :loading="isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="book_name"
                        class="text-xs italic"
                    >Book Name</label>
                    <input
                        id="bookName"
                        v-model="bookStore.book.book_name"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>

                <div>
                    <label
                        for="book_name"
                        class="text-xs italic"
                    >Account</label>
                    <AccountingSelectSearch
                        :options="accountStore.list"
                        title="account_name"
                        opid="account_id"
                        :selected-id="bookStore.book.account_id"
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
                        v-model="bookStore.book.symbol"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    to="/accounting/books"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Book
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
