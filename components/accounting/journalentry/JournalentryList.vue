<script setup>
import { useJournalStore } from "~/stores/accounting/journal"

const journalStore = useJournalStore()
</script>
<template>
    <div class="bg-white shadow rounded-lg border border-gray-200 px-2 relative">
        <div v-if="journalStore.isLoading.list" class="absolute z-50 bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <div class="flex justify-between items-center h-16 border-b px-4">
            <h2 class="text-xl text-gray-800">
                List of Entries
            </h2>
        </div>
        <div class="flex flex-col gap-3 p-4 w-full">
            <div class="flex flex-col items-end gap-4">
                <div class="pb-2 text-gray-500">
                    <table class="table-auto w-full border-collapse !text-sm">
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
                                <td class="text-right p-2">
                                    <Icon
                                        name="material-symbols:visibility-rounded"
                                        color="white"
                                        class="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded h-8 w-8 p-1 cursor-pointer"
                                        @click="navigate('/accounting/payment-request?details=' + pr.id, 'view-details', pr)"
                                    />
                                    <!-- <button @click="setEdit(journal)">
                                        <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                                    </button> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important;
    }
</style>
