<script setup>
import { storeToRefs } from "pinia"
import { useBookStore } from "@/stores/accounting/setup/book"
import { useAccountGroupStore } from "@/stores/accounting/setup/accountgroups"

const bookStore = useBookStore()
const acountGroupStore = useAccountGroupStore()
const { errorMessage, successMessage } = storeToRefs(bookStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const handleSubmit = async () => {
    try {
        boardLoading.value = true
        await bookStore.createBook()
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
        boardLoading.value = false
        bookStore.clearMessages()
    }
}
</script>
<template>
    <LayoutBoards title="Book" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="handleSubmit">
                <div class="flex flex-col gap-2">
                    <div>
                        <label
                            for="book_name"
                            class="text-xs italic"
                        >Book Name</label>
                        <input
                            id="bookName"
                            v-model="bookStore.book.name"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="book_code"
                            class="text-xs italic"
                        >Code</label>
                        <input
                            id="bookCode"
                            v-model="bookStore.book.code"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div>
                        <label
                            for="account_category"
                            class="text-xs italic"
                        >Account Group</label>
                        <select id="accountCategory" v-model="bookStore.book.account_group_id" class="w-full rounded-lg" required>
                            <option v-for="ag, i in acountGroupStore.list" :key="i" :value="ag.id">
                                {{ upperFirst(ag.name) }}
                            </option>
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
            <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="success-message text-green-600 text-center font-semibold italic transition-opacity delay-1000"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
