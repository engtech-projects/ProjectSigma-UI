<script setup>
import { useJournalStore } from "~/stores/accounting/journal"

const journalStore = useJournalStore()
</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <div class="flex">
            <NuxtLink
                to="/accounting/journal-entry/create"
                class="flex-1 text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
            >
                <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
                <span>New Entry</span>
            </NuxtLink>
        </div>
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
        </LayoutBoards>
    </div>
</template>

<style scoped>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
