<template>
    <div class="mt-5 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
        <label for="" class="text-xl font-semibold text-gray-900">Create Leave Type</label>
        <div class="mt-5 grid gap-6 mb-6">
            <div class="mb-6">
                <label for="leave_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leave Name</label>
                <input id="leave_name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
            </div>
            <div class="mb-6">
                <label for="amt_leaves" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount of Leaves</label>
                <input id="amt_leaves" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
            </div>
            <div class="mb-6">
                <label for="awardees" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Awardees</label>
                <select id="awardees" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option value="1">
                        All
                    </option>
                    <option value="2">
                        Regular
                    </option>
                </select>
            </div>
        </div>
        <div class="max-w-full flex flex-row-reverse mt-5">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add
            </button>
        </div>
    </div>
</template>
