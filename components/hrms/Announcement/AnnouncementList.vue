<script setup>
import { storeToRefs } from "pinia"
import { useMain } from "@/stores/announcements"

const mains = useMain()

// const { isEdit, main, getParams, pagination, errorMessage, successMessage } = storeToRefs(mains)
const { announcement, successMessage } = storeToRefs(mains)

const deleted = async (dept) => {
    try {
        boardLoading.value = true
        await mains.delete(dept.id)
        snackbar.add({
            type: "success",
            text: successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const headers = [
    { name: "Announcement", id: "announcement" },
]

const snackbar = useSnackbar()
const boardLoading = ref(false)

</script>
<template>
    <LayoutBoards title="Announcement List">
        <div class="mt-5 mb-6">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button type="button" class="gap-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <Icon name="mdi:printer-pos-plus" />
                    Print
                </button>
                <button type="button" class="gap-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <Icon name="mdi:file-excel" />
                    Excel
                </button>
                <button type="button" class="gap-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                    <Icon name="mdi:file-pdf-box" />
                    PDF
                </button>
            </div>
        </div>
        <div class="mt-5 mb-6">
            <!-- <LayoutPsTable :header-columns="headers" :datas="announcement" :actions="actions" @edit-row="setEdit" @delete-row="deleteDept" /> -->
            <LayoutPsTable :header-columns="headers" :datas="announcement" :actions="actions" @delete-row="deleted" />
        </div>
    </LayoutBoards>
</template>
