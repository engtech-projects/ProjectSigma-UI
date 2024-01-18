<script  setup lang="ts">

import { Header, Item } from "vue3-easy-data-table"

useHead({
    title: "SSS",
})

const headers: Header[] = [
    { text: "Range of Compensation", value: "range_compensation" },
    { text: "Emlpoyer Share", value: "employer_share" },
    { text: "Employee Share", value: "employee_share" },
    { text: "Total Contributions", value: "total_contributions" },
    { text: "Actions", value: "actions" },
]

const items: Item[any] = ref([
    {
        range_compensation: "range compensation lorem1",
        employer_share: "employer share lorem1",
        employee_share: "employee share lorem1",
        total_contributions: "total contributions lorem1",
    },
    {
        range_compensation: "range compensation lorem2",
        employer_share: "employer share lorem2",
        employee_share: "employee share lorem2",
        total_contributions: "total contributions lorem2",
    },
    {
        range_compensation: "range compensation lorem3",
        employer_share: "employer share lorem3",
        employee_share: "employee share lorem3",
        total_contributions: "total contributions lorem3",
    },
    {
        range_compensation: "range compensation lorem4",
        employer_share: "employer share lorem4",
        employee_share: "employee share lorem4",
        total_contributions: "total contributions lorem4",
    },
    {
        range_compensation: "range compensation lorem5",
        employer_share: "employer share lorem5",
        employee_share: "employee share lorem5",
        total_contributions: "total contributions lorem5",
    },
    {
        range_compensation: "range compensation lorem6",
        employer_share: "employer share lorem6",
        employee_share: "employee share lorem6",
        total_contributions: "total contributions lorem6",
    },
    {
        range_compensation: "range compensation lorem7",
        employer_share: "employer share lorem7",
        employee_share: "employee share lorem7",
        total_contributions: "total contributions lorem7",
    },
])

</script>

<template>
    <div>
        <h2 class="mt-5 text-2xl font-semibold dark:text-white">
            SSS
        </h2>
        <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
            <label for="" class="text-xl font-semibold text-gray-900">Add SSS Contribution Range</label>
            <div class="mt-5 mb-6">
                <label for="range_compensation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Range Compensation</label>
                <input
                    id="range_compensation"
                    v-model="AddItem.range_compensation"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                >
            </div>
            <div class="mb-6">
                <label for="employer_share" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employer Share</label>
                <input
                    id="employer_share"
                    v-model="AddItem.employer_share"
                    type="number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    @change="autoAdd"
                >
            </div>
            <div class="mb-6">
                <label for="employee_share" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Share</label>
                <input
                    id="employee_share"
                    v-model="AddItem.employee_share"
                    type="number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    @change="autoAdd"
                >
            </div>
            <div class="mb-6">
                <label for="total_contributions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Contributions</label>
                <input
                    id="total_contributions"
                    v-model="AddItem.total_contributions"
                    disabled
                    readonly
                    type="number"
                    class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                >
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="submitAdd">
                Add
            </button>
        </div>
        <div class="mt-5 w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
            <label for="" class="text-xl font-semibold text-gray-900">Contribution Table</label>
            <EasyDataTable
                show-index
                :headers="headers"
                :items="items"
                class="mt-5"
            >
                <template #item-actions="item">
                    <button
                        @click="deleteItem(item)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" /></svg>
                    </button>
                    <button
                        @click="editItem(item)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z" /></svg>
                    </button>
                </template>
            </EasyDataTable>
        </div>
        <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
            <label for="" class="text-xl font-semibold text-gray-900">Edit SSS Contribution Range</label>
            <div class="mt-5 mb-6">
                <label for="range_compensation" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Range Compensation</label>
                <input
                    id="range_compensation"
                    v-model="editingItem.range_compensation"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                >
            </div>
            <div class="mb-6">
                <label for="employer_share" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employer Share</label>
                <input
                    id="employer_share"
                    v-model="editingItem.employer_share"
                    type="number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    @change="autoAddinEdit"
                >
            </div>
            <div class="mb-6">
                <label for="employee_share" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee Share</label>
                <input
                    id="employee_share"
                    v-model="editingItem.employee_share"
                    type="number"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    @change="autoAddinEdit"
                >
            </div>
            <div class="mb-6">
                <label for="total_contributions" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Contributions</label>
                <input
                    id="total_contributions"
                    v-model="editingItem.total_contributions"
                    disabled
                    readonly
                    type="number"
                    class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                >
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="submitEdit">
                Update
            </button>
        </div>
    </div>
</template>
