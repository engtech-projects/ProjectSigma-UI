<script setup>
import { storeToRefs } from "pinia"
import { useDocumentSeriesStore } from "~/stores/accounting/documentseries"

const documentSeriesStore = useDocumentSeriesStore()
const { list: seriesList, documentSeries, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(documentSeriesStore)

const setEdit = (ds) => {
    isEdit.value = true
    documentSeries.value = ds
}

const deleteSeries = async (ds) => {
    try {
        documentSeriesStore.isLoading = true
        await documentSeriesStore.deleteSeries(ds.series_id)
        snackbar.add({
            type: "success",
            text: documentSeriesStore.successMessage
        })
    } finally {
        documentSeriesStore.isLoading = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}

const headers = [
    { name: "Series Scheme", id: "series_scheme" },
    { name: "Description", id: "series_description" },
    { name: "Next Number", id: "next_number" },
    { name: "Status", id: "status" },
]
const actions = {
    edit: true,
    delete: true
}

const snackbar = useSnackbar()
</script>

<template>
    <LayoutBoards title="Document Series List" class="w-full" :loading="documentSeriesStore.isLoading">
        <div class="pb-2 text-gray-500">
            <LayoutPsTable
                id="listTable"
                :header-columns="headers"
                :datas="seriesList"
                :actions="actions"
                @edit-row="setEdit"
                @delete-row="deleteSeries"
            />
            <i v-if="!seriesList.length&&!documentSeriesStore.isLoading" class="p-4 text-center block">No data available.</i>
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination
                v-if="seriesList.length"
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
