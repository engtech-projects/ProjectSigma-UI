<template>
    <div class="flex flex-col gap-16 pb-24 pt-8">
        <AccountingCommonEvenparHeader />
        <h1 class="text-2xl text-center font-bold">
            PAYMENT REQUEST FORM
        </h1>
        <div class="flex gap-12">
            <div class="flex flex-col flex-1">
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
                        for="description"
                        class="text-xs italic"
                    >Description</label>
                    <textarea
                        id="description"
                        class="w-full rounded-lg"
                    />
                </div>
            </div>
            <div class="flex flex-col flex-1">
                <div class="flex-1">
                    <label
                        for="prf"
                        class="text-xs italic"
                    >PRF Number</label>
                    <input
                        id="prf"
                        type="text"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
                <div class="flex-1">
                    <label
                        for="date"
                        class="text-xs italic"
                    >Date</label>
                    <input
                        id="date"
                        type="date"
                        class="w-full rounded-lg"
                        required
                    >
                </div>
            </div>
        </div>
        <div class="mb-16">
            <table class="border">
                <thead>
                    <tr>
                        <th class="border-2 border-gray-800 w-4/12 text-sm">
                            PARTICULARS
                        </th>
                        <th class="border-2 border-gray-800 w-4/12 text-sm">
                            PROJECT/SECTION CODE
                        </th>
                        <th class="border-2 border-gray-800 w-2/12 text-sm">
                            COST
                        </th>
                        <th class="border-2 border-gray-800 w-2/12 text-sm">
                            VAT
                        </th>
                        <th class="border-2 border-gray-800 w-2/12 text-sm">
                            TOTAL
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

                    <tr class="border-2 border-gray-800">
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800 font-bold">
                            TOTAL
                        </td>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
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
