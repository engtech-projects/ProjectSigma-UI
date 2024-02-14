<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    id="default-search"
                    v-model="searchQuery"
                    type="search"
                    class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    placeholder="Search"
                >
                <button type="submit" class="text-white absolute right-2.5 bottom-1 bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                    Search
                </button>
            </div>
        </form>

        <ul v-if="showSuggestions" class="mt-1 p-px rounded-lg bg-white dark:bg-gray-800">
            <li v-if="filteredEmployees.length === 0" class="flex justify-center p-1 italic">
                No Records Found
            </li>
            <li v-for="employee in filteredEmployees" :key="employee.id" class="hover:bg-teal-200 rounded-md cursor-pointer p-1" @click="selectEmployee(employee)">
                {{ employee.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchQuery: "",
            employees: [
                { id: 1, name: "John Doe" },
                { id: 2, name: "Jane Smith" },
                { id: 2, name: "Dane Smith" },
            ],
            showSuggestions: false,
        }
    },
    computed: {
        filteredEmployees () {
            return this.employees.filter(employee => employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        },
    },
    watch: {
        searchQuery () {
            this.showSuggestions = this.searchQuery.length > 0
        },
    },
    methods: {
        handleSubmit () {
        },
        selectEmployee (employee) {
            this.searchQuery = employee.name
            this.showSuggestions = false
        },
    },
}
</script>
