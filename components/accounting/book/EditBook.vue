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
        await bookStore.editBook()
        snackbar.add({
            type: "success",
            text: bookStore.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: bookStore.errorMessage || "something went wrong."
        })
    } finally {
        isLoading.value = false
    }
}

function select (val:any) {
    bookStore.book.account_id = val.account_id
}

const selectedId = computed(() => {
    return bookStore.book.account_id
})

function cancelEdit () {
    bookStore.isEdit = false
    bookStore.reset()
}
</script>

<template>
    <LayoutBoards title="Edit New Book" :loading="isLoading" class="w-full border-t-8 rounded-lg border-teal-500">
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
                    <AccountingSelectSearch :options="accountStore.list" title="account_name" opid="account_id" :selected-id="selectedId" @select="select" />
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
                        <option value="active">
                            Active
                        </option>
                        <option value="inactive">
                            Inactive
                        </option>
                    </select>
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
                    Update Book
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
