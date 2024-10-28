<script setup>

</script>
<template>
    <div class="flex flex-col">
        <div class="header flex flex-col  mb-8">
            <div class="flex gap-4">
                <span class="text-md flex-1">
                    Employer ID:
                </span>
                <span class="text-md font-bold flex-5">
                    80-0191406-1-000
                </span>
            </div>
            <div class="flex gap-4">
                <span class="text-md flex-1">
                    Employer Name:
                </span>
                <span class="text-md font-bold flex-5">
                    EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                </span>
            </div>
            <div class="flex gap-4">
                <span class="text-md flex-1">
                    Address:
                </span>
                <span class="text-md font-bold flex-5">
                    P-1 POBLACION 1 BUENAVISTA AGUSAN DEL NORTE
                </span>
            </div>
            <div class="flex gap-4">
                <span class="text-md flex-1">
                    Contact No:
                </span>
                <span class="text-md font-bold flex-5">
                    09395096694
                </span>
            </div>
            <div class="flex gap-4">
                <span class="text-md flex-1">
                    Email Address:
                </span>
                <span class="text-md font-bold flex-5 underline">
                    evenparcorporation@gmail.com
                </span>
            </div>
        </div>
        <div class="title flex flex-col justify-left gap-1 mb-4">
            <span class="font-bold text-2xl text-center">PAG-IBIG LOAN</span>
            <span class="text-xl text-black text-center">
                For the month of <span class="text-Black font-bold">APRIL 2024</span>
            </span>
        </div>
        <table class="printTable border border-gray-500 mb-20">
            <thead class="text-blue-600 text-md">
                <tr class="py-4">
                    <th class="py-4 border-gray-500">
                        NO.
                    </th>
                    <th class="border border-gray-500">
                        PROJECT ID
                    </th>
                    <th class="border border-gray-500">
                        AMOUNT
                    </th>
                </tr>
            </thead>
            <tbody class="text-sm">
                <tr class="h-2">
                    <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                        1
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm">
                        22CPA001 CEBU
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                        10,100.00
                    </td>
                </tr>
                <tr class="h-2">
                    <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                        1
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm">
                        22CPA001 CEBU
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                        10,100.00
                    </td>
                </tr>
                <tr class="h-2">
                    <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                        1
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm">
                        22CPA001 CEBU
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                        10,100.00
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="border border-gray-500 h-8 px-2 font-bold text-sm text-left">
                        TOTAL
                    </td>
                    <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                        140,300.00
                    </td>
                </tr>
            </tbody>
        </table>
        <HrmsReportsSignaturesRow>
            <HrmsReportsSignaturesPreparedBy />
            <HrmsReportsSignaturesCertifiedCorrectBy />
            <HrmsReportsSignaturesCheckedBy />
        </HrmsReportsSignaturesRow>
    </div>
</template>
<style scoped>
    .flex-5 {
        flex: 5;
    }
</style>
