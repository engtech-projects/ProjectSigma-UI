<template>
    <!-- Header -->
    <div>
        <h6 class="text-center">Department of Public Works and Highways</h6>
        <p>Contract ID: </p>
        <p>Contract Name: </p>
        <p>Contract Location: </p>
    </div>

    <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Bill of Quantities</h2>
        <table class="min-w-full border border-gray-300">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border px-4 py-2">Pay Item No.</th>
                    <th class="border px-4 py-2">Description</th>
                    <th class="border px-4 py-2">Unit</th>
                    <th class="border px-4 py-2">Quantity</th>
                    <th class="border px-4 py-2">Unit Price(Pesos)</th>
                    <th class="border px-4 py-2">Amount (Pesos)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border px-4 py-2" />
                    <td class="border px-4 py-2" />
                    <td class="border px-4 py-2" />
                    <td class="border px-4 py-2" />
                    <td class="border px-4 py-2" />
                    <td class="border px-4 py-2" />
                </tr>
            </tbody>
        </table>
        <button @click="printTable" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Print</button>
    </div>
</template>

<style scoped>
    @media print {
        button {
            display: none;
        }
    }
</style>
