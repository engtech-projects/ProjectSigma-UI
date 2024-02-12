<script lang="ts" setup>
import { useAccountStore } from "~/stores/accounting/account"
import { useBookStore } from "~/stores/accounting/book"

const bookStore = useBookStore()
const snackbar = useSnackbar()
const isLoading = ref(false)

const accountStore = useAccountStore()
accountStore.getAccounts()

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
        bookStore.reset()
    }
}
</script>

<template>
    <LayoutBoards title="Create New Book" :loading="isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="book_code"
                        class="text-xs italic"
                    >Book Code</label>
                    <input
                        id="bookCode"
                        v-model="bookStore.book.book_code"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>

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
                    <select
                        id="typeName"
                        v-model="bookStore.book.account_id"
                        class="w-full rounded-lg"
                        required
                    >
                        <option v-for="acct in accountStore.list" :key="acct.account_id" :value="acct.account_id">
                            {{ acct.account_name }}
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        for="book_status"
                        class="text-xs italic"
                    >Status</label>
                    <select
                        id="typeName"
                        v-model="bookStore.book.status"
                        class="w-full rounded-lg"
                        required
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div class="flex justify-end">
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
