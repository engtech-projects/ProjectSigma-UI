<template>
    <LayoutPrintAdvanced>
        <template #system-layout>
            <div class="p-4 mx-auto">
                <h1 class="text-2xl font-bold mb-4 text-center">
                    CASHFLOW BY QUARTER AND PAYMENT SCHEDULE
                </h1>

                <table class="w-full border-collapse border border-gray-300 mb-8">
                    <thead>
                        <tr>
                            <th class="border border-gray-300 p-2 font-semibold">
                                PARTICULAR
                            </th>
                            <th class="border border-gray-300 p-2 font-semibold">
                                %WT
                            </th>
                            <th class="border border-gray-300 p-2 font-semibold">
                                1ST QUARTER
                            </th>
                            <th class="border border-gray-300 p-2 font-semibold">
                                2ND QUARTER
                            </th>
                            <th class="border border-gray-300 p-2 font-semibold">
                                3RD QUARTER
                            </th>
                            <th class="border border-gray-300 p-2 font-semibold">
                                4TH QUARTER
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-gray-300 p-2">
                                ACCOMPLISHMENT
                            </td>
                            <td class="border border-gray-300 p-2" />
                            <td class="border border-gray-300 p-2 text-right">
                                22%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                32%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                46%
                            </td>
                            <td class="border border-gray-300 p-2" />
                        </tr>
                        <tr>
                            <td class="border border-gray-300 p-2">
                                CASH FLOW
                            </td>
                            <td class="border border-gray-300 p-2" />
                            <td class="border border-gray-300 p-2 text-right">
                                21,043,353.32
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                30,608,513.91
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                43,999,738.75
                            </td>
                            <td class="border border-gray-300 p-2" />
                        </tr>
                        <tr>
                            <td class="border border-gray-300 p-2">
                                CUMULATIVE ACCOMPLISHMENT
                            </td>
                            <td class="border border-gray-300 p-2" />
                            <td class="border border-gray-300 p-2 text-right">
                                22%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                54%
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                100%
                            </td>
                            <td class="border border-gray-300 p-2" />
                        </tr>
                        <tr>
                            <td class="border border-gray-300 p-2">
                                CUMULATIVE CASH FLOW
                            </td>
                            <td class="border border-gray-300 p-2" />
                            <td class="border border-gray-300 p-2 text-right">
                                21,043,353.32
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                51,651,867.23
                            </td>
                            <td class="border border-gray-300 p-2 text-right">
                                95,651,605.98
                            </td>
                            <td class="border border-gray-300 p-2" />
                        </tr>
                    </tbody>
                </table>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="border border-gray-300 p-4">
                        <h3 class="font-bold mb-2 text-4xl">
                            Q1
                        </h3>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">ACCOMPLISHMENT</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CASH FLOW</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CUMULATIVE ACCOMPLISHMENT</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CUMULATIVE CASHFLOW</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                        </div>
                    </div>
                    <div class="border border-gray-300 p-4">
                        <h3 class="font-bold mb-2 text-4xl">
                            Q2
                        </h3>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">ACCOMPLISHMENT</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CASH FLOW</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CUMULATIVE ACCOMPLISHMENT</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CUMULATIVE CASHFLOW</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                        </div>
                    </div>
                    <div class="border border-gray-300 p-4">
                        <h3 class="font-bold mb-2 text-4xl">
                            Q3
                        </h3>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">ACCOMPLISHMENT</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CASH FLOW</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CUMULATIVE ACCOMPLISHMENT</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CUMULATIVE CASHFLOW</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                        </div>
                    </div>
                    <div class="border border-gray-300 p-4">
                        <h3 class="font-bold mb-2 text-4xl">
                            Q4
                        </h3>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">ACCOMPLISHMENT</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CASH FLOW</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CUMULATIVE ACCOMPLISHMENT</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Percentage">
                        </div>
                        <div class="mb-2">
                            <label class="block text-sm font-medium text-gray-700">CUMULATIVE CASHFLOW</label>
                            <input type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Cashflow">
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #print-layout>
            <ProjectsPrintCashFlow />
        </template>
    </layoutPrintAdvanced>
</template>
