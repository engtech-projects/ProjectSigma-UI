<template>
    <div>
        <div class="mt-5 mb-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
                <label for="cutoff_dates" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cut-off Dates</label>
                <select id="cutoff_dates" name="cutoff_dates" class="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                    <option value="">Select Date Span</option>
                    <option value="1">Today</option>
                    <option value="2">Yesterday</option>
                    <option value="3">Last 7 Days</option>
                    <option value="4">Last 30 Days</option>
                    <option value="5">This Month</option>
                    <option value="6">Last Month</option>
                    <option value="7">Custom Range</option>
                </select>
            </div>
            <div>
                <label for="payroll_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Payroll Date</label>
                <input type="date" id="payroll_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
        </div>
        <div class="mb-5">
            <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
                <h5 class="text-xl font-extrabold dark:text-white">Less</h5>
                <div class="mt-4 flex flex-col">
                    <div>
                        <input id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">SSS</label>
                    </div>
                    <div>
                        <input id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Philhealth</label>
                    </div>
                    <div>
                        <input id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pag-ibig</label>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
                    <h5 class="text-xl font-extrabold dark:text-white">Adjustment</h5>
                    <div class="mt-4 flex flex-col">
                        <div class="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-4">
                            <div>
                                <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee</label>
                                <input type="text" id="employee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
                            </div>
                            <div>
                                <label for="adjustment_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adjustment Name</label>
                                <input type="text" id="adjustment_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div>
                                <label for="amt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                                <input type="number" id="amt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="flex justify-end items-center">
                                <!-- <button @click="" type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button> -->
                                <button type="submit" class="mt-5 min-w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <Icon name="ic:baseline-plus" color="white" class="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
                    <h5 class="text-xl font-extrabold dark:text-white">Waive Fees</h5>
                    <div class="mt-4 flex flex-col">
                        <div class="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-4">
                            <div>
                                <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee</label>
                                <input type="text" id="employee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
                            </div>
                            <div>
                                <label for="fee_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fee Type</label>
                                <select id="cutoff_dates" name="cutoff_dates" class="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                                    <option value="1">Cash Advance</option>
                                    <option value="2">Loan</option>
                                    <option value="3">Other Deduction</option>
                                </select>
                            </div>
                            <div>
                                <label for="fee_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fee Name</label>
                                <input type="text" id="fee_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="flex justify-end items-center">
                                <button type="submit" class="mt-5 min-w-min text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <Icon name="ic:baseline-plus" color="white" class="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <div class="flex flex-row justify-between">
                <div>
                    <button type="submit" class="text-white bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">BIR WTax Calculator</button>
                </div>
                <div>
                    <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Generate Payroll</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script  setup lang="ts">

</script>

