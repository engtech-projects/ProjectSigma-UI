<script setup>
import { useJournalStore } from "~/stores/accounting/journal"

const journalStore = useJournalStore()
await journalStore.getJournals()

</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <LayoutBoards
            v-if="useCheckAccessibility([
                AccessibilityTypes.accounting_journal_viewall
            ])"
            title="List of Entries"
            class="w-full"
            :loading="journalStore.isLoading"
        >
            <div class="pb-2 text-gray-500">
                <table class="table-auto w-full border-collapse">
                    <thead>
                        <tr class="text-left">
                            <th class="p-2 ">
                                Journal Date
                            </th>
                            <th class="p-2 ">
                                Journal No.
                            </th>
                            <th>
                                Note
                            </th>
                            <th>
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="journal, i in journalStore.list" :key="i" class="border text-left">
                            <td class="p-2">
                                {{ journal.journal_date }}
                            </td>
                            <td class="p-2">
                                {{ journal.journal_no }}
                            </td>
                            <td class="p-2">
                                {{ journal.remarks }}
                            </td>
                            <td class="p-2">
                                {{ journal.status }}
                            </td>
                            <td class="text-right">
                                <!-- <button @click="setEdit(trn)">
                                    <Icon name="iconoir:eye-empty" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                                </button> -->
                                <!-- <button @click="setEdit(journal)">
                                    <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                                </button> -->
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- <LayoutPsTable
                    id="listTable"
                    :header-columns="headers"
                    :datas="transactionList"
                    :actions="actions"
                    @edit-row="setEdit"
                    @delete-row="deleteType"
                /> -->
                <!-- <i v-if="!transactionList.length&&!transactionStore.isLoading" class="p-4 text-center block">No data available.</i> -->
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
