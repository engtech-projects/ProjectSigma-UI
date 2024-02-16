<script setup>
import { storeToRefs } from "pinia"
import { useBookStore } from "~/stores/accounting/book"

const bookStore = useBookStore()
const { list: bookList, book, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(bookStore)

const setEdit = (bk) => {
    isEdit.value = true
    book.value = bk
}

const deleteBook = async (bk) => {
    try {
        bookStore.isLoading = true
        await bookStore.deleteBook(bk.book_id)
        snackbar.add({
            type: "success",
            text: bookStore.successMessage
        })
    } finally {
        bookStore.isLoading = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Book Name", id: "book_name" },
    { name: "Symbol", id: "symbol" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
</script>

<template>
    <LayoutBoards title="Books List" class="w-full" :loading="bookStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable
                id="listTable"
                :header-columns="headers"
                :datas="bookList"
                :actions="actions"
                @edit-row="setEdit"
                @delete-row="deleteBook"
            />
            <i v-if="!bookList.length&&!bookStore.isLoading" class="p-4 text-center block">No data available.</i>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination
                v-if="bookList.length"
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
</template>

<style>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
