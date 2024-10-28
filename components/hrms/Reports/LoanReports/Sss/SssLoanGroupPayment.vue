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
        <div class="title flex flex-col justify-center gap-1 mb-12">
            <span class="text-2xl font-bold text-black text-left">
                SSS LOAN PAYMENT
            </span>
            <span class="text-xl text-black text-left">
                For the applicable month of  <span class="font-bold text-red-600">APRIL 2024</span>
            </span>
        </div>
        <table class="printTable border border-gray-500">
            <thead class="text-md">
                <tr class="py-4">
                    <th class="py-4 border-gray-500">
                        NO.
                    </th>
                    <th class="py-4 border-gray-500">
                        FULLNAME
                    </th>
                    <th class="border border-gray-500">
                        PROJECT/OFFICE
                    </th>
                    <th class="border border-gray-500">
                        AMOUNT
                    </th>
                    <th class="border border-gray-500">
                        TOTAL
                    </th>
                </tr>
            </thead>
            <tbody class="text-sm">
                <tr class="h-2">
                    <td class="border border-gray-500 h-8 px-2 text-sm text-center text-bold">
                        1
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm">
                        JUAN DELA CRUZ
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                        0100192301230
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                        5,086.00
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm text-center text-bold">
                        5,086.00
                    </td>
                </tr>
                <tr class="h-2 font-bold">
                    <td class="border border-gray-500 h-8 px-2 text-sm" colspan="4">
                        TOTAL
                    </td>
                    <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                        55,086.00
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
    .flex-3 {
        flex: 3;
    }
</style>
