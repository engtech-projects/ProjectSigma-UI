<script setup>
import { storeToRefs } from "pinia"
import { useBookStore } from "~/stores/accounting/setup/book"

const bookStore = useBookStore()
const { list: bookList, getParams, pagination, errorMessage, successMessage } = storeToRefs(bookStore)

// const setEdit = (bk) => {
//     isEdit.value = true
//     book.value = bk
//     return navigateTo("/accounting/books/edit?id=" + bk.book_id)
// }

// const deleteBook = async (bk) => {
//     try {
//         bookStore.isLoading = true
//         await bookStore.deleteBook(bk.book_id)
//         snackbar.add({
//             type: "success",
//             text: bookStore.successMessage
//         })
//     } finally {
//         bookStore.isLoading = false
//     }
// }

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Book Name", id: "name" },
    { name: "Code", id: "code" },
]
// const actions = {
//     edit: true,
//     delete: true
// }

// const snackbar = useSnackbar()
</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <!-- <NuxtLink
            to="/accounting/books/create"
            class="flex-1 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
        >
            <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
            <span>Create New Book</span>
        </NuxtLink> -->
        <LayoutBoards title="List of Books" class="w-full" :loading="bookStore.isLoading">
            <div class="pb-2 text-gray-500">
                <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="bookList"
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
    </div>
</template>

<style scoped>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
