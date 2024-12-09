<script setup>
import { storeToRefs } from "pinia"
import { useBookStore } from "@/stores/accounting/setup/book"

const bookStore = useBookStore()

const { list: bookList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(bookStore)

const setEdit = (book) => {
    isEdit.value = true
    bookStore.book = book
}
const deleteBook = async (book) => {
    try {
        boardLoading.value = true
        await bookStore.deleteBook(book.id)
        snackbar.add({
            type: "success",
            text: bookStore.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    bookStore.getBooks()
}

const headers = [
    { name: "Name", id: "name", style: "text-left" },
    { name: "Code", id: "code", style: "text-left" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Books List" class="w-full" :loading="bookStore.isLoading.list">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable :header-columns="headers" :datas="bookList" :actions="actions" @edit-row="setEdit" @delete-row="deleteBook" />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
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
