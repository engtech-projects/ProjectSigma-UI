<template>
    <div>
        <div class="mt-5 mb-5 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
                <label for="cutoff_dates" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cut-off Dates</label>
                <select id="cutoff_dates" name="cutoff_dates" class="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                    <option value="">
                        Select Date Span
                    </option>
                    <option value="1">
                        Today
                    </option>
                    <option value="2">
                        Yesterday
                    </option>
                    <option value="3">
                        Last 7 Days
                    </option>
                    <option value="4">
                        Last 30 Days
                    </option>
                    <option value="5">
                        This Month
                    </option>
                    <option value="6">
                        Last Month
                    </option>
                    <option value="7">
                        Custom Range
                    </option>
                </select>
            </div>
            <div>
                <label for="payroll_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payroll Date</label>
                <input id="payroll_date" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div>
                <label for="payroll_project" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project</label>
                <input id="payroll_project" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
        </div>
        <div class="">
            <div class="flex flex-row justify-between">
                <div class="w-full md:w-1/5">
                    <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Generate 13th Month
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script  setup lang="ts">

</script>
