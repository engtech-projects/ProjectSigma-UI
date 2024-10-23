<script lang="ts" setup>

</script>
<template>
    <form>
        <div class="bg-white shadow rounded-lg border border-gray-200 px-2">
            <div class="flex justify-between items-center h-16 border-b px-4">
                <h2 class="text-xl text-gray-800">
                    Cash Voucher
                </h2>
            </div>
            <div class="flex flex-col gap-3 p-4 w-full">
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="referenceNo" class="block text-sm font-medium text-gray-900 dark:text-white">Reference No.</label>
                        <input id="referenceNo" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="payee" class="block text-sm font-medium text-gray-900 dark:text-white">Payee</label>
                        <AccountingSelectSearch
                            class="z-50 bg-gray-50 border-gray-200"
                            :options="[]"
                            title="name"
                            opid="id"
                        />
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="dateEncoded" class="block text-sm font-medium text-gray-900 dark:text-white">Encoded Date</label>
                        <input id="dateEncoded" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="dateCreate" class="block text-sm font-medium text-gray-900 dark:text-white">Created Date</label>
                        <input id="dateCreate" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="netAmount" class="block text-sm font-medium text-gray-900 dark:text-white">Net Amount</label>
                        <input id="netAmount" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="amountWords" class="block text-sm font-medium text-gray-900 dark:text-white">Amount in words</label>
                        <input id="amountWords" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div class="flex gap-2 w-full justify-between">
                    <div class="flex-1">
                        <label for="expenseAccount" class="block text-sm font-medium text-gray-900 dark:text-white">Net Expense Account</label>
                        <AccountingSelectSearch
                            id="expenseAccount"
                            class="z-50 bg-gray-50 border-gray-200"
                            :options="[]"
                            title="name"
                            opid="id"
                        />
                    </div>
                    <div class="flex-1 flex justify-end">
                        <!-- <button
                            type="submit"
                            class="text-white p-2 px-6 bg-teal-600 content-center mt-5 rounded-md w-fit"
                        >
                            Create Voucher
                        </button> -->
                    </div>
                </div>
            </div>
            <form action="">
                <div class="bg-gray-100 p-4 py-8 flex flex-col items-center mb-8">
                    <h2 class="text-center mb-6 font-bold text-gray-800">
                        ACCOUNTING ENTRIES
                    </h2>
                    <div class="flex flex-col w-full">
                        <div class="flex gap-1 w-full">
                            <div class="flex-1">
                                <label for="referenceNo" class="block text-sm font-medium text-gray-900 dark:text-white">Accounts</label>
                                <AccountingSelectSearch
                                    id="expenseAccount"
                                    class="z-50 bg-gray-50 border-gray-200"
                                    height="h-30"
                                    :options="[]"
                                    title="name"
                                    opid="id"
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        class="
                            border
                            rounded-xl
                            px-4 py-1
                            text-sm
                            bg-green-400
                            cursor-pointer
                            hover:bg-green-500
                            active:bg-green-600"
                        @click.prevent=""
                    >
                        + Add Entry
                    </button>
                </div>
            </form>
        </div>
    </form>
</template>
<style>

</style>
