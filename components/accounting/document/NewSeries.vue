<script lang="ts" setup>
import { useTransactionTypeStore } from "~/stores/accounting/transactions/transactiontype"
import { useDocumentSeriesStore } from "~/stores/accounting/documents/documentseries"

const transactionTypeStore = useTransactionTypeStore()
transactionTypeStore.getTransactionTypes()
const documentSeriesStore = useDocumentSeriesStore()
const snackbar = useSnackbar()
const isLoading = ref(false)

async function handleSubmit () {
    try {
        isLoading.value = true
        await documentSeriesStore.createSeries()
        if (documentSeriesStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: documentSeriesStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: documentSeriesStore.successMessage
            })
            navigateTo("/accounting/document-series")
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: documentSeriesStore.errorMessage
        })
    } finally {
        isLoading.value = false
        documentSeriesStore.reset()
    }
}
</script>
<template>
    <LayoutBoards title="Create New Document Series" :loading="isLoading" class="w-full">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2">
                <div>
                    <label
                        for="series_scheme"
                        class="text-xs italic"
                    >Series Scheme</label>
                    <input
                        id="bookCode"
                        v-model="documentSeriesStore.documentSeries.series_scheme"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>

                <div>
                    <label
                        for="next_number"
                        class="text-xs italic"
                    >Next Number</label>
                    <input
                        id="nextNumber"
                        v-model="documentSeriesStore.documentSeries.next_number"
                        type="number"
                        class="w-full rounded-lg"
                        required
                    >
                </div>

                <div>
                    <label
                        for="transaction_type"
                        class="text-xs italic"
                    >Transaction Type</label>
                    <select
                        id="transactionType"
                        v-model="documentSeriesStore.documentSeries.transaction_type_id"
                        class="w-full rounded-lg"
                        required
                    >
                        <option v-for="trans in transactionTypeStore.list" :key="trans.transaction_type_id" :value="trans.transaction_type_id">
                            {{ trans.transaction_type_name }}
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        for="status"
                        class="text-xs italic"
                    >Status</label>
                    <select
                        id="typeName"
                        v-model="documentSeriesStore.documentSeries.status"
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

                    <div>
                        <label
                            for="series_description"
                            class="text-xs italic"
                        >Series Description</label>
                        <textarea
                            id="seriesDescription"
                            v-model="documentSeriesStore.documentSeries.series_description"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        />
                    </div>
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    to="/accounting/document-series"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Series
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped></style>
