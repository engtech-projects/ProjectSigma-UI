<template>
    <div class="max-w-4xl mx-auto p-6 border border-gray-300 shadow-md bg-white text-sm">
        <div class="text-center font-bold text-lg mb-4">
            PHILIPPINE PORTS AUTHORITY (PPA)
        </div>

        <div class="grid grid-cols-3 gap-4 mb-4">
            <div><strong>Contract ID:</strong></div>
            <div class="col-span-2">
                <strong>Contract Name:</strong><br>
            </div>
            <div class="col-span-3">
                <strong>Contract Location:</strong>
            </div>
        </div>

        <div class="text-center font-semibold bg-gray-200 py-2 mb-2">
            DETAILED ESTIMATES
        </div>

        <table class="w-full mb-4 border text-center">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border p-1">
                        ITEM NO.
                    </th>
                    <th class="border p-1">
                        ITEM DESCRIPTION
                    </th>
                    <th class="border p-1">
                        QTY.
                    </th>
                    <th class="border p-1">
                        UNIT
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border p-1" />
                    <td class="border p-1 text-left" />
                    <td class="border p-1" />
                    <td class="border p-1" />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
@media print {
    .no-print {
        display: none;
    }
}
</style>
