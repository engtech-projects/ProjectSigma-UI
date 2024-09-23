<template>
    <div class="flex flex-col gap-16 pb-24 pt-8">
        <AccountingCommonEvenparHeader />
        <h1 class="text-2xl text-center font-bold">
            DISBURSEMENT VOUCHER
        </h1>
        <div class="flex flex-col gap-2">
            <div class="flex justify-end gap-4">
                <h3 class="font-bold">
                    REFERENCE NO.
                </h3>
                <span class="border-b border-gray-800">
                    AJE-202402-0566
                </span>
            </div>
            <div class="flex gap-12">
                <div class="flex flex-col flex-1 gap-2">
                    <div class="flex-1">
                        <label
                            for="payee"
                            class="text-xs italic"
                        >Payee</label>
                        <input
                            id="payee"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="particulars"
                            class="text-xs italic"
                        >Particulars</label>
                        <input
                            id="particulars"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="amountInWords"
                            class="text-xs italic"
                        >Amount in words</label>
                        <input
                            id="amountInWords"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>
                <div class="flex flex-col flex-1">
                    <div class="flex-1">
                        <label
                            for="encodedDate"
                            class="text-xs italic"
                        >Encoded Date</label>
                        <input
                            id="date"
                            type="date"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="entryDate"
                            class="text-xs italic"
                        >Entry Date</label>
                        <input
                            id="entryDate"
                            type="date"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="netAmount"
                            class="text-xs italic"
                        >Net Amount</label>
                        <input
                            id="netAmount"
                            type="number"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-16 flex flex-col gap-12">
            <h2 class="text-xl font-bold text-center">
                ACCOUNTING ENTRIES
            </h2>
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="border-2 border-gray-800 text-sm">
                            ACCOUNT CODE
                        </th>
                        <th class="border-2 border-gray-800 text-sm w-1/3">
                            ACCOUNT NAME
                        </th>
                        <th class="border-2 border-gray-800 text-sm">
                            PROJECT/SECTION CODE
                        </th>
                        <th class="border-2 border-gray-800 text-sm w-24">
                            DEBIT
                        </th>
                        <th class="border-2 border-gray-800 text-sm w-24">
                            CREDIT
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>

                    <tr class="border-0">
                        <td class="" />
                        <td class="" />
                        <td class="font-bold text-center pt-3">
                            TOTAL
                        </td>
                        <td class="border-b-2 border-gray-800" />
                        <td class="border-b-2 border-gray-800" />
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex gap-24">
            <span class="border-b-2 border-black pb-16 font-bold flex-1">
                REQUESTED BY:
            </span>
            <span class="border-b-2 border-black pb-16 font-bold flex-1">
                APPROVED BY:
            </span>
            <span class="border-b-2 border-black pb-16 font-bold flex-1">
                RECEIVED BY:
            </span>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
